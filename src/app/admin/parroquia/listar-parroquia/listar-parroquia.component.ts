import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { LitarParroquiasDTO, ParroquiaDTO } from '../parroquia.model';
import { ParroquiaService } from '../../servicios/parroquia.service';
import { CrearParroquiaComponent } from '../crear-parroquia/crear-parroquia.component';
import { EditarParroquiaComponent } from '../editar-parroquia/editar-parroquia.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-parroquia',
  templateUrl: './listar-parroquia.component.html',
  styleUrls: ['./listar-parroquia.component.scss']
})
export class ListarParroquiaComponent implements OnInit, OnDestroy {

  selectedCustomer!: ParroquiaDTO;
  listarParroquias:LitarParroquiasDTO[] = [];
  //variables globales
  loading:boolean=false;

  //suscription
  ref!: DynamicDialogRef;
  subCargarParroquias!:Subscription;
  subEliminarParroquias!:Subscription;
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



  constructor(private parroquiaService:ParroquiaService,
    public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarParroquias();
    this.subRefresh = this.parroquiaService.refresh$.subscribe(()=>{  
      this.cargarParroquias();
    });
  }

  cargarParroquias():void{
    this.subCargarParroquias=this.parroquiaService.obtenerTodos().subscribe(parroquias=>{
      this.loading=false;
      this.listarParroquias=parroquias;
    },error=>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
    });
  }
  
  btnAgregar(){
    this.ref=this.dialogService.open(CrearParroquiaComponent, {
      header: 'Agregar parroquia',
      width: '50%'
    });
  }
  btnEditarParroquia(parroquia:ParroquiaDTO){
    this.ref=this.dialogService.open(EditarParroquiaComponent, {
      header: 'Editar parroquia',
      width: '50%',
      data:parroquia
    });
  }
  btnEliminarParroquia(parroquia:ParroquiaDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: parroquia.nombre,
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
            Swal.showLoading(null)
            this.subEliminarParroquias=this.parroquiaService.eliminarPorId(parroquia.id).subscribe(response=>{
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Parroquia Eliminado con éxito'
              })
            },error=>{
              Swal.close();
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar la parroquia'});
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
    if(this.subCargarParroquias){
      this.subCargarParroquias.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarParroquias){
      this.subEliminarParroquias.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }
}
