import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ParroquiaService } from '../../servicios/parroquia.service';
import { ParroquiaDTO } from '../../parroquia/parroquia.model';
import { CantonService } from '../../servicios/canton.service';
import { combinarCantonParroquiaDTO } from '../parroquia.model';
import { CantonDTO } from '../../canton/canton.model';

@Component({
  providers: [MessageService],
  selector: 'app-ver-parroquia',
  templateUrl: './ver-parroquia.component.html',
  styleUrls: ['./ver-parroquia.component.scss']
})
export class VerParroquiaComponent implements OnInit {

  @Input() objCombinacion!: combinarCantonParroquiaDTO;
  
  modeloParroquia!:ParroquiaDTO;
  modeloCanton!:CantonDTO;


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


  constructor( private cantonService:CantonService,
    private parroquiaService:ParroquiaService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    console.log("modelo desde Ver Productor");
    
    this.obtenerParroquiaPorId();
    setTimeout(() => {
      
      this.objCombinacion = {
        id: this.modeloParroquia.id,
        nombre : this.modeloParroquia.nombre,
        canton : this.modeloCanton.nombre,
        activo : this.modeloParroquia.activo,
      }
    }, 1000);

  }


  obtenerParroquiaPorId(){
    this.parroquiaService.obtenerParroquiaPorId(this.config.data.id).subscribe(response=>{
      //console.log(response);
      this.modeloParroquia=response;
      this.obtenerCantonPorId()
    },error=>{
      console.log(error);
    });
  }

  obtenerCantonPorId(){
    this.cantonService.obtenerCantonPorId(this.modeloParroquia.fk_canton).subscribe(response=>{
      //console.log(response);
      this.modeloCanton=response;
    },error=>{
      console.log(error);
    });
  }

}
