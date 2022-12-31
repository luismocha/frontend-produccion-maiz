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
  selectedTipoDeProduccion!: string;

  
  
   //output
   @Output() onSubmitProduccion:EventEmitter<CrearProduccionDTO>=new EventEmitter<CrearProduccionDTO>();
   //input
   @Input() modeloProduccion!: EditProduccionDTO;
   @Input() modeloUnProduccion!: ProduccionDTO;
   @Input() tipoAccion!: string;
   //formulario
   formProduccion!:FormGroup;
   //
   cantones = ['1'];
   selectedCity1 = '1';
   
   idObtainForUpdate: string = '';
   tipoProductorSelected!: number;
   productorSelected!: number;
   submited: any = false;

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private productorService:ProductorService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.iniciarFormulario();
    this.cargarTiposDeProductores()
      this.aplicarPatch();

      if(this.tipoProductorSelected){
        setTimeout(() => {
          console.log(this.tipoProductorSelected.toString())
          console.log(this.listarTiposDeProductores)
          for (let i = 0; i < this.listarTiposDeProductores.length; i++) {
            if(Number(this.listarTiposDeProductores[i].id) === this.tipoProductorSelected){
              this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
              this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
              this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
            }
            
          }
        }, 1000);
      }
  }

  aplicarPatch(){

    if(this.modeloUnProduccion != undefined)
    {
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
    }
    


    if(this.modeloProduccion!=undefined || this.modeloProduccion!=null){
      this.formProduccion.patchValue(this.modeloProduccion);
      
      this.tipoProductorSelected = Number(this.modeloProduccion.fk_tipo_productor_id);
      this.productorSelected = this.modeloProduccion.fk_productor_id;


     


    }
  }
  iniciarFormulario(){
    this.formProduccion = this.formBuilder.group({
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      hectareas: ['', Validators.required],
      precio_venta: ['', Validators.required],
      toneladas: ['', Validators.required],
      quintales: ['', Validators.required],
      activo: ['true', Validators.required],
      fk_tipo_productor_id: ['', Validators.required],
      fk_productor_id: [''],
    });
  }


crearProduccion():void{
  this.submited = true;
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

changeQuintalesToneladas(event: any){
  let valorQuintales = this.formProduccion.value.quintales;
  let valorTonelada = valorQuintales/10;
  this.formProduccion.controls['toneladas'].setValue(valorTonelada);
}

changeTipoProduccion(event: any){
  console.log('event')
  let valorHectareas = this.formProduccion.value.hectareas;
  
  console.log(this.formProduccion.value.hectareas)

  for (let i = 0; i < this.listarTiposDeProductores.length; i++) {
    
    if(valorHectareas <= 5 && this.listarTiposDeProductores[i].nombre.toLocaleLowerCase()=== 'pequeño'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }
    if(valorHectareas >= 5 && valorHectareas<=10 && this.listarTiposDeProductores[i].nombre.toLocaleLowerCase()=== 'mediano'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }
    if(valorHectareas >= 10 && this.listarTiposDeProductores[i].nombre.toLocaleLowerCase()=== 'grande'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }

  }


  
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

get year(){ return this.formProduccion.get('year');}
get hectareas(){ return this.formProduccion.get('hectareas');}
get precio_venta(){ return this.formProduccion.get('precio_venta');}
get toneladas(){ return this.formProduccion.get('toneladas');}
get quintales(){ return this.formProduccion.get('quintales');}
get activo(){ return this.formProduccion.get('activo');}
get fk_tipo_productor_id(){ return this.formProduccion.get('fk_tipo_productor_id');}
get fk_productor_id(){ return this.formProduccion.get('fk_productor_id');}
}
