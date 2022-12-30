import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioProduccionDTO, EditarIntermediarioProduccionDTO, IntermediarioProduccionDTO } from '../intermediario-produccion.model';
import { Subscription } from 'rxjs';
import { IntermediarioDTO } from '../../intermediario/intermediario.model';
import { IntermediarioService } from '../../servicios/intermediario.service';
import { LitarProduccionesDTO, ProduccionDTO } from '../../produccion/produccion.model';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-intermediario-produccion',
  templateUrl: './formulario-intermediario-produccion.component.html',
  styleUrls: ['./formulario-intermediario-produccion.component.scss']
})
export class FormularioIntermediarioProduccionComponent implements OnInit {

  listarIntemediarios:IntermediarioDTO[] = [];
  listarProducciones:LitarProduccionesDTO[] = [];
  subCargarProductores!:Subscription;
   //output
   @Output() onSubmitEmpresa:EventEmitter<CrearIntermediarioProduccionDTO>=new EventEmitter<CrearIntermediarioProduccionDTO>();
   //input
   @Input() editIntermediarioProduccion!: EditarIntermediarioProduccionDTO;
   @Input() modeloIntermediario!: IntermediarioProduccionDTO;
   @Input() tipoAccion!: string;
   //formulario
   formIntermediario!:FormGroup;
   //
   idObtainForUpdate: string = '';
   productorSelected!: number;
   selectedCustomer!: ProduccionDTO;
   loading:boolean=false;
   submited: any = false;

   lugarSelected!: any;
   yearProduccion!: string;

   
  display: boolean = false;

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private produccionService:ProduccionService,
    private intermediarioService: IntermediarioService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarIntermediario()
      this.aplicarPatch();
  }

  aplicarPatch(){
    console.log('this.modeloIntermediario')
    console.log(this.modeloIntermediario)

    if(this.modeloIntermediario != undefined)
    {
      this.editIntermediarioProduccion = {
        id: this.modeloIntermediario.id,
        year_compra: this.modeloIntermediario.year_compra,
        cantidad_comprada: this.modeloIntermediario.cantidad_comprada,
        activo: this.modeloIntermediario.activo,
        fk_intermediario_id: this.modeloIntermediario.fk_intermediario.id,
        fk_produccion_id: this.modeloIntermediario.fk_produccion.id,
      }
    }


    if(this.editIntermediarioProduccion!=undefined || this.editIntermediarioProduccion!=null){
      this.formIntermediario.patchValue(this.editIntermediarioProduccion);
    }
  }
  iniciarFormulario(){
    this.formIntermediario = this.formBuilder.group({
      year_compra: ['', Validators.required],
      cantidad_comprada: ['', Validators.required],
      activo: ['true', Validators.required],
      fk_intermediario_id: ['', Validators.required],
      fk_produccion_id: ['', Validators.required],
    });
  }

crearIntermediario():void{
  console.log(this.formIntermediario.value)
  this.submited = true;
  if(this.formIntermediario.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  let instanciaEmpresaCrear:CrearIntermediarioProduccionDTO=this.formIntermediario.value;
  this.onSubmitEmpresa.emit(instanciaEmpresaCrear);

}


cargarProductores():void{
  //this.listaPresentarDatosProductor = []
  this.subCargarProductores=this.produccionService.obtenerTodos().subscribe(productores=>{
    console.log(productores.data);
    this.loading=false;
    this.listarProducciones=productores.data;
    //this.combinarCantonProductores()
    

  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

btnSeleccionarroductor(productor:ProduccionDTO){
console.log(productor.id)
this.selectedCustomer = productor
this.productorSelected = productor.id
this.yearProduccion = productor.year
this.formIntermediario.controls['fk_produccion_id'].setValue(this.productorSelected);
this.formIntermediario.controls['year_compra'].setValue(this.yearProduccion);

this.display = false;
}

showDialog() {
  this.cargarProductores()
    this.display = true;
}




cargarIntermediario():void{
  //this.listaPresentarDatosProductor = []
  this.subCargarProductores=this.intermediarioService.obtenerTodos().subscribe(lugares=>{
    console.log(lugares.data);
    this.loading=false;
    this.listarIntemediarios=lugares.data;
    //this.combinarCantonProductores()
    

  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

onChange(event: any) {
  if(!event.value) return
  console.log('evento')
  console.log(event.value)
  this.lugarSelected = event.value['id']
  this.formIntermediario.controls['fk_intermediario_id'].setValue(this.lugarSelected);
}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}


get year_compra(){ return this.formIntermediario.get('year_compra');}
get cantidad_comprada(){ return this.formIntermediario.get('cantidad_comprada');}
get activo(){ return this.formIntermediario.get('activo');}
get fk_intermediario_id(){ return this.formIntermediario.get('fk_intermediario_id');}
get fk_produccion_id(){ return this.formIntermediario.get('fk_produccion_id');}


}
