import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { soloNumero } from 'src/app/core/validaciones/validarNumero';
import { CostoProduccionService } from '../../servicios/costo-produccion.service';
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
  @Input() modoLectura!: boolean;
  @Input() tipoAccion!: string;
  //formulario
  formCostoProduccion!:FormGroup;
  //
  idObtainForUpdate: string = '';

 constructor(private formBuilder: FormBuilder,
   //public dialogService: ListarRolesComponent,
   //public ref: DynamicDialogRef,
   private router:Router, 
   private costoProduccionService:CostoProduccionService,
   private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
      this.aplicarPatch();
      this.costoProduccionService.refresh$.subscribe(()=>{
        this.router.navigate(['/admin/costo-produccion']);
      });
  }

  aplicarPatch(){

    if(this.modeloCanton!=undefined || this.modeloCanton!=null){
      this.formCostoProduccion.patchValue(this.modeloCanton);
      this.costoTotalPorActividad_Siembra = Number(this.modeloCanton.siembra_total)
      this.costoTotalPorActividad_LaboresCulturales = Number(this.modeloCanton.labores_culturales_total)
      this.costoTotalPorActividad_Cosecha = Number(this.modeloCanton.cosecha_total)
      this.costoTotalProduccion = Number(this.modeloCanton.costo_total)
      let fechaObtenida: number = Number(this.modeloCanton.year)
      const fecha = new Date(fechaObtenida, 0, 1);

      this.formCostoProduccion.controls['year'].setValue(fecha);
    }
  }

  validarNumero(event:any){
    return soloNumero(event);
}
  iniciarFormulario(){
    this.formCostoProduccion = this.formBuilder.group({
      year:['', Validators.required],

      desbroce_monte: ['', Validators.required],
      quema_maleza: ['', Validators.required],
      seleccion_semilla: ['', Validators.required],
      aplicacion_hebricida: ['', Validators.required],
      desinfeccion_semilla: ['', Validators.required],
      siembra: ['', Validators.required],
      siembra_total: ['', Validators.required],

      primera_fertilizacion: ['', Validators.required],
      primer_control_plagas: ['', Validators.required],
      primer_control_enfermedades: ['', Validators.required],
      aplicacion_herbicida: ['', Validators.required],
      segunda_fertilizacion: ['', Validators.required],
      segundo_control_plagas: ['', Validators.required],
      segundo_control_enfermedades: ['', Validators.required],
      tercera_fertilizacion: ['', Validators.required],
      tiempo_espera: ['', Validators.required],
      labores_culturales_total: ['', Validators.required],

      recolectado: ['', Validators.required],
      amontonado: ['', Validators.required],
      desgranado: ['', Validators.required],
      alquiler_desgranadora: ['', Validators.required],
      ensacado_almacenamiento: ['', Validators.required],
      control_tratamiento_maiz: ['', Validators.required],
      venta: ['', Validators.required],
      cosecha_total: ['', Validators.required],

      costo_total: ['', Validators.required],
      activo: ['true', Validators.required],
    });
  }

crearCanton():void{

  this.submited = true;
  if(this.formCostoProduccion.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }

  if(this.formCostoProduccion.value.year){
    this.formCostoProduccion.controls['year'].setValue(this.formCostoProduccion.value.year.getFullYear());
  }




  //todo ok
  let instanciaCantonCrear:CrearCostoProduccionDTO=this.formCostoProduccion.value;
  this.onSubmitCanton.emit(instanciaCantonCrear);
  if(this.onSubmitCanton.hasError == false){
    const fecha = new Date(2023, 0, 1);

      this.formCostoProduccion.controls['year'].setValue(fecha);
  }

}

changeSiembra(event: any){
  let desbroceMonte: number = Number(this.formCostoProduccion.value.desbroce_monte);
  let quemaMaleza: number = Number(this.formCostoProduccion.value.quema_maleza);
  let SeleccionDeSemilla: number = Number(this.formCostoProduccion.value.seleccion_semilla);
  let AplicacionDeHerbicida: number = Number(this.formCostoProduccion.value.aplicacion_hebricida);
  let desinfeccionDeSemilla: number = Number(this.formCostoProduccion.value.desinfeccion_semilla);
  let siembra: number = Number(this.formCostoProduccion.value.siembra);
  let total: number = desbroceMonte+quemaMaleza+SeleccionDeSemilla+AplicacionDeHerbicida+desinfeccionDeSemilla+
  siembra;
  this.costoTotalPorActividad_Siembra = total;
  //this.formCanton.value.siembra_total = this.costoTotalPorActividad_Siembra;
  this.formCostoProduccion.controls['siembra_total'].setValue(this.costoTotalPorActividad_Siembra);

  console.log(total)
  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCostoProduccion.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}

changeLaboresCulturales(event: any){
  let primeraFertilizacion: number = Number(this.formCostoProduccion.value.primera_fertilizacion);
  let primerControlDePlagas: number = Number(this.formCostoProduccion.value.primer_control_plagas);
  let primerControlDeEnfermedades: number = Number(this.formCostoProduccion.value.primer_control_enfermedades);
  let aplicacionDeHerbicida: number = Number(this.formCostoProduccion.value.aplicacion_herbicida);
  let segundaFertilizacion: number = Number(this.formCostoProduccion.value.segunda_fertilizacion);
  let segundoControlDePlagas: number = Number(this.formCostoProduccion.value.segundo_control_plagas);
  let segundoControlDeEnfermedades: number = Number(this.formCostoProduccion.value.segundo_control_enfermedades);
  let terceraFertilizacion: number = Number(this.formCostoProduccion.value.tercera_fertilizacion);
  let tiempoDeEspera: number = Number(this.formCostoProduccion.value.tiempo_espera);
  let total: number = primeraFertilizacion+primerControlDePlagas+primerControlDeEnfermedades+aplicacionDeHerbicida+
  segundaFertilizacion+segundoControlDePlagas+segundoControlDeEnfermedades+terceraFertilizacion+
  tiempoDeEspera;
  this.costoTotalPorActividad_LaboresCulturales = total;


  //this.formCanton.value.labores_culturales_total = this.costoTotalPorActividad_LaboresCulturales;
  this.formCostoProduccion.controls['labores_culturales_total'].setValue(this.costoTotalPorActividad_LaboresCulturales);

  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCostoProduccion.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}


changeCosecha(event: any){
  let recolectado: number = Number(this.formCostoProduccion.value.recolectado);
  let amontonado: number = Number(this.formCostoProduccion.value.amontonado);
  let desgranado: number = Number(this.formCostoProduccion.value.desgranado);
  let alquilerDeDesgranadora: number = Number(this.formCostoProduccion.value.alquiler_desgranadora);
  let ensacado_Almacenamiento: number = Number(this.formCostoProduccion.value.ensacado_almacenamiento);
  let Control_TratamientoDeMaiz: number = Number(this.formCostoProduccion.value.control_tratamiento_maiz);
  let venta: number = Number(this.formCostoProduccion.value.venta);

  let total: number = recolectado+amontonado+desgranado+alquilerDeDesgranadora+
  ensacado_Almacenamiento+Control_TratamientoDeMaiz+venta;
  this.costoTotalPorActividad_Cosecha = total;

  //this.formCanton.value.cosecha_total = this.costoTotalPorActividad_Cosecha;
  this.formCostoProduccion.controls['cosecha_total'].setValue(this.costoTotalPorActividad_Cosecha);

  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCostoProduccion.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}


printTable(){
//console.log(this.formCanton.value)
}


get year(){ return this.formCostoProduccion.get('year');}
get desbroce_monte(){ return this.formCostoProduccion.get('desbroce_monte');}
get quema_maleza(){ return this.formCostoProduccion.get('quema_maleza');}
get seleccion_semilla(){ return this.formCostoProduccion.get('seleccion_semilla');}
get aplicacion_hebricida(){ return this.formCostoProduccion.get('aplicacion_hebricida');}
get desinfeccion_semilla(){ return this.formCostoProduccion.get('desinfeccion_semilla');}
get siembra(){ return this.formCostoProduccion.get('siembra');}
get primera_fertilizacion(){ return this.formCostoProduccion.get('primera_fertilizacion');}
get primer_control_plagas(){ return this.formCostoProduccion.get('primer_control_plagas');}
get primer_control_enfermedades(){ return this.formCostoProduccion.get('primer_control_enfermedades');}
get aplicacion_herbicida(){ return this.formCostoProduccion.get('aplicacion_herbicida');}
get segunda_fertilizacion(){ return this.formCostoProduccion.get('segunda_fertilizacion');}
get segundo_control_plagas(){ return this.formCostoProduccion.get('segundo_control_plagas');}
get segundo_control_enfermedades(){ return this.formCostoProduccion.get('segundo_control_enfermedades');}
get tercera_fertilizacion(){ return this.formCostoProduccion.get('tercera_fertilizacion');}
get tiempo_espera(){ return this.formCostoProduccion.get('tiempo_espera');}
get recolectado(){ return this.formCostoProduccion.get('recolectado');}
get amontonado(){ return this.formCostoProduccion.get('amontonado');}
get desgranado(){ return this.formCostoProduccion.get('desgranado');}
get alquiler_desgranadora(){ return this.formCostoProduccion.get('alquiler_desgranadora');}
get ensacado_almacenamiento(){ return this.formCostoProduccion.get('ensacado_almacenamiento');}
get control_tratamiento_maiz(){ return this.formCostoProduccion.get('control_tratamiento_maiz');}
get venta(){ return this.formCostoProduccion.get('venta');}


}
