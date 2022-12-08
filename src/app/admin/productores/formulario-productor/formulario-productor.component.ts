import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LitarCantonesDTO, obtenerCantonDTO } from '../../canton/canton.model';
import { CrearParroquiaDTO } from '../../parroquia/parroquia.model';
import { CantonService } from '../../servicios/canton.service';
import { CrearProductorDTO, obtenerProductorDTO, ProductorDTO } from '../productor.model';
import { Subscription } from 'rxjs';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-productor',
  templateUrl: './formulario-productor.component.html',
  styleUrls: ['./formulario-productor.component.scss']
})
export class FormularioProductorComponent implements OnInit {

  subCargarCantones!:Subscription;

  listarCantones:LitarCantonesDTO[] = [];
  //variables globales
  loading:boolean=false;
 

  cantones: obtenerCantonDTO[];
  selectedCity1!: obtenerProductorDTO;

   //output
   @Output() onSubmitProductor:EventEmitter<CrearProductorDTO>=new EventEmitter<CrearProductorDTO>();
   //input
   @Input() modeloProductor!: ProductorDTO;
   //formulario
   formProductor!:FormGroup;
   //
   idObtainForUpdate: string = '';
  constructor(private cantonService:CantonService, private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
     public ref: DynamicDialogRef,
    private messageService: MessageService) {
      this.cantones = [];
     }

  ngOnInit(): void {
    this.iniciarFormulario();
      this.aplicarPatch();
     
      this.cargarCantones()
      console.log(this.cantones)
  }

  aplicarPatch(){
    if(this.modeloProductor!=undefined || this.modeloProductor!=null){
      this.formProductor.patchValue(this.modeloProductor);
    }
  }
  iniciarFormulario(){
    this.formProductor = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      celular: ['', Validators.required],
      activo: [true, Validators.required],
      fk_canton: ['', Validators.required],
    });
  }

crearProductor():void{
  if(this.formProductor.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  console.log(this.formProductor.value.fk_canton)
  console.log(this.listarCantones)
  for (let i = 0; i < this.listarCantones.length; i++) {
    
    if(this.listarCantones[i].nombre == this.formProductor.value.fk_canton.name){
      this.formProductor.value.fk_canton = Number(this.listarCantones[i].id)
      console.log(this.formProductor.value.fk_canton)
    }
    
  }
  let instanciaProductorCrear:CrearProductorDTO=this.formProductor.value;
  this.onSubmitProductor.emit(instanciaProductorCrear);

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
