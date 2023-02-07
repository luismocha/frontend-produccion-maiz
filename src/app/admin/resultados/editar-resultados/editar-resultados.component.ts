import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearResultadoDTO, ResultadoDTO } from '../resultados.model';
import { ResultadosService } from '../../servicios/resultados.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  selector: 'app-editar-resultados',
  templateUrl: './editar-resultados.component.html',
  styleUrls: ['./editar-resultados.component.scss']
})
export class EditarResultadosComponent implements OnInit {

  //input
  modeloResultado!:ResultadoDTO;
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

  constructor(private resultadoService:ResultadosService,
    //public dialogService: FormularioRolComponent,
    //public ref: DynamicDialogRef,
    //public config: DynamicDialogConfig,
    private activatedRoute:ActivatedRoute,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.obtenerResultadoPorId();
  }

  editarResultado(instanciaResultadoEditar:CrearResultadoDTO){
    this.subs = this.resultadoService.editar(this.modeloResultado.id,instanciaResultadoEditar).subscribe(
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
  obtenerResultadoPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.resultadoService.obtenerResultadoPorId(Number(response.id)).subscribe(response=>{
            if(response.success){
              this.modeloResultado=response.data;
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
