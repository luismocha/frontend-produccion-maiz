import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CantonDTO, CrearCantonDTO } from '../canton.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CantonService } from '../../servicios/canton.service';

@Component({
  providers: [MessageService],
  selector: 'app-editar-canton',
  templateUrl: './editar-canton.component.html',
  styleUrls: ['./editar-canton.component.scss']
})
export class EditarCantonComponent implements OnInit {

  //input
  @Input() modeloCanton!:CantonDTO;
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
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    console.log("modelo desde editar canton");
    console.log(this.config.data);
    console.log(this.ref);
    this.obtenerCantonPorId();
  }

  editarCanton(instanciaRolEditar:CrearCantonDTO){
    console.log(instanciaRolEditar);
    this.subs = this.cantonService.editar(this.config.data.id,instanciaRolEditar).subscribe( 
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Cantón actualizado con éxito'
      })
      this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar el Cantón'});
        console.error(error)}
    );
  }
  obtenerCantonPorId(){
    this.cantonService.obtenerCantonPorId(this.config.data.id).subscribe(response=>{
      this.modeloCanton=response;
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
