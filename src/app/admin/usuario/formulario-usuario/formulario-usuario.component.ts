import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearUsuarioDTO, UsuarioDTO } from '../usuario.model';



@Component({
  providers: [MessageService],
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {

  submited: any = false;
  //output
  @Output() onSubmitUsuario:EventEmitter<CrearUsuarioDTO>=new EventEmitter<CrearUsuarioDTO>();
  //input
  @Input() modeloUsuario!: UsuarioDTO;
  @Input() tipoAccion!: string;
  //formulario
  formUsuario!:FormGroup;
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
    if(this.modeloUsuario!=undefined || this.modeloUsuario!=null){
      this.formUsuario.patchValue(this.modeloUsuario);


    }
  }
  iniciarFormulario(){
    this.formUsuario = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

crearUsuario():void{
  this.submited = true;
  if(this.formUsuario.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  console.log(this.formUsuario.value)
  let instanciaUsuarioCrear:CrearUsuarioDTO=this.formUsuario.value;
  this.onSubmitUsuario.emit(instanciaUsuarioCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

get usuario(){ return this.formUsuario.get('usuario');}
get correo(){ return this.formUsuario.get('correo');}
get password(){ return this.formUsuario.get('password');}
}
