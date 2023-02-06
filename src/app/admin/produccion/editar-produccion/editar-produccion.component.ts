import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProduccionDTO, EditProduccionDTO, ProduccionDTO } from '../produccion.model';
import { ProduccionService } from '../../servicios/produccion.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  providers: [MessageService],
  selector: 'app-editar-produccion',
  templateUrl: './editar-produccion.component.html',
  styleUrls: ['./editar-produccion.component.scss']
})
export class EditarProduccionComponent implements OnInit {


  //input
  modeloProduccion!:ProduccionDTO;
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

  constructor(private produccionService:ProduccionService,
    //public dialogService: FormularioRolComponent,
    //public ref: DynamicDialogRef,
    //public config: DynamicDialogConfig,
    private activatedRoute:ActivatedRoute,
    private messageService: MessageService,) { }

  ngOnInit(): void {

    this.obtenerProduccionPorId();
  }

  editarProduccion(instanciaProduccionEditar:CrearProduccionDTO){

    this.subs = this.produccionService.editar(this.modeloProduccion.id,instanciaProduccionEditar).subscribe(
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
  obtenerProduccionPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.produccionService.obtenerProduccionPorId(Number(response.id)).subscribe(response=>{
          this.modeloProduccion=response.data;
        },error=>{
          console.log(error);
          let message= error.error.message;
          this.messageService.add({severity:'error', summary: 'Error', detail: message});
        });
    });
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

}
