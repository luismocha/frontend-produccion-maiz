import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CrearRolDTO } from '../rol';
import { Subscription } from 'rxjs';
import { RolService } from '../../servicios/rol.service';
import { FormularioRolComponent } from '../formulario-rol/formulario-rol.component';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  providers: [MessageService],
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.scss']
})
export class CrearRolComponent implements OnInit,OnDestroy {
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
  constructor(
              private messageService: MessageService,
              //public dialogService: FormularioRolComponent,
              public ref: DynamicDialogRef, 
              private rolService:RolService) { }

  ngOnInit(): void {

  }
 
  crearRol(instanciaRolCrear:CrearRolDTO){
    console.log(instanciaRolCrear);
    this.subs = this.rolService.crear(instanciaRolCrear).subscribe( 
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Rol registrado con exito'
      })
      //this.ref.cerrarModal();
      this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al registrar el rol'});
        console.error(error)}
    );
  }
  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }
}
