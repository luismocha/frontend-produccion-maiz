import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearUsuarioDTO, EditUsuarioDTO, UsuarioDTO, obtenerUsuarioDTO } from '../usuario.model';



@Component({
  providers: [MessageService],
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {

  submited: any = false;
  passwordEquals: boolean = false;
  //output
  @Output() onSubmitUsuario:EventEmitter<CrearUsuarioDTO>=new EventEmitter<CrearUsuarioDTO>();
  //input
  @Input() modeloUsuario!: EditUsuarioDTO;
  @Input() modeloUnaUsuario!: obtenerUsuarioDTO;


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

    console.log(this.modeloUnaUsuario.id)
    this.modeloUsuario = {
      id: this.modeloUnaUsuario.id,
      username: this.modeloUnaUsuario.username,
      email: this.modeloUnaUsuario.email,
      password: '',
      password2: ''
    }

    if(this.modeloUsuario!=undefined || this.modeloUsuario!=null){
      this.formUsuario.patchValue(this.modeloUsuario);


    }
  }
  iniciarFormulario(){
    this.formUsuario = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

crearUsuario():void{
  this.submited = true;
  if((this.formUsuario.value.password == this.formUsuario.value.password2) && this.formUsuario.valid){
    this.passwordEquals = true;
      //todo ok
 console.log(this.formUsuario.value)
 let instanciaUsuarioCrear:CrearUsuarioDTO=this.formUsuario.value;
 this.onSubmitUsuario.emit(instanciaUsuarioCrear);
  }
  
  if(!this.passwordEquals){
    this.passwordEquals = false;
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Las contraseñas no coinciden'});
  }

  if(this.formUsuario.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }



}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

get username(){ return this.formUsuario.get('username');}
get email(){ return this.formUsuario.get('email');}
get password(){ return this.formUsuario.get('password');}
get password2(){ return this.formUsuario.get('password2');}
}