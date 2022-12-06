import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProductorDTO, ProductorDTO } from '../productor.model';
import { ProductorService } from '../../servicios/productor.service';

@Component({
  providers: [MessageService],
  selector: 'app-editar-productor',
  templateUrl: './editar-productor.component.html',
  styleUrls: ['./editar-productor.component.scss']
})
export class EditarProductorComponent implements OnInit {

  
  //input
  @Input() modeloProductor!:ProductorDTO;
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

  constructor(private parroquiaService:ProductorService,
    //public dialogService: FormularioRolComponent,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("modelo desde editar parroquia");
    console.log(this.config.data);
    console.log(this.ref);
    this.obtenerProductorPorId();
  }
  editarParroquia(instanciaParroquiaEditar:CrearProductorDTO){
    console.log(instanciaParroquiaEditar);
    this.subs = this.parroquiaService.editar(this.config.data.id,instanciaParroquiaEditar).subscribe( 
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Parroquia actualizada con éxito'
      })
      this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar la Parroquia'});
        console.error(error)}
    );
  }

  obtenerProductorPorId(){
    this.parroquiaService.obtenerProductorPorId(this.config.data.id).subscribe(response=>{
      console.log(response);
      this.modeloProductor=response.data;
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
