import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GaleriaCompletoDTO } from 'src/app/admin/galeria/galeria';
import { GaleriaService } from 'src/app/admin/servicios/galeria.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seccion-galeria',
  templateUrl: './seccion-galeria.component.html',
  styleUrls: ['./seccion-galeria.component.scss']
})
export class SeccionGaleriaComponent implements OnInit {
    subGaleria!:Subscription;
    listarGaleria:GaleriaCompletoDTO[] = [];
    responsiveOptions: any;
    URL_GALERIA=environment.apiURL;
  constructor(private galeriaService:GaleriaService,
    private messageService: MessageService) {

     }

  ngOnInit(): void {
    this.configResponsivo();
    this.cargarGaleria();
  }
  configResponsivo(){
    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }
  cargarGaleria():void{
    this.subGaleria=this.galeriaService.obtenerTodos().subscribe(galeria=>{
      this.listarGaleria=galeria.data;
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });
  }
}
