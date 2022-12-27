import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProduccionDTO, EditProduccionDTO, ProduccionDTO } from '../produccion.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { LitarProductoresDTO, ProductorDTO } from '../../productores/productor.model';
import { ProductorService } from '../../servicios/productor.service';
import { TipoProductorDTO } from '../../productores/tipo.producto';


@Component({
  providers: [MessageService],
  selector: 'app-formulario-produccion',
  templateUrl: './formulario-produccion.component.html',
  styleUrls: ['./formulario-produccion.component.scss']
})
export class FormularioProduccionComponent implements OnInit {


  subCargarProductores!:Subscription;
  listarProductores:LitarProductoresDTO[] = [];
  listarTiposDeProductores:TipoProductorDTO[] = [];
  selectedCustomer!: ProductorDTO;
  loading:boolean=false;

  
  
   //output
   @Output() onSubmitProduccion:EventEmitter<CrearProduccionDTO>=new EventEmitter<CrearProduccionDTO>();
   //input
   @Input() modeloProduccion!: EditProduccionDTO;
   @Input() modeloUnProduccion!: ProduccionDTO;
   //formulario
   formProduccion!:FormGroup;
   //
   cantones = ['1'];
   selectedCity1 = '1';
   
   idObtainForUpdate: string = '';
   tipoProductorSelected!: number;
   productorSelected!: number;

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private productorService:ProductorService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.iniciarFormulario();
    this.cargarTiposDeProductores()
      this.aplicarPatch();

  }

  aplicarPatch(){


    this.modeloProduccion = {
      id: this.modeloUnProduccion.id,
      year: this.modeloUnProduccion.year,
      hectareas: this.modeloUnProduccion.hectareas,
      precio_venta: this.modeloUnProduccion.precio_venta,
      toneladas: this.modeloUnProduccion.toneladas,
      quintales: this.modeloUnProduccion.quintales,
      activo: this.modeloUnProduccion.activo,
      fk_tipo_productor_id: this.modeloUnProduccion.fk_tipo_productor.id,
      fk_productor_id: this.modeloUnProduccion.fk_productor.id,
    }


    if(this.modeloProduccion!=undefined || this.modeloProduccion!=null){
      this.formProduccion.patchValue(this.modeloProduccion);
      this.tipoProductorSelected = Number(this.modeloProduccion.fk_tipo_productor_id);
      this.productorSelected = this.modeloProduccion.fk_productor_id;


    }
  }
  iniciarFormulario(){
    this.formProduccion = this.formBuilder.group({
      year: ['', Validators.required],
      hectareas: ['', Validators.required],
      precio_venta: ['', Validators.required],
      toneladas: ['', Validators.required],
      quintales: ['', Validators.required],
      activo: ['true', Validators.required],
      fk_tipo_productor_id: [''],
      fk_productor_id: [''],
    });
  }


crearProduccion():void{
  if(this.formProduccion.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  this.formProduccion.value.fk_tipo_productor_id = this.tipoProductorSelected
  this.formProduccion.value.fk_productor_id = this.productorSelected
  let instanciaCantonCrear:CrearProduccionDTO=this.formProduccion.value;
  this.onSubmitProduccion.emit(instanciaCantonCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

display: boolean = false;

showDialog() {
  this.cargarProductores()
    this.display = true;
}


cargarTiposDeProductores():void{
  //this.listaPresentarDatosProductor = []
  this.subCargarProductores=this.productorService.obtenerTodosTiposDeProductores().subscribe(productores=>{
    console.log(productores.data);
    this.loading=false;
    this.listarTiposDeProductores=productores.data;
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
  this.tipoProductorSelected = event.value['id']
  //this.formParroquia.value.fk_canton_id.id = Number(event.value['id'])
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


}
