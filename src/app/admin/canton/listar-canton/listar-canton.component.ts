import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { CantonDTO, LitarCantonesDTO } from '../canton.model';
import { CantonService } from '../../servicios/canton.service';
import { CrearCantonComponent } from '../crear-canton/crear-canton.component';
import { EditarCantonComponent } from '../editar-canton/editar-canton.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-canton',
  templateUrl: './listar-canton.component.html',
  styleUrls: ['./listar-canton.component.scss']
})
export class ListarCantonComponent implements OnInit, OnDestroy {

    //instancias
  selectedCustomer!: CantonDTO;
  listarCantones!:LitarCantonesDTO[];
  //variables globales
  loading:boolean=false;

  //suscription
  ref!: DynamicDialogRef;
  subCargarCantones!:Subscription;
  subEliminarCanton!:Subscription;
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

  constructor(private cantonService:CantonService,
              public dialogService: DialogService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarCantones();
    this.subRefresh = this.cantonService.refresh$.subscribe(()=>{  
      this.cargarCantones();
    });
  }

  cargarCantones():void{
    this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
      console.log(cantones);
      this.loading=false;
      this.listarCantones=cantones.data;
    },error=>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
    });

  }
  btnAgregar(){
    this.ref=this.dialogService.open(CrearCantonComponent, {
      header: 'Agregar cantón',
      width: '50%'
    });
  }
  btnEditarCanton(canton:CantonDTO){
    this.ref=this.dialogService.open(EditarCantonComponent, {
      header: 'Editar cantón',
      width: '50%',
      data:canton
    });
  }
  btnEliminarCanton(canton:CantonDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: canton.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      //Swal.showLoading();
      if(result.isConfirmed){
        Swal.fire({
          title: 'Eliminando...',
          html: 'Espere porfavor...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading(null)
            this.subEliminarCanton=this.cantonService.eliminarPorId(canton.id).subscribe(response=>{
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Cantón Eliminado con éxito'
              })
            },error=>{
              Swal.close();
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el cantón'});
              console.log(error);
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
    if(this.subCargarCantones){
      this.subCargarCantones.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarCanton){
      this.subEliminarCanton.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }
}
