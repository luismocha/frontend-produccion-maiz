import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { GaleriaService } from '../../servicios/galeria.service';

@Component({
  selector: 'app-crear-galeria',
  templateUrl: './crear-galeria.component.html',
  styleUrls: ['./crear-galeria.component.scss']
})
export class CrearGaleriaComponent implements OnInit {
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
  constructor(private galeriaService:GaleriaService,
                private router:Router,
                private messageService: MessageService) { }

  ngOnInit(): void {
  }
  crearGaleria(galeria:FormData){
    this.subs = this.galeriaService.crear(galeria).subscribe(
    (response: any) => {
      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      this.router.navigate(['/admin/galeria']);
      //this.ref.cerrarModal();
      //this.ref.close();
      },
      (error: any) => {
        console.log(error);
        let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
        }
    );
  }
}
