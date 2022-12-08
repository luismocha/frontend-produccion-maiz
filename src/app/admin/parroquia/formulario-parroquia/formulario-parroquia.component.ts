import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LitarCantonesDTO, obtenerCantonDTO } from '../../canton/canton.model';
import { CantonService } from '../../servicios/canton.service';
import { CrearParroquiaDTO, ParroquiaDTO } from '../parroquia.model';
import { Subscription } from 'rxjs';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-parroquia',
  templateUrl: './formulario-parroquia.component.html',
  styleUrls: ['./formulario-parroquia.component.scss']
})
export class FormularioParroquiaComponent implements OnInit {

  listarCantones:LitarCantonesDTO[] = [];
  //variables globales
  loading:boolean=false;
  ref!: DynamicDialogRef;
  cantones: obtenerCantonDTO[];
  selectedCity1!: obtenerCantonDTO;

  subCargarCantones!:Subscription;

   //output
   @Output() onSubmitParroquia:EventEmitter<CrearParroquiaDTO>=new EventEmitter<CrearParroquiaDTO>();
   //input
   @Input() modeloParroquia!: ParroquiaDTO;
   //formulario
   formParroquia!:FormGroup;
   //
   idObtainForUpdate: string = '';

  constructor(private cantonService:CantonService, private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
     
    private messageService: MessageService) { 
      this.cantones = [];
    }

  ngOnInit(): void {
    this.iniciarFormulario();
      this.aplicarPatch();
     
      //console.log(this.cantones)
      this.cargarCantones()
    
  }

  aplicarPatch(){
    if(this.modeloParroquia!=undefined || this.modeloParroquia!=null){
      this.formParroquia.patchValue(this.modeloParroquia);
    }
  }
  iniciarFormulario(){
    this.formParroquia = this.formBuilder.group({
      nombre: ['', Validators.required],
      fk_canton: ['', Validators.required],
      activo: [true, Validators.required],
    });
  }

crearParroquia():void{
  if(this.formParroquia.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  console.log(this.formParroquia.value.fk_canton)
  console.log(this.listarCantones)
  for (let i = 0; i < this.listarCantones.length; i++) {
    
    if(this.listarCantones[i].nombre == this.formParroquia.value.fk_canton.name){
      this.formParroquia.value.fk_canton = Number(this.listarCantones[i].id)
      console.log(this.formParroquia.value.fk_canton)
    }
    
  }
  //this.formParroquia.value.fk_canton = 1
  let instanciaParroquiaCrear:CrearParroquiaDTO=this.formParroquia.value;
  this.onSubmitParroquia.emit(instanciaParroquiaCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

cargarCantones():void{
  this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
    console.log(cantones);
    this.loading=false;
    this.listarCantones=cantones;
    for (let i = 0; i < cantones.length; i++) {
      let mapa = {name: cantones[i].nombre}
      this.cantones = [mapa, ...this.cantones]
      }
  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

}
