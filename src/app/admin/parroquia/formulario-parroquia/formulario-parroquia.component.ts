import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LitarCantonesDTO, obtenerCantonDTO } from '../../canton/canton.model';
import { CantonService } from '../../servicios/canton.service';
import { CrearParroquiaDTO, EditParroquiaDTO, ObtenerUnaParroquiaDTO, ParroquiaDTO } from '../parroquia.model';
import { Subscription } from 'rxjs';
import { ParroquiaService } from '../../servicios/parroquia.service';

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
   @Input() modoLectura!:boolean;

   //formulario
   formParroquia!:FormGroup;
   @Input() tipoAccion!: string;
   //
   idObtainForUpdate: string = '';
   cantonSelected!: number;

  constructor(private cantonService:CantonService, private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    //public ref: DynamicDialogRef,
    private parroquiaService:ParroquiaService,
    private messageService: MessageService) {
      this.cantones = [];
    }

  ngOnInit(): void {
    this.cargarCantones()
    this.iniciarFormulario();
    this.aplicarPatch();
    this.parroquiaService.refresh$.subscribe(() => {
        this.formParroquia.reset();
    });
      //console.log(this.cantones)

  }

  aplicarPatch(){

    if(this.modeloParroquia!=undefined || this.modeloParroquia!=null){
      this.formParroquia.patchValue(this.modeloParroquia);


      setTimeout(() => {

        for (let i = 0; i < this.listarCantones.length; i++) {
          if(this.listarCantones[i].id === this.modeloUnaParroquia.fk_canton.id){
            if(this.cantones[i].name === this.modeloUnaParroquia.fk_canton.nombre){
              this.cantones.splice(i,1)
              this.cantones.unshift({name: this.listarCantones[i].nombre, id: this.listarCantones[i].id})
              //this.formProductor.value.fk_canton_id = Number(this.listarCantones[i].id)
              this.cantonSelected = this.listarCantones[i].id
              this.formParroquia.controls['fk_canton_id'].setValue(Number(this.listarCantones[i].id));
            }
          }

        }


        /*let newItems = this.listarCantones.filter((item)=> item.id === this.modeloProductor.fk_canton_id);
        console.log(newItems)

        let newItem = this.listarCantones.map(item => item.nombre);
        console.log(newItem)*/
      }, 1000);





    }
  }




  iniciarFormulario(){

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
    return Object.values(this.formParroquia.controls).forEach(contol=>{
        contol.markAsTouched();
    });
  }
  //todo ok
  /*for (let i = 0; i < this.listarCantones.length; i++) {

    if(this.listarCantones[i].nombre == this.formParroquia.value.fk_canton_id.name){
      this.formParroquia.value.fk_canton_id = Number(this.listarCantones[i].id)
      //console.log(this.formProductor.value.fk_canton)
    }
  }*/
  this.formParroquia.controls['nombre'].setValue(this.formParroquia.value.nombre.toUpperCase());
  this.formParroquia.value.fk_canton_id = this.cantonSelected
  //console.log(this.listarCantones)
  //this.formParroquia.value.fk_canton = 1
  let instanciaParroquiaCrear:CrearParroquiaDTO=this.formParroquia.value;
  this.onSubmitParroquia.emit(instanciaParroquiaCrear);

}


cargarCantones():void{
  this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
    this.loading=false;
    this.listarCantones=cantones.data;
    for (let i = 0; i < cantones.data.length; i++) {
      let mapa = {id: cantones.data[i].id, name: cantones.data[i].nombre}
      this.cantones.push(mapa)
      }
  },error=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}
onChange(event: any) {
  if(!event.value) return
  this.cantonSelected = event.value['id']
  //this.formParroquia.value.fk_canton_id.id = Number(event.value['id'])
}
get nombre(){ return this.formParroquia.get('nombre')?.invalid && this.formParroquia.get('nombre')?.touched ;}
get fk_canton_id(){ return this.formParroquia.get('fk_canton_id')?.invalid &&  this.formParroquia.get('fk_canton_id')?.touched ;}
}
