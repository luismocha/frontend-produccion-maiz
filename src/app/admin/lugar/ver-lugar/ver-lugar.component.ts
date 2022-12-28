import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { LugarService } from '../../servicios/lugar.service';
import { LugarDTO } from '../lugar.model';

@Component({
  providers: [MessageService],
  selector: 'app-ver-lugar',
  templateUrl: './ver-lugar.component.html',
  styleUrls: ['./ver-lugar.component.scss']
})
export class VerLugarComponent implements OnInit {
 //input
 @Input() modeloLugar!:LugarDTO;

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

constructor(private lugarService:LugarService,
public ref: DynamicDialogRef, 
public config: DynamicDialogConfig) { }

ngOnInit(): void {

this.obtenerLugarPorId();
}


obtenerLugarPorId(){

this.lugarService.obtenerLugarPorId(this.config.data.id).subscribe(response=>{
 //console.log(response);
 this.modeloLugar=response.data;
},error=>{
 console.log(error);
});
}
}
