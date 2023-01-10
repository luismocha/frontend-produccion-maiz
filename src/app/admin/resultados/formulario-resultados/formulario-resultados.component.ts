import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearResultadoDTO, ResultadoDTO } from '../resultados.model';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-resultados',
  templateUrl: './formulario-resultados.component.html',
  styleUrls: ['./formulario-resultados.component.scss']
})
export class FormularioResultadosComponent implements OnInit {

  submited: any = false;
  
  //output
  @Output() onSubmitResultado:EventEmitter<CrearResultadoDTO>=new EventEmitter<CrearResultadoDTO>();
  //input
  @Input() modeloResultado!: ResultadoDTO;
  @Input() tipoAccion!: string;
  //formulario
  formResultado!:FormGroup;
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
    if(this.modeloResultado!=undefined || this.modeloResultado!=null){
      this.formResultado.patchValue(this.modeloResultado);
      
      let fechaObtenida: number = Number(this.modeloResultado.year)
      const fecha = new Date(fechaObtenida, 0, 1);
      
      this.formResultado.controls['year'].setValue(fecha);

    }
  }
  iniciarFormulario(){
    this.formResultado = this.formBuilder.group({
      year: ['', Validators.required],
      costo_total_produccion: ['', Validators.required],
      rentabilidad: ['', Validators.required],
    });
  }

crearResultado():void{
  this.submited = true;
  if(this.formResultado.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }

  console.log(this.formResultado.value.nombre)
  console.log(this.formResultado.value.latitud)
  console.log(this.formResultado.value.longitud)
  //todo ok

  if(this.formResultado.value.year){
    this.formResultado.controls['year'].setValue(this.formResultado.value.year.getFullYear());
  }

  let instanciaResultadoCrear:CrearResultadoDTO=this.formResultado.value;
  this.onSubmitResultado.emit(instanciaResultadoCrear);


  if(this.onSubmitResultado.hasError == false){
    const fecha = new Date(2023, 0, 1);
      
      this.formResultado.controls['year'].setValue(fecha);
  }

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

get year(){ return this.formResultado.get('year');}
get costo_total_produccion(){ return this.formResultado.get('costo_total_produccion');}
get rentabilidad(){ return this.formResultado.get('rentabilidad');}

}
