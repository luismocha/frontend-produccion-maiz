import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CostoProduccionDTO, CrearCostoProduccionDTO } from '../costo.produccion.model';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-costo-prod',
  templateUrl: './formulario-costo-prod.component.html',
  styleUrls: ['./formulario-costo-prod.component.scss']
})
export class FormularioCostoProdComponent implements OnInit {

  submited: any = false;

  products1: CostoProduccionDTO[] = [];
  costoTotalPorActividad_Siembra: number = 0;
  costoTotalPorActividad_LaboresCulturales: number = 0;
  costoTotalPorActividad_Cosecha: number = 0;
  costoTotalProduccion: number = 0;

  

  //output
  @Output() onSubmitCanton:EventEmitter<CrearCostoProduccionDTO>=new EventEmitter<CrearCostoProduccionDTO>();
  //input
  @Input() modeloCanton!: CostoProduccionDTO;
  @Input() tipoAccion!: string;
  //formulario
  formCanton!:FormGroup;
  //
  idObtainForUpdate: string = '';

 constructor(private formBuilder: FormBuilder,
   //public dialogService: ListarRolesComponent,
   public ref: DynamicDialogRef, 
   private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
      this.aplicarPatch();
  }

  aplicarPatch(){
    if(this.modeloCanton!=undefined || this.modeloCanton!=null){
      this.formCanton.patchValue(this.modeloCanton);
      

    }
  }
  iniciarFormulario(){
    this.formCanton = this.formBuilder.group({
      year:['', Validators.required],

      desbroce_monte: ['', Validators.required],
      quema_maleza: ['', Validators.required],
      seleccion_semilla: ['', Validators.required],
      aplicacion_hebricida: ['', Validators.required],
      desinfeccion_semilla: ['', Validators.required],
      siembra: ['', Validators.required],

      primera_fertilizacion: ['', Validators.required],
      primer_control_plagas: ['', Validators.required],
      primer_control_enfermedades: ['', Validators.required],
      aplicacion_herbicida: ['', Validators.required],
      segunda_fertilizacion: ['', Validators.required],
      segundo_control_plagas: ['', Validators.required],
      segundo_control_enfermedades: ['', Validators.required],
      tercera_fertilizacion: ['', Validators.required],
      tiempo_espera: ['', Validators.required],

      recolectado: ['', Validators.required],
      amontonado: ['', Validators.required],
      desgranado: ['', Validators.required],
      alquiler_desgranadora: ['', Validators.required],
      ensacado_almacenamiento: ['', Validators.required],
      control_tratamiento_maiz: ['', Validators.required],
      venta: ['', Validators.required],
      costo_total: ['', Validators.required],

      activo: ['true', Validators.required],
    });
  }

crearCanton():void{
  this.submited = true;
  if(this.formCanton.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }



  console.log(this.formCanton.value)
  //todo ok
  let instanciaCantonCrear:CrearCostoProduccionDTO=this.formCanton.value;
  this.onSubmitCanton.emit(instanciaCantonCrear);

}

changeSiembra(event: any){
  let desbroceMonte: number = Number(this.formCanton.value.desbroce_monte);
  let quemaMaleza: number = Number(this.formCanton.value.quema_maleza);
  let SeleccionDeSemilla: number = Number(this.formCanton.value.seleccion_semilla);
  let AplicacionDeHerbicida: number = Number(this.formCanton.value.aplicacion_hebricida);
  let desinfeccionDeSemilla: number = Number(this.formCanton.value.desinfeccion_semilla);
  let siembra: number = Number(this.formCanton.value.siembra);
  let total: number = desbroceMonte+quemaMaleza+SeleccionDeSemilla+AplicacionDeHerbicida+desinfeccionDeSemilla+
  siembra;
  this.costoTotalPorActividad_Siembra = total;
  console.log(total)
  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCanton.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}

changeLaboresCulturales(event: any){
  let primeraFertilizacion: number = Number(this.formCanton.value.primera_fertilizacion);
  let primerControlDePlagas: number = Number(this.formCanton.value.primer_control_plagas);
  let primerControlDeEnfermedades: number = Number(this.formCanton.value.primer_control_enfermedades);
  let aplicacionDeHerbicida: number = Number(this.formCanton.value.aplicacion_herbicida);
  let segundaFertilizacion: number = Number(this.formCanton.value.segunda_fertilizacion);
  let segundoControlDePlagas: number = Number(this.formCanton.value.segundo_control_plagas);
  let segundoControlDeEnfermedades: number = Number(this.formCanton.value.segundo_control_enfermedades);
  let terceraFertilizacion: number = Number(this.formCanton.value.tercera_fertilizacion);
  let tiempoDeEspera: number = Number(this.formCanton.value.tiempo_espera);
  let total: number = primeraFertilizacion+primerControlDePlagas+primerControlDeEnfermedades+aplicacionDeHerbicida+
  segundaFertilizacion+segundoControlDePlagas+segundoControlDeEnfermedades+terceraFertilizacion+
  tiempoDeEspera;
  this.costoTotalPorActividad_LaboresCulturales = total;
  console.log(total)
  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCanton.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}


changeCosecha(event: any){
  let recolectado: number = Number(this.formCanton.value.recolectado);
  let amontonado: number = Number(this.formCanton.value.amontonado);
  let desgranado: number = Number(this.formCanton.value.desgranado);
  let alquilerDeDesgranadora: number = Number(this.formCanton.value.alquiler_desgranadora);
  let ensacado_Almacenamiento: number = Number(this.formCanton.value.ensacado_almacenamiento);
  let Control_TratamientoDeMaiz: number = Number(this.formCanton.value.control_tratamiento_maiz);
  let venta: number = Number(this.formCanton.value.venta);
  
  let total: number = recolectado+amontonado+desgranado+alquilerDeDesgranadora+
  ensacado_Almacenamiento+Control_TratamientoDeMaiz+venta;
  this.costoTotalPorActividad_Cosecha = total;
  console.log(total)
  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCanton.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}


printTable(){
console.log(this.formCanton.value)
}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

}
