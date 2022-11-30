import { Component, Inject, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { RolService } from '../../servicios/rol.service';
import { CrearRolDTO, RolDTO } from '../rol';

@Component({
  providers: [MessageService],
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.scss']
})
export class EditarRolComponent implements OnInit {
  //input
  @Input() modeloRol!:RolDTO;
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
  constructor(private rolService:RolService,
            //public dialogService: FormularioRolComponent,
            public ref: DynamicDialogRef, 
            public config: DynamicDialogConfig,
            private messageService: MessageService,) { }

  ngOnInit(): void {
    console.log("modelo desde editar cliente");
    console.log(this.config.data);
    console.log(this.ref);
    this.obtenerRolPorId();
  }
  editarRol(instanciaRolEditar:CrearRolDTO){
    console.log(instanciaRolEditar);
    this.subs = this.rolService.editar(this.config.data.id,instanciaRolEditar).subscribe( 
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Rol actualizado con exito'
      })
      this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar el rol'});
        console.error(error)}
    );
  }
  obtenerRolPorId(){
    this.rolService.obtenerRolPorId(this.config.data.id).subscribe(response=>{
      console.log(response);
      this.modeloRol=response.data;
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
