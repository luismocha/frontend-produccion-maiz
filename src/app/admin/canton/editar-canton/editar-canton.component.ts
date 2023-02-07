import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CantonService } from '../../servicios/canton.service';
import { CantonDTO, CrearCantonDTO } from '../canton.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  selector: 'app-editar-canton',
  templateUrl: './editar-canton.component.html',
  styleUrls: ['./editar-canton.component.scss']
})
export class EditarCantonComponent implements OnInit {

  //input
  modeloCanton!:CantonDTO;
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

  constructor(private cantonService:CantonService,
    //public dialogService: FormularioRolComponent,
    private messageService: MessageService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.obtenerCantonPorId();
  }

  editarCanton(instanciaCantonEditar:CrearCantonDTO){
    this.subs = this.cantonService.editar(this.modeloCanton.id,instanciaCantonEditar).subscribe(
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
  obtenerCantonPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.cantonService.obtenerCantonPorId(Number(response.id)).subscribe(response=>{
            if(response.success){
              this.modeloCanton=response.data;
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
    })
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

}
