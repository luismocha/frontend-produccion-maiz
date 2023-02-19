import { ProductorDTO } from 'src/app/admin/productores/productor.model';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProduccionDTO, EditProduccionDTO, ProduccionDTO } from '../produccion.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { LitarProductoresDTO } from '../../productores/productor.model';
import { ProductorService } from '../../servicios/productor.service';
import { TipoProductorDTO } from '../../productores/tipo.producto';
import { SeleccionarProductorComponent } from './seleccionar-productor/seleccionar-productor.component';
import { ProduccionService } from '../../servicios/produccion.service';
import { Router } from '@angular/router';
import { soloNumero } from 'src/app/core/validaciones/validarNumero';
import { validateDecimalesEnteros } from 'src/app/core/validaciones/validateDecimalesEnteros';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-formulario-produccion',
  templateUrl: './formulario-produccion.component.html',
  styleUrls: ['./formulario-produccion.component.scss']
})
export class FormularioProduccionComponent implements OnInit {

  listarTiposDeProductores:TipoProductorDTO[] = [];
  selectedCustomer!: ProductorDTO;
  selectedTipoDeProduccion!: string;
  productorSeleccionado: boolean = false;



   //output
   @Output() onSubmitProduccion:EventEmitter<CrearProduccionDTO>=new EventEmitter<CrearProduccionDTO>();
   //input
   @Input() modeloProduccion!: ProduccionDTO;
    //@Input() modeloUnProduccion!: ProduccionDTO;
   @Input() modoLectura!:boolean;
   //formulario
   formProduccion!:FormGroup;
   //
   tipoProductorSelected!: number;

   submited: any = false;
   ref!: DynamicDialogRef;
  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    //public ref: DynamicDialogRef,
    private productorService:ProductorService,
    private produccionService:ProduccionService,
    public dialogService: DialogService,
    private router:Router, 
    private messageService: MessageService) { }
    

  ngOnInit(): void {

    this.iniciarFormulario();
    this.cargarTiposDeProductores()
    this.productorService.productoSeleccionadoh$.subscribe((productor)=>{
        this.selectedCustomer=productor;
    });
    this.produccionService.refresh$.subscribe(()=>{
      this.router.navigate(['/admin/produccion']);
        this.selectedCustomer={} as ProductorDTO;
    });

    this.aplicarPatch();
  }

  aplicarPatch(){
    if(this.modeloProduccion!=undefined || this.modeloProduccion!=null){
      this.formProduccion.patchValue(this.modeloProduccion);
      this.tipoProductorSelected = Number(this.modeloProduccion.fk_tipo_productor.id);
      this.selectedCustomer= this.modeloProduccion.fk_productor;
      let fechaObtenida: number = Number(this.modeloProduccion.year)
      const fecha = new Date(fechaObtenida, 0, 1);
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.modeloProduccion.fk_tipo_productor.nombre);
      this.formProduccion.controls['year'].setValue(fecha);
    }
  }
  validarNumero(event:any){
    return soloNumero(event);
  }
  validateDecimalesEnteros(event:any){
    return validateDecimalesEnteros(event);
  }

  iniciarFormulario(){
    this.formProduccion = this.formBuilder.group({
      year: ['', [Validators.required]],
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
  if(!this.selectedCustomer){
        return this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe seleccionar un proveedor'});
  }
  if(this.formProduccion.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return Object.values(this.formProduccion.controls).forEach(contol=>{
        contol.markAsTouched();
    });
  }
  //todo ok

  if(this.formProduccion.value.year){
    this.formProduccion.controls['year'].setValue(this.formProduccion.value.year.getFullYear());
  }

  this.formProduccion.value.fk_tipo_productor_id = this.tipoProductorSelected;
  this.formProduccion.value.fk_productor_id = this.selectedCustomer.id
  const instanciaCantonCrear:CrearProduccionDTO=this.formProduccion.value;
  this.onSubmitProduccion.emit(instanciaCantonCrear);

  if(this.onSubmitProduccion.hasError == false){
    const fecha = new Date(2023, 0, 1);

      this.formProduccion.controls['year'].setValue(fecha);
  }

}

/* cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
} */


showDialog() {
    this.ref=this.dialogService.open(SeleccionarProductorComponent, {
        header: 'Productores',
        width: '70%'
      });
}


cargarTiposDeProductores():void{
  //this.listaPresentarDatosProductor = []
   this.productorService.obtenerTodosTiposDeProductores().subscribe(productores=>{
    this.listarTiposDeProductores=productores.data;
    //this.combinarCantonProductores()
  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

changeQuintalesToneladas(event: any){
  let valorQuintales = this.formProduccion.value.quintales;
  let valorTonelada = valorQuintales/22;
  this.formProduccion.controls['toneladas'].setValue(valorTonelada.toFixed(2));
}

changeTipoProduccion(event: any){
  let valorHectareas: number = this.formProduccion.value.hectareas;

  for (let i = 0; i < this.listarTiposDeProductores.length; i++) {

    if(valorHectareas <= 5 && this.listarTiposDeProductores[i].nombre.toLowerCase()=== 'pequeño'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }
    if(valorHectareas >= 5 && valorHectareas<=10 && this.listarTiposDeProductores[i].nombre.toLowerCase()=== 'mediano'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }
    if(valorHectareas >= 10 && this.listarTiposDeProductores[i].nombre.toLowerCase()=== 'grande'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }

  }



}





get year(){ return this.formProduccion.get('year')?.invalid && this.formProduccion.get('year')?.touched ;}
get hectareas(){ return this.formProduccion.get('hectareas')?.invalid && this.formProduccion.get('hectareas')?.touched;}
get precio_venta(){ return this.formProduccion.get('precio_venta')?.invalid && this.formProduccion.get('precio_venta')?.touched;}
get toneladas(){ return this.formProduccion.get('toneladas')?.invalid && this.formProduccion.get('toneladas')?.touched;}
get quintales(){ return this.formProduccion.get('quintales')?.invalid && this.formProduccion.get('quintales')?.touched;}
get activo(){ return this.formProduccion.get('activo')?.invalid && this.formProduccion.get('activo')?.touched;}
get fk_tipo_productor_id(){ return this.formProduccion.get('fk_tipo_productor_id')?.invalid && this.formProduccion.get('fk_tipo_productor_id')?.touched;}
get fk_productor_id(){ return this.formProduccion.get('fk_productor_id')?.invalid && this.formProduccion.get('fk_productor_id')?.touched;}
}
