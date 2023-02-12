import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PublicacionesService } from '../../servicios/publicaciones.service';

@Component({
  selector: 'app-crear-publicaciones',
  templateUrl: './crear-publicaciones.component.html',
  styleUrls: ['./crear-publicaciones.component.scss']
})
export class CrearPublicacionesComponent implements OnInit {
    subs!:Subscription;
 //toas
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
  constructor(
                private messageService: MessageService,
              private publicacionesService:PublicacionesService) { }

  ngOnInit(): void {
  }
  crearPublicacion(publicacion:FormData){
    this.subs = this.publicacionesService.crear(publicacion).subscribe(
    (response: any) => {
      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      },
      (error: any) => {
        console.log(error);
        let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
        }
    );
  }
}
