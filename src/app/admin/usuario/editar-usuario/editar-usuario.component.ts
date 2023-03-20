import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioService } from '../../servicios/usuario.service';
import { CrearUsuarioDTO, UsuarioDTO, obtenerUsuarioDTO } from '../usuario.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {



  modeloUsuario!:obtenerUsuarioDTO;
  //suscriptio
  subs!:Subscription;
  //toast
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


  constructor(private usuarioService:UsuarioService,
    //public dialogService: FormularioRolComponent,
    //public ref: DynamicDialogRef,
    //public config: DynamicDialogConfig,
    private activatedRoute:ActivatedRoute,
    private messageService: MessageService,) { }

  ngOnInit(): void {

    this.obtenerUsuarioPorId();
  }
  editarUsuario(instanciaUsuarioEditar:CrearUsuarioDTO){

    this.subs = this.usuarioService.editar(this.modeloUsuario.id,instanciaUsuarioEditar).subscribe(
    (response: any) => {

      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      //this.ref.close();
      },
      (error) => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: error.error?.message});
        console.error(error)}
    );
  }
  obtenerUsuarioPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.usuarioService.obtenerUsuarioPorId(Number(response.id)).subscribe(response=>{
          this.modeloUsuario=response.data;
        },error=>{
          console.log(error);
        });
    })
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

}
