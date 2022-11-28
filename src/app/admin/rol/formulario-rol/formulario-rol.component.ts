import { Component, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventEmitter } from "@angular/core";
import { CrearRolDTO, RolDTO } from '../rol';
import { ListarRolesComponent } from '../listar-roles/listar-roles.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  providers: [MessageService],
  selector: 'app-formulario-rol',
  templateUrl: './formulario-rol.component.html',
  styleUrls: ['./formulario-rol.component.scss']
})
export class FormularioRolComponent implements OnInit {
  //output
  @Output() onSubmitRol:EventEmitter<CrearRolDTO>=new EventEmitter<CrearRolDTO>();
  //input
  @Input() modeloRol!: RolDTO;
  //formulario
  formRol!:FormGroup;
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
    if(this.modeloRol!=undefined || this.modeloRol!=null){
      this.formRol.patchValue(this.modeloRol);
    }
  }
  iniciarFormulario(){
    this.formRol = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  crearGenero():void{
    if(this.formRol.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
      return;
    }
    //todo ok
    let instanciaRolCrear:CrearRolDTO=this.formRol.value;
    this.onSubmitRol.emit(instanciaRolCrear);

  }
  cerrarModal(){
    //this.dialogService.cerrarModal();
    this.ref.close();
  }
}
