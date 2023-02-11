import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { GaleriaService } from '../../servicios/galeria.service';
import { GaleriaCompletoDTO } from '../galeria';

@Component({
  selector: 'app-editar-galeria',
  templateUrl: './editar-galeria.component.html',
  styleUrls: ['./editar-galeria.component.scss']
})
export class EditarGaleriaComponent implements OnInit {
    modeloGaleriaFull!:GaleriaCompletoDTO;
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
  constructor(private galeriaService:GaleriaService,
                private messageService: MessageService,
                private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerGaleriaPorId();
  }
  obtenerGaleriaPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.galeriaService.obtenerGaleriaPorId(Number(response.id)).subscribe(response=>{
          //console.log(response);
          if(response.success){
            this.modeloGaleriaFull=response.data;
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
  editarGaleria(instanciaGaleriaEditar:any){
    this.subs = this.galeriaService.editar(this.modeloGaleriaFull.id,instanciaGaleriaEditar).subscribe(
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
}
