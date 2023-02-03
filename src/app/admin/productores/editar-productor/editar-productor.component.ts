import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProductorDTO, EditProductorDTO, ObtenerUnProductorDTO, ProductorDTO } from '../productor.model';
import { ProductorService } from '../../servicios/productor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  selector: 'app-editar-productor',
  templateUrl: './editar-productor.component.html',
  styleUrls: ['./editar-productor.component.scss']
})
export class EditarProductorComponent implements OnInit {


  modeloProductor!:ObtenerUnProductorDTO;
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

  constructor(private productorService:ProductorService,
    //public dialogService: FormularioRolComponent,
    private messageService: MessageService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.obtenerProductorPorId();
  }
  editarProductor(instanciaPproductorEditar:CrearProductorDTO){

    this.subs = this.productorService.editar(this.modeloProductor.id,instanciaPproductorEditar).subscribe(
    (response: any) => {

      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      },
      (error) => {
        let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
      }
    );
  }

  obtenerProductorPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.productorService.obtenerProductorPorId(Number(response.id)).subscribe(response=>{
          //console.log(response.data)
          if(response.success){
                this.modeloProductor=response.data;
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
