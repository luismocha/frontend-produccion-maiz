import { Component, OnInit, OnDestroy } from '@angular/core';
import { LitarRolesDTO, RolDTO } from '../rol';
import { Subscription } from 'rxjs';
import { RolService } from '../../servicios/rol.service';
import { MessageService } from 'primeng/api';
import { CrearRolComponent } from '../crear-rol/crear-rol.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { EditarRolComponent } from '../editar-rol/editar-rol.component';
import Swal from 'sweetalert2';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.scss']
})
export class ListarRolesComponent implements OnInit,OnDestroy {
  //instancias
  selectedCustomer!: RolDTO;
  listarRoles!:LitarRolesDTO[];
  //variables globales
  loading:boolean=true;

  //suscription
  ref!: DynamicDialogRef;
  subCargarRoles!:Subscription;
  subEliminarRole!:Subscription;
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
  constructor(private rolService:RolService,
              public dialogService: DialogService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarRoles();
    this.subRefresh = this.rolService.refresh$.subscribe(()=>{  
      this.cargarRoles();
    });
  }

  cargarRoles():void{
    this.subCargarRoles=this.rolService.obtenerTodos().subscribe(roles=>{
      console.log(roles);
      this.loading=false;
      this.listarRoles=roles.data;
    },error=>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
    });

  }
  btnAgregar(){
    this.ref=this.dialogService.open(CrearRolComponent, {
      header: 'Agregar rol',
      width: '50%'
    });
  }
  btnEditarRol(rol:RolDTO){
    this.ref=this.dialogService.open(EditarRolComponent, {
      header: 'Editar rol',
      width: '50%',
      data:rol
    });
  }
  btnEliminarRol(rol:RolDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: rol.name,
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
            this.subEliminarRole=this.rolService.eliminarPorId(rol.id).subscribe(response=>{
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Producto Eliminado con exito'
              })
            },error=>{
              Swal.close();
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el rol'});
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
    if(this.subCargarRoles){
      this.subCargarRoles.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarRole){
      this.subEliminarRole.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }
}
