import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PublicacionesService } from '../../servicios/publicaciones.service';
import { PublicacionesCompletoDTO } from '../publicaciones';
@Component({
  selector: 'app-listar-publicaciones',
  templateUrl: './listar-publicaciones.component.html',
  styleUrls: ['./listar-publicaciones.component.scss']
})
export class ListarPublicacionesComponent implements OnInit {
    listarPublicaciones:PublicacionesCompletoDTO[] = [];
    instanciaPublicaciones!:PublicacionesCompletoDTO;
    selectedCustomer:any;
    loading:boolean=false;
    subGaleria!:Subscription;
    URL_GALERIA=environment.apiURL;
    displayDialog!: boolean;
    rutaPdf:string="";
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
  constructor(private formBuilder: FormBuilder,
            private publicacionesService:PublicacionesService,
            private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarPublicaciones();
  }
  btnEliminarPublicacion(publicaciones:PublicacionesCompletoDTO){
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: publicaciones.nombre,
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
            this.subGaleria=this.publicacionesService.eliminarPorId(publicaciones.id).subscribe(response=>{
              console.log('response');
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Eliminado con éxito'
              })
              this.subGaleria.unsubscribe();
              this.cargarPublicaciones();
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
  showDialog(publicaciones:PublicacionesCompletoDTO) {
    this.instanciaPublicaciones=publicaciones;
    this.displayDialog=!this.displayDialog;
    this.rutaPdf = this.URL_GALERIA+publicaciones.archivo;

  }
  cargarPublicaciones():void{
    this.subGaleria=this.publicacionesService.obtenerTodos().subscribe(publicaciones=>{
      this.loading=false;
      this.listarPublicaciones=publicaciones.data;
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });
  }
}
