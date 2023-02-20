import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioProduccionDTO, IntermediarioProduccionDTO } from '../intermediario-produccion.model';
import { IntermediarioProduccionService } from '../../servicios/intermediario-produccion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  selector: 'app-editar-intermediario-produccion',
  templateUrl: './editar-intermediario-produccion.component.html',
  styleUrls: ['./editar-intermediario-produccion.component.scss']
})
export class EditarIntermediarioProduccionComponent implements OnInit {

  //input
  modeloIntermediario!:IntermediarioProduccionDTO;
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

  constructor(private cantonService:IntermediarioProduccionService,
    //public dialogService: FormularioRolComponent,
    //public ref: DynamicDialogRef,
    private activatedRoute:ActivatedRoute,
    //public config: DynamicDialogConfig,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerEmpresaPorId();
  }

  editarEmpresa(instanciaEmpresaEditar:CrearIntermediarioProduccionDTO){
    this.subs = this.cantonService.editar(this.modeloIntermediario.id,instanciaEmpresaEditar).subscribe(
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Intermediario actualizado con éxito'
      })
      //this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar la Empresa'});
        console.error(error)}
    );
  }

  obtenerEmpresaPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.cantonService.obtenerIntermediarioProduccionPorId(Number(response.id)).subscribe(response=>{
          this.modeloIntermediario=response.data;
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
