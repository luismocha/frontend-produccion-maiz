import { ObtenerUnaParroquiaDTO, ParroquiaDTO } from './../../parroquia/parroquia.model';
import { CantonDTO } from './../../canton/canton.model';
import { ProduccionService } from './../../servicios/produccion.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LitarCantonesDTO, obtenerCantonDTO } from '../../canton/canton.model';
import { LitarParroquiasDTO, obtenerParroquiaDTO } from '../../parroquia/parroquia.model';
import { CantonService } from '../../servicios/canton.service';
import { combiarCantonParroquiaProductorDTO, CrearProductorDTO, EditProductorDTO, obtenerProductorDTO, ObtenerUnProductorDTO, ProductorDTO } from '../productor.model';
import { Subscription } from 'rxjs';
import { ParroquiaService } from '../../servicios/parroquia.service';
import Swal from 'sweetalert2';
import { ProductorService } from '../../servicios/productor.service';
import { Router } from '@angular/router';
import { soloLetras } from 'src/app/core/validaciones/validateText';
import { validateCedula } from 'src/app/core/validaciones/validateCedula';
import { soloNumero } from 'src/app/core/validaciones/validarNumero';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-productor',
  templateUrl: './formulario-productor.component.html',
  styleUrls: ['./formulario-productor.component.scss']
})
export class FormularioProductorComponent implements OnInit {

  subCargarCantones!:Subscription;
  subCargarParroquias!:Subscription;

  listarCantones:LitarCantonesDTO[] = [];
  listarParroquias:LitarParroquiasDTO[] = [];
  auxParroquias:ObtenerUnaParroquiaDTO[]=[];
  //variables globales
  loading:boolean=false;
  loadingParroquia:boolean=true;

  submited: any = false;

  fk_canton_id_Form: any
  fk_parroquia_id_Form: any

  cedulaValidadaConExito?: boolean;
  cantonSeleccionado!:CantonDTO;
  parroquiaSeleccionado!:ParroquiaDTO;

  selectedCity1!: obtenerProductorDTO;
   //output
   @Output() onSubmitProductor:EventEmitter<CrearProductorDTO>=new EventEmitter<CrearProductorDTO>();
   //input
   @Input() modeloUnaProductor!: ObtenerUnProductorDTO;
   //@Input() objCombinacion!: combiarCantonParroquiaProductorDTO;
   @Input() tipoAccion!: string;
   @Input() modoLectura!:boolean;
   //formulario
   formProductor!:FormGroup;

   //
   idObtainForUpdate: string = '';
  constructor(private parroquiaService:ParroquiaService,
    private cantonService:CantonService,
    private produccionService:ProduccionService,
    private formBuilder: FormBuilder,
    private router:Router,
    //public dialogService: ListarRolesComponent,
    private productorService:ProductorService,
    private messageService: MessageService) {
     }

  ngOnInit(): void {
    this.cargarCantones()
    this.cargarParroquias()
    this.iniciarFormulario();
    this.aplicarPatch()
    this.productorService.refresh$.subscribe(() => {
      this.router.navigate(['/admin/productores']);
     });
  }

  aplicarPatch(){
    if(this.modeloUnaProductor!=undefined || this.modeloUnaProductor!=null){
      this.formProductor.patchValue(this.modeloUnaProductor);
      this.formProductor.get('fk_canton_id')?.setValue(this.modeloUnaProductor.fk_canton.id);
      this.formProductor.get('fk_parroquia_id')?.setValue(this.modeloUnaProductor.fk_parroquia.id);
      this.cantonSeleccionado=this.modeloUnaProductor.fk_canton;
      this.parroquiaSeleccionado=this.modeloUnaProductor.fk_parroquia;

    }
  }
  validarNumero(event:any){
    return soloNumero(event);
  }
  iniciarFormulario(){
    this.formProductor = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.maxLength(250)]],
      apellido: ['', [Validators.required, Validators.maxLength(250)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),validateCedula()]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      activo: [true, Validators.required],
      fk_canton_id: ['', [Validators.required]],
      fk_parroquia_id: ['', [Validators.required]],
    });
  }

crearProductor():void{
  if(this.formProductor.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return Object.values(this.formProductor.controls).forEach(contol=>{
        contol.markAsTouched();
    });
  }
  this.formProductor.controls['nombre'].setValue(this.formProductor.value.nombre.toUpperCase());
  this.formProductor.controls['apellido'].setValue(this.formProductor.value.apellido.toUpperCase());

  let instanciaProductorCrear:CrearProductorDTO={
    activo:this.formProductor.value.activo,
    apellido:this.formProductor.value.apellido,
    cedula:this.formProductor.value.cedula,
    celular:this.formProductor.value.celular,
    fk_canton_id:this.cantonSeleccionado.id,
    fk_parroquia_id:this.parroquiaSeleccionado.id,
    nombre:this.formProductor.value.nombre
  }
  this.onSubmitProductor.emit(instanciaProductorCrear);
  this.produccionService.refresh$.subscribe(() => {
    this.formProductor.reset();
  });

}



cargarCantones():void{
  this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
    //console.log(cantones.data);
    this.loading=false;
    this.listarCantones=cantones.data;
  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

onChangeCanton(event: any) {
  if(!event.value) return
  this.cantonSeleccionado = event.value;
  this.auxParroquias=[];
  this.listarParroquias.forEach(parroquia=>{
    if(parroquia.fk_canton.id==this.cantonSeleccionado.id){
        this.auxParroquias.push(parroquia);
    }
  });
  this.formProductor.get('fk_parroquia_id')?.setValue(null);
  //this.formProductor.value.fk_canton_id.id = Number(event.value['id']);

}

cargarParroquias():void{
  this.subCargarParroquias=this.parroquiaService.obtenerTodos().subscribe(parroquias=>{
    //console.log(parroquias.data);
    this.loadingParroquia=false;
    if(parroquias.success){
        this.listarParroquias=parroquias.data;
        //modo edicion
        if(this.modeloUnaProductor!=undefined || this.modeloUnaProductor!=null){
            this.auxParroquias=[];
            this.listarParroquias.forEach(parroquia=>{
                if(parroquia.fk_canton.id==this.cantonSeleccionado.id){
                    this.auxParroquias.push(parroquia);
                }
            });
        }
        return;
    }
    Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Información',
        footer: parroquias.message
    })

  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });
}
validarLetras(event:any){
    return soloLetras(event);
}
onChangeParroquia(event: any) {
  if(!event.value) return
  this.parroquiaSeleccionado=event.value;
  this.formProductor.value.fk_parroquia_id.id =  this.parroquiaSeleccionado?.id;
 /*  this.fk_parroquia_id_Form = event.value['id']
  this.formProductor.value.fk_parroquia_id.id = Number(event.value['id']) */
}



ngOnDestroy(): void {
  if(this.subCargarParroquias){
    this.subCargarParroquias.unsubscribe();
  }
  if(this.subCargarCantones){
    this.subCargarCantones.unsubscribe();
  }


}

get nombre(){ return this.formProductor.get('nombre')?.invalid && this.formProductor.get('nombre')?.touched ;}
get apellido(){ return this.formProductor.get('apellido')?.invalid && this.formProductor.get('apellido')?.touched;}
get cedula(){ return this.formProductor.get('cedula')?.invalid && this.formProductor.get('cedula')?.touched;}
get celular(){ return this.formProductor.get('celular')?.invalid && this.formProductor.get('celular')?.touched;}
get fk_canton_id(){ return this.formProductor.get('fk_canton_id')?.invalid && this.formProductor.get('fk_canton_id')?.touched;}
get fk_parroquia_id(){ return this.formProductor.get('fk_parroquia_id')?.invalid && this.formProductor.get('fk_parroquia_id')?.touched;}
}
