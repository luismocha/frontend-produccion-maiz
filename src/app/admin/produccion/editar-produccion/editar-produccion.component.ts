import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProduccionDTO, ProduccionDTO } from '../produccion.model';
import { ProduccionService } from '../../servicios/produccion.service';


@Component({
  providers: [MessageService],
  selector: 'app-editar-produccion',
  templateUrl: './editar-produccion.component.html',
  styleUrls: ['./editar-produccion.component.scss']
})
export class EditarProduccionComponent implements OnInit {

  
  //input
  @Input() modeloProduccion!:ProduccionDTO;
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
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    console.log("modelo desde editar producción");
    console.log(this.config.data);
    console.log(this.ref);
    this.obtenerProduccionPorId();
  }

  editarProduccion(instanciaProduccionEditar:CrearProduccionDTO){
    console.log(instanciaProduccionEditar);
    this.subs = this.produccionService.editar(this.config.data.id,instanciaProduccionEditar).subscribe( 
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Producción actualizada con éxito'
      })
      this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar el Producción'});
        console.error(error)}
    );
  }
  obtenerProduccionPorId(){
    this.produccionService.obtenerProduccionPorId(this.config.data.id).subscribe(response=>{
      this.modeloProduccion=response.data;
    },error=>{
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

}
