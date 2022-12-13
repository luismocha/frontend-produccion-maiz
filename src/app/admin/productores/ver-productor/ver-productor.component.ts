import { Component, Input, OnInit } from '@angular/core';
import { ProductorService } from '../../servicios/productor.service';
import { combiarCantonParroquiaProductorDTO, ProductorDTO } from '../productor.model';
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


  @Input() objCombinacion!: combiarCantonParroquiaProductorDTO;

    //input
    @Input() modeloProductor!:ProductorDTO;
    //suscriptio

    modeloCanton!:CantonDTO;
    modeloParroquia!:ParroquiaDTO;
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



  constructor(private productorService:ProductorService,
    private cantonService:CantonService,
    private parroquiaService:ParroquiaService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) { 
     // console.log(this.modeloProductor)
    }

  ngOnInit(): void {
    console.log("modelo desde Ver Productor");
    
    this.obtenerProductorPorId();
    setTimeout(() => {
      
      this.objCombinacion = {
        id: this.modeloProductor.id,
        nombre : this.modeloProductor.nombre,
        apellido : this.modeloProductor.apellido,
        cedula : this.modeloProductor.cedula,
        celular : this.modeloProductor.celular,
        activo : this.modeloProductor.activo,
        canton : this.modeloCanton.nombre,
        parroquia : this.modeloParroquia.nombre,
      }
    }, 1000);

  }


  obtenerProductorPorId(){
    this.productorService.obtenerProductorPorId(this.config.data.id).subscribe(response=>{
      //console.log(response);
      this.modeloProductor=response;
      this.obtenerCantonPorId()
      this.obtenerParroquiaPorId()
    },error=>{
      console.log(error);
    });
  }

  obtenerCantonPorId(){
    this.cantonService.obtenerCantonPorId(this.modeloProductor.fk_canton).subscribe(response=>{
      //console.log(response);
      this.modeloCanton=response;
    },error=>{
      console.log(error);
    });
  }

  obtenerParroquiaPorId(){
    this.parroquiaService.obtenerParroquiaPorId(this.modeloProductor.fk_parroquia).subscribe(response=>{
      //console.log(response);
      this.modeloParroquia=response;
    },error=>{
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

}
