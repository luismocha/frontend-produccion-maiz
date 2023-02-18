import { CantonDTO } from './../../canton/canton.model';
import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LitarCantonesDTO, obtenerCantonDTO } from '../../canton/canton.model';
import { CantonService } from '../../servicios/canton.service';
import { CrearParroquiaDTO, EditParroquiaDTO, ObtenerUnaParroquiaDTO, ParroquiaDTO } from '../parroquia.model';
import { Subscription } from 'rxjs';
import { ParroquiaService } from '../../servicios/parroquia.service';
import { Router } from '@angular/router';
import { soloLetras } from 'src/app/core/validaciones/validateText';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-parroquia',
  templateUrl: './formulario-parroquia.component.html',
  styleUrls: ['./formulario-parroquia.component.scss']

})
export class FormularioParroquiaComponent implements OnInit {

  listarCantones!:LitarCantonesDTO[];
  instanciaCanton!:CantonDTO;
  //variables globales
  loading:boolean=false;
  cantonSeleccionado!: CantonDTO;

  subCargarCantones!:Subscription;
   //output
   @Output() onSubmitParroquia:EventEmitter<CrearParroquiaDTO>=new EventEmitter<CrearParroquiaDTO>();
   //input
   //modeloParroquia!: EditParroquiaDTO;
   @Input() modeloUnaParroquia!: ObtenerUnaParroquiaDTO;
   @Input() modoLectura!:boolean;

   //formulario
   formParroquia!:FormGroup;
   idObtainForUpdate: string = '';

  constructor(private cantonService:CantonService, private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    //public ref: DynamicDialogRef,
    private parroquiaService:ParroquiaService,
    private router:Router,
    private messageService: MessageService) {

    }

  ngOnInit(): void {
    this.cargarCantones()
    this.iniciarFormulario();
    this.aplicarPatch();
    this.parroquiaService.refresh$.subscribe(() => {
      this.router.navigate(['/admin/parroquia']);
    });
      //console.log(this.cantones)

  }
  validarLetras(event:any){
    return soloLetras(event);
    }
  aplicarPatch(){
    //debugger
    if(this.modeloUnaParroquia !=undefined || this.modeloUnaParroquia!=null){
        this.formParroquia.patchValue(this.modeloUnaParroquia);
        this.cantonSeleccionado=this.modeloUnaParroquia.fk_canton;
    }
  }




  iniciarFormulario(){
    this.formParroquia = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.maxLength(250)]],
        fk_canton_id: ['', [Validators.required]],
        activo: [true, Validators.required],
    });
  }

crearParroquia():void{
  if(this.formParroquia.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return Object.values(this.formParroquia.controls).forEach(contol=>{
        contol.markAsTouched();
    });
  }
  this.formParroquia.controls['nombre'].setValue(this.formParroquia.value.nombre.toUpperCase());
  this.formParroquia.value.fk_canton_id = this.cantonSeleccionado.id;
  let instanciaParroquiaCrear:CrearParroquiaDTO=this.formParroquia.value;
  debugger
  this.onSubmitParroquia.emit(instanciaParroquiaCrear);

}


cargarCantones():void{
  this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
    this.listarCantones=cantones.data;
  },error=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}
onChangeCanton(event: any) {
  if(!event.value) return
  this.cantonSeleccionado = event.value;
}
OnDestroy(){
    if(this.subCargarCantones){
        this.subCargarCantones.unsubscribe();
    }
}
get nombre(){ return this.formParroquia.get('nombre')?.invalid && this.formParroquia.get('nombre')?.touched ;}
get fk_canton_id(){ return this.formParroquia.get('fk_canton_id')?.invalid &&  this.formParroquia.get('fk_canton_id')?.touched ;}
}


