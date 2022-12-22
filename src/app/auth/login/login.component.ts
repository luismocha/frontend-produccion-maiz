import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/admin/servicios/usuario.service';
import { LoginUsuarioDTO } from 'src/app/admin/usuario/usuario.model';

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

     token = localStorage.getItem('token');

    constructor(private formBuilder: FormBuilder,private messageService: MessageService, private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.iniciarFormulario();
        
      }

    iniciarFormulario(){
        this.formUsuario = this.formBuilder.group({
            username: ['', [Validators.required]],
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
        let instanciaUsuarioCrear:LoginUsuarioDTO=this.formUsuario.value;
        this.usuarioService.login(instanciaUsuarioCrear).subscribe(token=>{
            console.log(token);
            window.location.href = '/#/admin';
          },error=>{
            console.log(error);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
          });
      
      }

}
