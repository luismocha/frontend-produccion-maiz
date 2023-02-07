import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CostoProduccionDTO, CrearCostoProduccionDTO } from '../costo.produccion.model';
import { CostoProduccionService } from '../../servicios/costo-produccion.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  providers: [MessageService],
  selector: 'app-editar-costo-prod',
  templateUrl: './editar-costo-prod.component.html',
  styleUrls: ['./editar-costo-prod.component.scss']
})
export class EditarCostoProdComponent implements OnInit {

   //input
   modeloCostoProduccion!:CostoProduccionDTO;
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

   constructor(private costoProduccionService:CostoProduccionService,
     //public dialogService: FormularioRolComponent,
     //public ref: DynamicDialogRef,
     //public config: DynamicDialogConfig,
     private activatedRoute:ActivatedRoute,
     private messageService: MessageService,) { }

   ngOnInit(): void {

     this.obtenerCostoProduccionPorId();
   }

   editarCostoProduccion(instanciaCantonEditar:CrearCostoProduccionDTO){
     this.subs = this.costoProduccionService.editar(this.modeloCostoProduccion.id,instanciaCantonEditar).subscribe(
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
   obtenerCostoProduccionPorId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.costoProduccionService.obtenerCostoProduccionPorId(Number(response.id)).subscribe(response=>{
          this.modeloCostoProduccion=response.data;
        },error=>{
          console.log(error);
        });
    })
   }

   ngOnDestroy(): void {
     if(this.subs){
       this.subs.unsubscribe();
     }
   }

}
