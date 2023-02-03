import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearParroquiaDTO, EditParroquiaDTO, ObtenerUnaParroquiaDTO, ParroquiaDTO } from '../parroquia.model';
import { ParroquiaService } from '../../servicios/parroquia.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  selector: 'app-editar-parroquia',
  templateUrl: './editar-parroquia.component.html',
  styleUrls: ['./editar-parroquia.component.scss']
})
export class EditarParroquiaComponent implements OnInit {

  //input
  modeloParroquia!:ObtenerUnaParroquiaDTO;
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

  constructor(private parroquiaService:ParroquiaService,
    //public dialogService: FormularioRolComponent,
    private messageService: MessageService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    //console.log(this.config.data);
    //console.log(this.ref);
    this.obtenerParroquiaPorId();
  }

  editarParroquia(instanciaParroquiaEditar:CrearParroquiaDTO){

    this.subs = this.parroquiaService.editar(this.modeloParroquia.id,instanciaParroquiaEditar).subscribe(
    (response: any) => {
      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      },
      (error) => {
        let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
      }
    );
  }

  obtenerParroquiaPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.parroquiaService.obtenerParroquiaPorId(Number(response.id)).subscribe(response=>{

            if(response.success){
                this.modeloParroquia=response.data;
                return;
            }
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Información',
                footer: response.message
            })
        },error=>{
          console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error',
                footer: error.message
            })
        });
    });
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

}
