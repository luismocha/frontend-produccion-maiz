import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CrearEmpresaDTO } from '../empresa.model';
import { EmpresaService } from '../../servicios/empresa.service';

@Component({
  providers: [MessageService],
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.scss']
})
export class CrearEmpresaComponent implements OnInit, OnDestroy {

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


  constructor(private messageService: MessageService,
    //public dialogService: FormularioRolComponent,
    public ref: DynamicDialogRef, private empresaService: EmpresaService) { }

  ngOnInit(): void {
  }
  crearEmpresa(instanciaEmpresaCrear:CrearEmpresaDTO){
    console.log(instanciaEmpresaCrear);
    this.subs = this.empresaService.crear(instanciaEmpresaCrear).subscribe( 
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Empresa registrado con éxito'
      })
      //this.ref.cerrarModal();
      this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al registrar el Empresa'});
        console.error(error)}
    );
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }
}
