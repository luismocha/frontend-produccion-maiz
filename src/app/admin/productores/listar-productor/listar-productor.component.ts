import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { LitarProductoresDTO, ProductorDTO } from '../productor.model';
import { ProductorService } from '../../servicios/productor.service';
import { CrearProductorComponent } from '../crear-productor/crear-productor.component';
import { EditarProductorComponent } from '../editar-productor/editar-productor.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-productor',
  templateUrl: './listar-productor.component.html',
  styleUrls: ['./listar-productor.component.scss']
})
export class ListarProductorComponent implements OnInit, OnDestroy {

  selectedCustomer!: ProductorDTO;
  listarProductores:LitarProductoresDTO[] = [
    {id: 1, nombre: "El men", apellido: "Apell 1", cedula: "0102546985", celular: "0859654121"},
    {id: 2, nombre: "Jose", apellido: "Apell B", cedula: "0524125425", celular: "0985632102"},
    {id: 3, nombre: "Maria", apellido: "Apell 3", cedula: "0654125522", celular: "0124528854"},
  ];
  //variables globales
  loading:boolean=false;

  //suscription
  ref!: DynamicDialogRef;
  subCargarProductores!:Subscription;
  subEliminarProductores!:Subscription;
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

  constructor(private productorService:ProductorService,
    public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarProductores();
    this.subRefresh = this.productorService.refresh$.subscribe(()=>{  
      this.cargarProductores();
    });
  }

  cargarProductores():void{
    this.subCargarProductores=this.productorService.obtenerTodos().subscribe(productores=>{
      console.log(productores);
      this.loading=false;
      this.listarProductores=productores.data;
    },error=>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
    });

  }
  btnAgregar(){
    this.ref=this.dialogService.open(CrearProductorComponent, {
      header: 'Agregar productor',
      width: '50%'
    });
  }
  btnEditarProductor(productor:ProductorDTO){
    this.ref=this.dialogService.open(EditarProductorComponent, {
      header: 'Editar productor',
      width: '50%',
      data:productor
    });
  }
  btnEliminarProductor(productor:ProductorDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: productor.nombre,
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
            this.subEliminarProductores=this.productorService.eliminarPorId(productor.id).subscribe(response=>{
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'productor Eliminado con éxito'
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
    if(this.subCargarProductores){
      this.subCargarProductores.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarProductores){
      this.subEliminarProductores.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }
}
