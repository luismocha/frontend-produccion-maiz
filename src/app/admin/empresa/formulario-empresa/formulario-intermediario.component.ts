import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioDTO, IntermediarioDTO } from '../intermediario.model';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-intermediario',
  templateUrl: './formulario-intermediario.component.html',
  styleUrls: ['./formulario-intermediario.component.scss']
})
export class FormularioIntermediarioComponent implements OnInit {

  
   //output
   @Output() onSubmitEmpresa:EventEmitter<CrearIntermediarioDTO>=new EventEmitter<CrearIntermediarioDTO>();
   //input
   @Input() modeloEmpresa!: IntermediarioDTO;
   //formulario
   formEmpresa!:FormGroup;
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
    if(this.modeloEmpresa!=undefined || this.modeloEmpresa!=null){
      this.formEmpresa.patchValue(this.modeloEmpresa);
    }
  }
  iniciarFormulario(){
    this.formEmpresa = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      contacto: ['', Validators.required],
    });
  }

crearEmpresa():void{
  if(this.formEmpresa.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  let instanciaEmpresaCrear:CrearIntermediarioDTO=this.formEmpresa.value;
  this.onSubmitEmpresa.emit(instanciaEmpresaCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

}
