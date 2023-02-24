import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/admin/servicios/usuario.service';
import { CrearUsuarioDTO, LoginUsuarioDTO, RecuperarPasswordDTO } from 'src/app/admin/usuario/usuario.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
    providers: [MessageService],
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]


})
export class LoginComponent {
    formUsuario!:FormGroup;
    submited: any = false;
    password!: string;
    private apiURL=environment.apiURL+'/auth';
    Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })


     token = localStorage.getItem('token');

    constructor(
                private router: Router,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
                private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.iniciarFormulario();

      }

    iniciarFormulario(){
        this.formUsuario = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
        });
      }
    login():void{
        this.submited = true;
        if(this.formUsuario.invalid){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
            return;
        }
        Swal.fire({
            title: 'Cargando...',
            html: 'Espere porfavor...'
        })
        Swal.showLoading()
        //todo ok
        //console.log(this.formUsuario.value)
        let instanciaUsuarioCrear:LoginUsuarioDTO=this.formUsuario.value;
        this.usuarioService.login(instanciaUsuarioCrear).subscribe(token=>{

            this.Toast.fire({
        icon: 'success',
        title: token.response
        })
        this.router.navigate(['admin'])
        },error=>{
            console.log(error);
            Swal.close();
            this.messageService.add({severity:'error', summary: 'Error', detail: error});
        });

    }
    btnRecuperarPassword(){
        Swal.fire({
            title: 'Ingrese su correo electrónico',
            input: 'email',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                let recuperarPassword:RecuperarPasswordDTO={
                    email:login,
                }
                //Swal.isLoading();
                Swal.showValidationMessage('Cargando...')
                this.usuarioService.recuperarPassword(recuperarPassword).subscribe(response=>{
                    console.log(response);
                    this.Toast.fire({
                        icon: 'success',
                        title: response.message
                    })
                    //Swal.update(response.message)
                    //Swal.showValidationMessage(response.message)
                },error=>{
                    console.log(error);
                    //Swal.update(error.error?.message)
                    //Swal.showValidationMessage(error.error?.message)
                    this.messageService.add({severity:'error', summary: 'Error', detail: error.error?.message});
                });
                //recuperarPassword
   /*            return fetch(`${this.apiURL}/password-recover/`,login)
                .then(response => {
                   
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json()
                })
                .catch(error => {
                 
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                }) */
            },
            //allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              /* Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
              }) */
            }
        })
    }
}
