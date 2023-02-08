import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GaleriaCompletoDTO } from '../galeria';
import { GaleriaService } from '../../servicios/galeria.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar-galeria',
  templateUrl: './listar-galeria.component.html',
  styleUrls: ['./listar-galeria.component.scss']
})
export class ListarGaleriaComponent implements OnInit {
    listarGaleria:GaleriaCompletoDTO[] = [];
    selectedCustomer:any;
    loading:boolean=false;
    subGaleria!:Subscription;
    URL_GALERIA=environment.apiURL;
  constructor(private galeriaService:GaleriaService,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarGaleria();
  }

  cargarGaleria():void{
    this.subGaleria=this.galeriaService.obtenerTodos().subscribe(galeria=>{
      this.loading=false;
      this.listarGaleria=galeria.data;
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });
  }
  btnEliminarGaleria(galeria:GaleriaCompletoDTO){
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: galeria.nombre,
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
         /*    this.subGaleria=this.gale.eliminarPorId(galeria.id).subscribe(response=>{
              console.log('response');
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Parroquia Eliminado con éxito'
              })
            },error=>{
              Swal.close();
              let message= error.error.message;
              this.messageService.add({severity:'error', summary: 'Error', detail: message});
            }) */
          }
        });
      }
    })
  }
}
