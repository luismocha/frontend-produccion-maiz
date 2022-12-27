import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmpresaService } from '../../servicios/empresa.service';
import { CrearIntermediarioDTO, IntermediarioDTO } from '../intermediario.model';

@Component({
  providers: [MessageService],
  selector: 'app-editar-empresa',
  templateUrl: './editar-intermediario.component.html',
  styleUrls: ['./editar-intermediario.component.scss']
})
export class EditarIntermediarioComponent implements OnInit {

  //input
  @Input() modeloEmpresa!:IntermediarioDTO;
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

  constructor(private cantonService:EmpresaService,
    //public dialogService: FormularioRolComponent,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("modelo desde editar empresa");
    console.log(this.config.data);
    console.log(this.ref);
    this.obtenerEmpresaPorId();
  }

  editarEmpresa(instanciaEmpresaEditar:CrearIntermediarioDTO){
    console.log(instanciaEmpresaEditar);
    this.subs = this.cantonService.editar(this.config.data.id,instanciaEmpresaEditar).subscribe( 
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Empresa actualizada con éxito'
      })
      this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar la Empresa'});
        console.error(error)}
    );
  }

  obtenerEmpresaPorId(){
    this.cantonService.obtenerEmpresaPorId(this.config.data.id).subscribe(response=>{
      console.log(response);
      this.modeloEmpresa=response.data;
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
