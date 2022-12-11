import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LitarCantonesDTO, obtenerCantonDTO } from '../../canton/canton.model';
import { LitarParroquiasDTO, obtenerParroquiaDTO } from '../../parroquia/parroquia.model';
import { CantonService } from '../../servicios/canton.service';
import { CrearProductorDTO, obtenerProductorDTO, ProductorDTO } from '../productor.model';
import { Subscription } from 'rxjs';
import { ParroquiaService } from '../../servicios/parroquia.service';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-productor',
  templateUrl: './formulario-productor.component.html',
  styleUrls: ['./formulario-productor.component.scss']
})
export class FormularioProductorComponent implements OnInit {

  subCargarCantones!:Subscription;
  subCargarParroquias!:Subscription;

  listarCantones:LitarCantonesDTO[] = [];
  listarParroquias:LitarParroquiasDTO[] = [];
  //variables globales
  loading:boolean=false;
  loadingParroquia:boolean=false;
  
 
  cedulaValidadaConExito?: boolean;

  cantones: obtenerCantonDTO[];
  parroquias: obtenerParroquiaDTO[];
  selectedCity1!: obtenerProductorDTO;
   //output
   @Output() onSubmitProductor:EventEmitter<CrearProductorDTO>=new EventEmitter<CrearProductorDTO>();
   //input
   @Input() modeloProductor!: ProductorDTO;
   //formulario
   formProductor!:FormGroup;
   
   //
   idObtainForUpdate: string = '';
  constructor(private parroquiaService:ParroquiaService,
    private cantonService:CantonService, 
    private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
     public ref: DynamicDialogRef,
    private messageService: MessageService) {
      this.cantones = [];
      this.parroquias = [];
     }

  ngOnInit(): void {
    this.cargarCantones()
    this.cargarParroquias()
    this.iniciarFormulario();
      this.aplicarPatch()
  }

  aplicarPatch(){
    if(this.modeloProductor!=undefined || this.modeloProductor!=null){
      if(this.validarcedula(this.modeloProductor.cedula)){
        this.cedulaValidadaConExito = true
      }
      this.formProductor.patchValue(this.modeloProductor);
   
      
      
    }
  }
  iniciarFormulario(){
    this.formProductor = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.maxLength(250)]],
      apellido: ['', [Validators.required, Validators.maxLength(250)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      activo: [true, Validators.required],
      fk_canton: ['', [Validators.required]],
      fk_parroquia: ['', [Validators.required]],
    });
  }

crearProductor():void{
  
  
  if(this.formProductor.value.cedula != undefined){

    this.validarcedula(this.formProductor.get('cedula'))
  }
  if(this.formProductor.invalid && this.cedulaValidadaConExito){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  //console.log(this.formProductor.value.fk_canton)
  //console.log(this.listarCantones)
  for (let i = 0; i < this.listarCantones.length; i++) {
    
    if(this.listarCantones[i].nombre == this.formProductor.value.fk_canton.name){
      this.formProductor.value.fk_canton = Number(this.listarCantones[i].id)
      //console.log(this.formProductor.value.fk_canton)
    }
  }


  let instanciaProductorCrear:CrearProductorDTO=this.formProductor.value;
  this.onSubmitProductor.emit(instanciaProductorCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

cargarCantones():void{
  this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
    //console.log(cantones);
    this.loading=false;
    this.listarCantones=cantones;
    for (let i = 0; i < cantones.length; i++) {
      let mapa = {id: cantones[i].id,name: cantones[i].nombre}
      this.cantones = [mapa, ...this.cantones]
      }
  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

onChangeCanton(event: any) {
  if(!event.value) return
  this.formProductor.value.fk_canton = Number(event.value['id'])
}

cargarParroquias():void{
  this.subCargarParroquias=this.parroquiaService.obtenerTodos().subscribe(parroquias=>{
    //console.log(parroquias);
    this.loadingParroquia=false;
    this.listarParroquias=parroquias;

    for (let i = 0; i < parroquias.length; i++) {
      let mapa = {id: parroquias[i].id,name: parroquias[i].nombre}
      this.parroquias = [mapa, ...this.parroquias]
      }
      

  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });
}

onChangeParroquia(event: any) {
  if(!event.value) return
  console.log(event.value['id']);

  this.formProductor.value.fk_parroquia = Number(event.value['id'])
}

validarcedula(cedula: any) {
  
  
  if(cedula.value === undefined){
    cedula = cedula;
    console.log(cedula)
  }else{
    cedula = cedula.value
    console.log(cedula)
  }

  //Preguntamos si la cedula consta de 10 digitos
  if (cedula.length === 10) {

    //Obtenemos el digito de la region que sonlos dos primeros digitos
    var digito_region = cedula.substring(0, 2);

    //Pregunto si la region existe ecuador se divide en 24 regiones
    if (digito_region >= 1 && digito_region <= 24) {

      // Extraigo el ultimo digito
      var ultimo_digito = parseInt(cedula.substring(9, 10));

      //Agrupo todos los pares y los sumo
      var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

      //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
      var numero1 = cedula.substring(0, 1);
      numero1 = (numero1 * 2);
      if (numero1 > 9) { numero1 = (numero1 - 9); }

      var numero3 = cedula.substring(2, 3);
      numero3 = (numero3 * 2);
      if (numero3 > 9) { numero3 = (numero3 - 9); }

      var numero5 = cedula.substring(4, 5);
      numero5 = (numero5 * 2);
      if (numero5 > 9) { numero5 = (numero5 - 9); }

      var numero7 = cedula.substring(6, 7);
      numero7 = (numero7 * 2);
      if (numero7 > 9) { numero7 = (numero7 - 9); }

      var numero9 = cedula.substring(8, 9);
      numero9 = (numero9 * 2);
      if (numero9 > 9) { numero9 = (numero9 - 9); }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      //Suma total
      var suma_total = (pares + impares);

      //extraemos el primero digito
      var primer_digito_suma = String(suma_total).substring(0, 1);

      //Obtenemos la decena inmediata
      var decena = (parseInt(primer_digito_suma) + 1) * 10;

      //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
      var digito_validador = decena - suma_total;

      //Si el digito validador es = a 10 toma el valor de 0
      if (digito_validador === 10) {
        digito_validador = 0;
      }
      //Validamos que el digito validador sea igual al de la cedula
      if (digito_validador === ultimo_digito) {
        //console.log('ok')
        this.cedulaValidadaConExito = true;
        return true
      } else {
        //console.log('NO ok')

        this.cedulaValidadaConExito = false;
        return false
      }

    } else {
      this.cedulaValidadaConExito = false;
      //console.log('NO ok')
      // imprimimos en consola si la region no pertenece
      return false
    }
  } else {
    //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
    return false
  }
}
ngOnDestroy(): void {
  if(this.subCargarParroquias){
    this.subCargarParroquias.unsubscribe();
  }
  if(this.subCargarCantones){
    this.subCargarCantones.unsubscribe();
  }

  if (this.ref) {
    this.ref.close();
  }
}

get nombre(){ return this.formProductor.get('nombre');}
get apellido(){ return this.formProductor.get('apellido');}
get cedula(){ return this.formProductor.get('cedula');}
get celular(){ return this.formProductor.get('celular');}
get fk_canton(){ return this.formProductor.get('fk_canton');}
get fk_parroquia(){ return this.formProductor.get('fk_parroquia');}
}
