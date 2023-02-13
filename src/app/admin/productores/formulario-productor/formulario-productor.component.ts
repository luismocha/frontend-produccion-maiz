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
  //variables globales
  loading:boolean=false;
  loadingParroquia:boolean=true;

  submited: any = false;

  fk_canton_id_Form: any
  fk_parroquia_id_Form: any

  cedulaValidadaConExito?: boolean;

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
      if(this.validarcedula(this.modeloUnaProductor.cedula)){
        this.cedulaValidadaConExito = true;
      }
      this.formProductor.patchValue(this.modeloUnaProductor);
      this.formProductor.get('fk_canton_id')?.setValue(this.modeloUnaProductor.fk_canton.id);
      this.formProductor.get('fk_parroquia_id')?.setValue(this.modeloUnaProductor.fk_parroquia.id);
    }
  }
  iniciarFormulario(){
    this.formProductor = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.maxLength(250)]],
      apellido: ['', [Validators.required, Validators.maxLength(250)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      activo: [true, Validators.required],
      fk_canton_id: ['', [Validators.required]],
      fk_parroquia_id: ['', [Validators.required]],
    });
  }

crearProductor():void{
  this.submited = true;
  if(this.formProductor.value.cedula != undefined){

    this.validarcedula(this.formProductor.get('cedula'))
  }
  if(this.formProductor.invalid && !this.cedulaValidadaConExito){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return Object.values(this.formProductor.controls).forEach(contol=>{
        contol.markAsTouched();
    });
  }
  this.formProductor.controls['nombre'].setValue(this.formProductor.value.nombre.toUpperCase());
  this.formProductor.controls['apellido'].setValue(this.formProductor.value.apellido.toUpperCase());

  let instanciaProductorCrear:CrearProductorDTO=this.formProductor.value;
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
  this.fk_canton_id_Form = event.value['id']
  this.formProductor.value.fk_canton_id.id = Number(event.value['id'])
}

cargarParroquias():void{
  this.subCargarParroquias=this.parroquiaService.obtenerTodos().subscribe(parroquias=>{
    //console.log(parroquias.data);
    this.loadingParroquia=false;
    if(parroquias.success){
        this.listarParroquias=parroquias.data;
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

onChangeParroquia(event: any) {
  if(!event.value) return
  this.fk_parroquia_id_Form = event.value['id']
  this.formProductor.value.fk_parroquia_id.id = Number(event.value['id'])
}


 validarcedula(cedula: any) {

  if(cedula.value === undefined){
    cedula = cedula;
    console.log(cedula)
  }else{
    cedula = cedula.value
    console.log(cedula)
  }

  if (cedula.length !== 10) {
    // Las cédulas ecuatorianas tienen 10 dígitos
    return false;
  }
  // Verificar que todos los dígitos sean numéricos
  if (/^\d+$/.test(cedula) === false) {
    return false;
  }
  // Verificar que el primer dígito sea 0, 1, 2, 3, 4, 5, 6, 7, 8 o 9
  if (/^[0-9]/.test(cedula) === false) {
    return false;
  }
  // Verificar que el segundo dígito sea 0, 1, 2, 3, 4, 5, 6, 7, 8 o 9
  if (/^[0-9].*[0-9]$/.test(cedula) === false) {
    return false;
  }
  // Verificar que el tercer dígito sea 0, 1, 2, 3, 4, 5, 6, 7, 8 o 9
  if (/^[0-9].*[0-9].*[0-9]$/.test(cedula) === false) {
    return false;
  }
  // Verificar que el cuarto dígito sea 6, 7, 8 o 9
  if (/^[0-9].*[0-9].*[0-9].*[6-9]$/.test(cedula) === false) {
    return false;
  }
  // Si se ha llegado hasta aquí, la cédula es válida
  return true;
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
