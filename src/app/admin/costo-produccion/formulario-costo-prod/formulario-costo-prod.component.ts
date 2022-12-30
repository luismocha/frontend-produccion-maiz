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

  products1: CostoProduccionDTO[] = [
    {
      nombre: "tivi",
      activo: true,
      id: 1,
      latitud:111,
      longitud:2222
    }
  ];

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
      nombre: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      activo: [true, Validators.required],
    });
  }

crearCanton():void{
  this.submited = true;
  if(this.formCanton.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }

  console.log(this.formCanton.value.nombre)
  console.log(this.formCanton.value.latitud)
  console.log(this.formCanton.value.longitud)
  //todo ok
  let instanciaCantonCrear:CrearCostoProduccionDTO=this.formCanton.value;
  this.onSubmitCanton.emit(instanciaCantonCrear);

}

printTable(){
console.log(this.formCanton.value)
}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

}
