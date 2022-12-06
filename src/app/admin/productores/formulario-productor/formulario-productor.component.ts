import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearParroquiaDTO } from '../../parroquia/parroquia.model';
import { CrearProductorDTO, obtenerProductorDTO, ProductorDTO } from '../productor.model';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-productor',
  templateUrl: './formulario-productor.component.html',
  styleUrls: ['./formulario-productor.component.scss']
})
export class FormularioProductorComponent implements OnInit {

  cities: obtenerProductorDTO[];
  selectedCity1!: obtenerProductorDTO;

   //output
   @Output() onSubmitProductor:EventEmitter<CrearProductorDTO>=new EventEmitter<CrearProductorDTO>();
   //input
   @Input() modeloProductor!: ProductorDTO;
   //formulario
   formProductor!:FormGroup;
   //
   idObtainForUpdate: string = '';
  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private messageService: MessageService) {
      this.cities = [
        {name: 'Celica'},
        {name: 'Pindal'},
        {name: 'Zapotillo'},
      ];
     }

  ngOnInit(): void {
    this.iniciarFormulario();
      this.aplicarPatch();
     
      console.log(this.cities)
  }

  aplicarPatch(){
    if(this.modeloProductor!=undefined || this.modeloProductor!=null){
      this.formProductor.patchValue(this.modeloProductor);
    }
  }
  iniciarFormulario(){
    this.formProductor = this.formBuilder.group({
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', Validators.required],
    });
  }

crearProductor():void{
  if(this.formProductor.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  let instanciaProductorCrear:CrearParroquiaDTO=this.formProductor.value;
  this.onSubmitProductor.emit(instanciaProductorCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}
}
