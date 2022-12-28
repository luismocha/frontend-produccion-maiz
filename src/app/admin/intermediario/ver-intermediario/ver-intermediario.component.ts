import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { IntermediarioDTO } from '../intermediario.model';
import { IntermediarioService } from '../../servicios/intermediario.service';

@Component({
  providers: [MessageService],
  selector: 'app-ver-intermediario',
  templateUrl: './ver-intermediario.component.html',
  styleUrls: ['./ver-intermediario.component.scss']
})
export class VerIntermediarioComponent implements OnInit {

 //input
 @Input() modeloIntermediario!:IntermediarioDTO;

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

constructor(private cantonService:IntermediarioService,
public ref: DynamicDialogRef, 
public config: DynamicDialogConfig) { }

ngOnInit(): void {

this.obtenerCantonPorId();
}


obtenerCantonPorId(){

this.cantonService.obtenerIntermediarioPorId(this.config.data.id).subscribe(response=>{
 //console.log(response);
 this.modeloIntermediario=response.data;
},error=>{
 console.log(error);
});
}

}
