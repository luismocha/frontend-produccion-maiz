import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioDTO, IntermediarioDTO } from '../intermediario.model';
import { ProductorService } from '../../servicios/productor.service';
import { LitarProductoresDTO, ProductorDTO } from '../../productores/productor.model';
import { Subscription } from 'rxjs';
import { LugarDTO } from '../../lugar/lugar.model';
import { LugarService } from '../../servicios/lugar.service';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-intermediario',
  templateUrl: './formulario-intermediario.component.html',
  styleUrls: ['./formulario-intermediario.component.scss']
})
export class FormularioIntermediarioComponent implements OnInit {

  listarLugaresDeProductores:LugarDTO[] = [];
  listarProductores:LitarProductoresDTO[] = [];
  subCargarProductores!:Subscription;
   //output
   @Output() onSubmitEmpresa:EventEmitter<CrearIntermediarioDTO>=new EventEmitter<CrearIntermediarioDTO>();
   //input
   @Input() modeloEmpresa!: IntermediarioDTO;
   //formulario
   formIntermediario!:FormGroup;
   //
   idObtainForUpdate: string = '';
   productorSelected!: number;
   selectedCustomer!: ProductorDTO;
   loading:boolean=false;
   submited: any = false;

   lugarSelected!: number;

   
  display: boolean = false;

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private productorService:ProductorService,
    private lugarService: LugarService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarLugarDeProductores()
      this.aplicarPatch();
  }

  aplicarPatch(){
    if(this.modeloEmpresa!=undefined || this.modeloEmpresa!=null){
      this.formIntermediario.patchValue(this.modeloEmpresa);
    }
  }
  iniciarFormulario(){
    this.formIntermediario = this.formBuilder.group({
      year: ['', Validators.required],
      cantidad: ['', Validators.required],
      fk_productor: ['', Validators.required],
      fk_lugar: ['', Validators.required],
    });
  }

crearIntermediario():void{
  this.submited = true;
  if(this.formIntermediario.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  let instanciaEmpresaCrear:CrearIntermediarioDTO=this.formIntermediario.value;
  this.onSubmitEmpresa.emit(instanciaEmpresaCrear);

}

cargarProductores():void{
  //this.listaPresentarDatosProductor = []
  this.subCargarProductores=this.productorService.obtenerTodos().subscribe(productores=>{
    //console.log(productores.data);
    this.loading=false;
    this.listarProductores=productores.data;
    //this.combinarCantonProductores()
    

  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

btnSeleccionarroductor(productor:ProductorDTO){
console.log(productor)
this.selectedCustomer = productor
this.productorSelected = productor.id
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
  console.log(event.value['id'])
  this.lugarSelected = event.value['id']
  //this.formParroquia.value.fk_canton_id.id = Number(event.value['id'])
}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}


get year(){ return this.formIntermediario.get('year');}
get cantidad(){ return this.formIntermediario.get('cantidad');}
get fk_productor(){ return this.formIntermediario.get('fk_productor');}
get fk_lugar(){ return this.formIntermediario.get('fk_lugar');}


}
