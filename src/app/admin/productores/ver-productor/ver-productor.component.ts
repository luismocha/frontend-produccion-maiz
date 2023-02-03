import { Component, Input, OnInit } from '@angular/core';
import { ProductorService } from '../../servicios/productor.service';
import { combiarCantonParroquiaProductorDTO, ObtenerUnProductorDTO, ProductorDTO } from '../productor.model';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { CantonService } from '../../servicios/canton.service';
import { CantonDTO } from '../../canton/canton.model';
import { ParroquiaService } from '../../servicios/parroquia.service';
import { ParroquiaDTO } from '../../parroquia/parroquia.model';


@Component({
  providers: [MessageService],
  selector: 'app-ver-productor',
  templateUrl: './ver-productor.component.html',
  styleUrls: ['./ver-productor.component.scss']
})
export class VerProductorComponent implements OnInit {


  //@Input() objCombinacion!: combiarCantonParroquiaProductorDTO;

    //input
    modeloProductor!:ObtenerUnProductorDTO;
    //suscriptio

    modeloCanton!:CantonDTO;
    modeloParroquia!:ParroquiaDTO;
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
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
     // console.log(this.modeloProductor)
    }

  ngOnInit(): void {
    console.log("modelo desde Ver Productor");
    this.obtenerProductorPorId();

  }
  obtenerProductorPorId(){
    this.productorService.obtenerProductorPorId(this.config.data.id).subscribe(response=>{
      //console.log(response);
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
  }
}
