import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProduccionDTO, ProduccionDTO } from '../produccion.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { LitarProductoresDTO, ProductorDTO } from '../../productores/productor.model';
import { ProductorService } from '../../servicios/productor.service';


@Component({
  providers: [MessageService],
  selector: 'app-formulario-produccion',
  templateUrl: './formulario-produccion.component.html',
  styleUrls: ['./formulario-produccion.component.scss']
})
export class FormularioProduccionComponent implements OnInit {


  subCargarProductores!:Subscription;
  listarProductores:LitarProductoresDTO[] = [];
  selectedCustomer!: ProductorDTO;
  loading:boolean=false;
  
   //output
   @Output() onSubmitProduccion:EventEmitter<CrearProduccionDTO>=new EventEmitter<CrearProduccionDTO>();
   //input
   @Input() modeloProduccion!: ProduccionDTO;
   //formulario
   formProduccion!:FormGroup;
   //
   cantones = ['1'];
   selectedCity1 = '1';
   
   idObtainForUpdate: string = '';

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private productorService:ProductorService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.iniciarFormulario();
      this.aplicarPatch();

  }

  aplicarPatch(){
    if(this.modeloProduccion!=undefined || this.modeloProduccion!=null){
      this.formProduccion.patchValue(this.modeloProduccion);


    }
  }
  iniciarFormulario(){
    this.formProduccion = this.formBuilder.group({
      fecha: ['', Validators.required],
      costo_total: ['', Validators.required],
      quintales: ['', Validators.required],
      fk_tipo: ['1'],
      hectareas: ['', Validators.required],
    });
  }

crearProduccion():void{
  if(this.formProduccion.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
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
this.display = false;
}


}
