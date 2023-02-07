import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioDTO, IntermediarioDTO } from '../intermediario.model';
import { IntermediarioService } from '../../servicios/intermediario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  selector: 'app-editar-intermediario',
  templateUrl: './editar-intermediario.component.html',
  styleUrls: ['./editar-intermediario.component.scss']
})
export class EditarIntermediarioComponent implements OnInit {
//input
modeloIntermediario!:IntermediarioDTO;
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

constructor(private intermediarioService:IntermediarioService,
  //public dialogService: FormularioRolComponent,
  //public ref: DynamicDialogRef,
  //public config: DynamicDialogConfig,
  private activatedRoute:ActivatedRoute,
  private messageService: MessageService,) { }

ngOnInit(): void {
  this.obtenerIntermediarioPorId();
}

editarIntermediario(instanciaIntermediarioEditar:CrearIntermediarioDTO){
  this.subs = this.intermediarioService.editar(this.modeloIntermediario.id,instanciaIntermediarioEditar).subscribe(
  (response: any) => {
    this.Toast.fire({
      icon: 'success',
      title: response.message
    })
    //this.ref.close();
    },
    (error) => {
      let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
      }
  );
}
obtenerIntermediarioPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.intermediarioService.obtenerIntermediarioPorId(Number(response.id)).subscribe(response=>{
            if(response.success){
              this.modeloIntermediario=response.data;
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
