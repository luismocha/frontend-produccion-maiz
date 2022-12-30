import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioProduccionDTO, IntermediarioProduccionDTO } from '../intermediario-produccion.model';
import { ProductorService } from '../../servicios/productor.service';
import { LitarProductoresDTO, ProductorDTO } from '../../productores/productor.model';
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

  listarLugaresDeProductores:IntermediarioDTO[] = [];
  listarProducciones:LitarProduccionesDTO[] = [];
  subCargarProductores!:Subscription;
   //output
   @Output() onSubmitEmpresa:EventEmitter<CrearIntermediarioProduccionDTO>=new EventEmitter<CrearIntermediarioProduccionDTO>();
   //input
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

   
  display: boolean = false;

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private productorService:ProduccionService,
    private lugarService: IntermediarioService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarLugarDeProductores()
      this.aplicarPatch();
  }

  aplicarPatch(){
    if(this.modeloIntermediario!=undefined || this.modeloIntermediario!=null){
      this.formIntermediario.patchValue(this.modeloIntermediario);
    }
  }
  iniciarFormulario(){
    this.formIntermediario = this.formBuilder.group({
      year_compra: ['', Validators.required],
      cantidad_comprada: ['', Validators.required],
      activo: ['true', Validators.required],
      fk_lugar_id: ['', Validators.required],
      produccion: ['', Validators.required],
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
  this.subCargarProductores=this.productorService.obtenerTodos().subscribe(productores=>{
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
this.formIntermediario.controls['produccion'].setValue(this.productorSelected);
this.display = false;
}

showDialog() {
  this.cargarProductores()
    this.display = true;
}




cargarLugarDeProductores():void{
  //this.listaPresentarDatosProductor = []
  this.subCargarProductores=this.lugarService.obtenerTodos().subscribe(lugares=>{
    console.log(lugares.data);
    this.loading=false;
    this.listarLugaresDeProductores=lugares.data;
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
  this.formIntermediario.controls['fk_lugar_id'].setValue(this.lugarSelected);
}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}


get year_compra(){ return this.formIntermediario.get('year_compra');}
get cantidad_comprada(){ return this.formIntermediario.get('cantidad_comprada');}
get activo(){ return this.formIntermediario.get('activo');}
get fk_lugar_id(){ return this.formIntermediario.get('fk_lugar_id');}
get produccion(){ return this.formIntermediario.get('produccion');}


}
