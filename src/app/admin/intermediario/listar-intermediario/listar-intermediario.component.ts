import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { IntermediarioDTO, LitarIntermediariosDTO } from '../intermediario.model';
import { IntermediarioService } from '../../servicios/intermediario.service';
import { CrearIntermediarioComponent } from '../crear-intermediario/crear-intermediario.component';
import { EditarIntermediarioComponent } from '../editar-intermediario/editar-intermediario.component';
import { VerIntermediarioComponent } from '../ver-intermediario/ver-intermediario.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-intermediario',
  templateUrl: './listar-intermediario.component.html',
  styleUrls: ['./listar-intermediario.component.scss']
})
export class ListarIntermediarioComponent implements OnInit, OnDestroy {

   //instancias
   selectedCustomer!: IntermediarioDTO;
   listarEmpresas:LitarIntermediariosDTO[] = [];
   //variables globales
   loading:boolean=false;
 
   //suscription
   ref!: DynamicDialogRef;
   subCargarEmpresas!:Subscription;
   subEliminarEmpresa!:Subscription;
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
 

  constructor(private empresaService:IntermediarioService,
              public dialogService: DialogService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarEmpresas();
    this.subRefresh = this.empresaService.refresh$.subscribe(()=>{  
      this.cargarEmpresas();
    });
  }

  btnVerIntermediario(productor:IntermediarioDTO){
    this.ref=this.dialogService.open(VerIntermediarioComponent, {
      header: 'Datos del Intermediario',
      width: '50%',
      data:productor
    });
  }

  cargarEmpresas():void{
    this.subCargarEmpresas=this.empresaService.obtenerTodos().subscribe(empresas=>{
      console.log(empresas.data);
      this.loading=false;
      this.listarEmpresas=empresas.data;
    },error=>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
    });

  }
  btnAgregar(){
    this.ref=this.dialogService.open(CrearIntermediarioComponent, {
      header: 'Agregar Intermediario',
      width: '50%'
    });
  }
  btnEditarEmpresa(empresa:IntermediarioDTO){
    this.ref=this.dialogService.open(EditarIntermediarioComponent, {
      header: 'Editar Intermediario',
      width: '50%',
      data:empresa
    });
  }
  btnEliminarEmpresa(empresa:IntermediarioDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: empresa.year_compra.toString(),
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
            this.subEliminarEmpresa=this.empresaService.eliminarPorId(empresa.id).subscribe(response=>{
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Intermediario Eliminado con éxito'
              })
            },error=>{
              Swal.close();
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el Intermediario'});
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
    if(this.subCargarEmpresas){
      this.subCargarEmpresas.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarEmpresa){
      this.subEliminarEmpresa.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }
}
