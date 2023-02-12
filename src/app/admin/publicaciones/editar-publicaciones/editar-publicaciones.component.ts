import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PublicacionesService } from '../../servicios/publicaciones.service';
import { PublicacionesCompletoDTO } from '../publicaciones';

@Component({
  selector: 'app-editar-publicaciones',
  templateUrl: './editar-publicaciones.component.html',
  styleUrls: ['./editar-publicaciones.component.scss']
})
export class EditarPublicacionesComponent implements OnInit {
    modeloPublicacionFull!:PublicacionesCompletoDTO;
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
    //suscriptio
  subs!:Subscription;
  constructor(private activatedRoute:ActivatedRoute,
                 private messageService: MessageService,
                private publicacionesService:PublicacionesService) { }

  ngOnInit(): void {
    this.obtenerPublicacionPorId();
  }
  editarPublicacion(instanciaPublicacionEditar:any){
    this.subs = this.publicacionesService.editar(this.modeloPublicacionFull.id,instanciaPublicacionEditar).subscribe(
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
  obtenerPublicacionPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.publicacionesService.obtenerGaleriaPorId(Number(response.id)).subscribe(response=>{
          //console.log(response);
          if(response.success){
            this.modeloPublicacionFull=response.data;
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
        });
    })
  }
}
