import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PublicacionesCompletoDTO } from 'src/app/admin/publicaciones/publicaciones';
import { PublicacionesService } from 'src/app/admin/servicios/publicaciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seccion-publicacion',
  templateUrl: './seccion-publicacion.component.html',
  styleUrls: ['./seccion-publicacion.component.scss']
})
export class SeccionPublicacionComponent implements OnInit {
    listarPublicaciones:PublicacionesCompletoDTO[] = [];
    responsiveOptions: any;
    URL_PDF=environment.apiURL;
    subGaleria!:Subscription;
    rutaPdf:string="";
    displayDialog!: boolean;
  constructor( private publicacionesService:PublicacionesService,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.configResponsivo();
    this.cargarPublicaciones();
  }
  cargarPublicaciones():void{
    this.subGaleria=this.publicacionesService.obtenerTodos().subscribe(publicaciones=>{
      this.listarPublicaciones=publicaciones.data;
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });
  }
  showDialog(publicaciones:PublicacionesCompletoDTO) {
    this.displayDialog=!this.displayDialog;
    this.rutaPdf = this.URL_PDF+publicaciones.archivo;
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
}
