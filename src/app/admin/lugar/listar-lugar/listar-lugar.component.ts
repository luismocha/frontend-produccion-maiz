import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { LitarLugaresDTO, LugarDTO } from '../lugar.model';
import { LugarService } from '../../servicios/lugar.service';
import { CrearLugarComponent } from '../crear-lugar/crear-lugar.component';
import { EditarLugarComponent } from '../editar-lugar/editar-lugar.component';
import { VerLugarComponent } from '../ver-lugar/ver-lugar.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-lugar',
  templateUrl: './listar-lugar.component.html',
  styleUrls: ['./listar-lugar.component.scss']
})
export class ListarLugarComponent implements OnInit, OnDestroy {

    //instancias
    selectedCustomer!: LugarDTO;
    listarLugares:LitarLugaresDTO[] = [];
    //variables globales
    loading:boolean=false;
  
    //suscription
    ref!: DynamicDialogRef;
    subCargarLugares!:Subscription;
    subEliminarLugar!:Subscription;
    subRefresh!:Subscription;
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
  
    constructor(private cantonService:LugarService,
                public dialogService: DialogService,
                private messageService: MessageService) { }
  
    ngOnInit(): void {
      this.cargarLugares();
      this.subRefresh = this.cantonService.refresh$.subscribe(()=>{  
        this.cargarLugares();
      });
    }
  
    cargarLugares():void{
      this.subCargarLugares=this.cantonService.obtenerTodos().subscribe(cantones=>{
        console.log(cantones);
        this.loading=false;
        this.listarLugares=cantones.data;
      },error=>{
        let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
      });
  
    }
    btnAgregar(){
      this.ref=this.dialogService.open(CrearLugarComponent, {
        header: 'Agregar cantón',
        width: '50%'
      });
    }
    btnEditarLugar(canton:LugarDTO){
      this.ref=this.dialogService.open(EditarLugarComponent, {
        header: 'Editar cantón',
        width: '50%',
        data:canton
      });
    }
  
    btnVerLugar(productor:LugarDTO){
      this.ref=this.dialogService.open(VerLugarComponent, {
        header: 'Datos del cantón',
        width: '50%',
        data:productor
      });
    }
  
    btnEliminarLugar(canton:LugarDTO){
      
      Swal.fire({
        title: '¿ Esta seguro en eliminar ?',
        text: canton.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        //Swal.showLoading();
        if(result.isConfirmed){
          Swal.fire({
            title: 'Eliminando...',
            html: 'Espere porfavor...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading(undefined)
              this.subEliminarLugar=this.cantonService.eliminarPorId(canton.id).subscribe(response=>{
                console.log(response);
                this.Toast.fire({
                  icon: 'success',
                  title: 'Cantón Eliminado con éxito'
                })
              },error=>{
                Swal.close();
                let message= error.error.message;
                this.messageService.add({severity:'error', summary: 'Error', detail: message});
              })
            }
          });
        }
      })
    }
    cerrarModal(){
      this.ref.close();
    }
    ngOnDestroy(): void {
      if(this.subCargarLugares){
        this.subCargarLugares.unsubscribe();
      }
      if(this.subRefresh){
        this.subRefresh.unsubscribe();
      }
      if(this.subEliminarLugar){
        this.subEliminarLugar.unsubscribe();
      }
      if (this.ref) {
        this.ref.close();
      }
    }

}
