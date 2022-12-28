import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearLugarDTO, LugarDTO } from '../lugar.model';
import { LugarService } from '../../servicios/lugar.service';

@Component({
  providers: [MessageService],
  selector: 'app-editar-lugar',
  templateUrl: './editar-lugar.component.html',
  styleUrls: ['./editar-lugar.component.scss']
})
export class EditarLugarComponent implements OnInit {
//input
@Input() modeloLugar!:LugarDTO;
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

constructor(private lugarService:LugarService,
  //public dialogService: FormularioRolComponent,
  public ref: DynamicDialogRef, 
  public config: DynamicDialogConfig,
  private messageService: MessageService,) { }

ngOnInit(): void {
  console.log("modelo desde editar Lugar");
  console.log(this.config.data);
  console.log(this.ref);
  this.obtenerLugarPorId();
}

editarLugar(instanciaLugarEditar:CrearLugarDTO){
  console.log(instanciaLugarEditar);
  this.subs = this.lugarService.editar(this.config.data.id,instanciaLugarEditar).subscribe( 
  (response: any) => {
    console.log(response);
    this.Toast.fire({
      icon: 'success',
      title: response.message
    })
    this.ref.close();
    },
    (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar el Lugar'});
      console.error(error)}
  );
}
obtenerLugarPorId(){
  this.lugarService.obtenerLugarPorId(this.config.data.id).subscribe(response=>{
    this.modeloLugar=response.data;
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
