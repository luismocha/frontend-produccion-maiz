import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LitarCantonesDTO, obtenerCantonDTO } from '../../canton/canton.model';
import { CantonService } from '../../servicios/canton.service';
import { CrearParroquiaDTO, EditParroquiaDTO, ObtenerUnaParroquiaDTO, ParroquiaDTO } from '../parroquia.model';
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
  cantones: obtenerCantonDTO[];
  selectedCity1!: obtenerCantonDTO;

  subCargarCantones!:Subscription;
  submited: any = false;
   //output
   @Output() onSubmitParroquia:EventEmitter<CrearParroquiaDTO>=new EventEmitter<CrearParroquiaDTO>();
   //input
   @Input() modeloParroquia!: EditParroquiaDTO;
   @Input() modeloUnaParroquia!: ObtenerUnaParroquiaDTO;


   //formulario
   formParroquia!:FormGroup;
   @Input() tipoAccion!: string;
   //
   idObtainForUpdate: string = '';
   cantonSelected!: number;

  constructor(private cantonService:CantonService, private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef,
    private messageService: MessageService) { 
      this.cantones = [];
    }

  ngOnInit(): void {
    this.cargarCantones()
    this.iniciarFormulario();
    this.aplicarPatch();
    
      //console.log(this.cantones)
    
  }

  aplicarPatch(){
    
    console.log('aplicando patch')
    console.log(this.modeloUnaParroquia)
    console.log(this.formParroquia.value)
    this.formParroquia.value.fk_canton_id = this.modeloUnaParroquia.fk_canton.id

    this.modeloParroquia = {
      id: this.modeloUnaParroquia.id,
      nombre: this.modeloUnaParroquia.nombre,
      fk_canton_id: this.modeloUnaParroquia.fk_canton.id,
      activo: this.modeloUnaParroquia.activo,
    }


    console.log('ModeloParroquia')
    console.log(this.modeloParroquia)
    if(this.modeloParroquia!=undefined || this.modeloParroquia!=null){
      console.log('patch aplicado')
      this.formParroquia.patchValue(this.modeloParroquia);
      console.log('this.formParroquia')
      console.log(this.formParroquia.value)
    }
    console.log('patch NO aplicado')
  }
  iniciarFormulario(){
    console.log(this.tipoAccion)
    console.log(this.modeloParroquia)
    
    //if(this.tipoAccion != 'ver'){
      this.formParroquia = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.maxLength(250)]],
        fk_canton_id: ['', [Validators.required]],
        activo: [true, Validators.required],
      });
    //}
  }

crearParroquia():void{
  this.submited = true;
  if(this.formParroquia.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  console.log(this.formParroquia.value.fk_canton_id)
  /*for (let i = 0; i < this.listarCantones.length; i++) {
    
    if(this.listarCantones[i].nombre == this.formParroquia.value.fk_canton_id.name){
      this.formParroquia.value.fk_canton_id = Number(this.listarCantones[i].id)
      //console.log(this.formProductor.value.fk_canton)
    }
  }*/
  this.formParroquia.value.fk_canton_id = this.cantonSelected
  //console.log(this.listarCantones)
  //this.formParroquia.value.fk_canton = 1
  console.log('this.formParroquia.value')
  console.log(this.formParroquia.value)
  let instanciaParroquiaCrear:CrearParroquiaDTO=this.formParroquia.value;
  this.onSubmitParroquia.emit(instanciaParroquiaCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

cargarCantones():void{
  this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
    //console.log(cantones);
    this.loading=false;
    this.listarCantones=cantones;
    for (let i = 0; i < cantones.length; i++) {
      let mapa = {id: cantones[i].id, name: cantones[i].nombre}
      this.cantones = [mapa, ...this.cantones]
      }
  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}
onChange(event: any) {
  if(!event.value) return
  console.log('evento')
  console.log(Number(this.formParroquia.value.fk_canton_id.id))
  console.log(event.value['id'])
  this.cantonSelected = event.value['id']
  //this.formParroquia.value.fk_canton_id.id = Number(event.value['id'])
}
get nombre(){ return this.formParroquia.get('nombre');}
get fk_canton_id(){ return this.formParroquia.get('fk_canton_id');}
}
