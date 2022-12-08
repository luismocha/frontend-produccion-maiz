import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
import { LitarCantonesDTO, obtenerCantonDTO } from 'src/app/admin/canton/canton.model';
import { CantonService } from 'src/app/admin/servicios/canton.service';
declare var google: any

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    options: any;
    overlays: any[] = [];
    dialogVisible: boolean = false;
    markerTitle?: string | null;
    selectedPosition: any;
    infoWindow: any;
    draggable: boolean = false;
    


    listarCantones:LitarCantonesDTO[] = [];
    //variables globales
    cantones: obtenerCantonDTO[];
    subCargarCantones!:Subscription;


    loading: boolean = false;

    selectedCustomer2!: Product;

    objGeneroModel!: Product[]

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(private cantonService:CantonService, private messageService: MessageService) {
        this.cantones = [];
    }

    ngOnInit() {
        this.options = {
            center: {lat: -3.989530079515933, lng: -79.20430183410645},
            zoom: 9
        };

        this.initOverlays();

        this.infoWindow = new google.maps.InfoWindow();
        this.cargarCantones()
    }


    handleMapClick(event: any) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
        console.log(event)
        console.log(this.selectedPosition.lat())
        console.log(this.selectedPosition.lng())
    }

    handleOverlayClick(event: any) {
        let isMarker = event.overlay.getTitle != undefined;

        if (isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
        }
        else {
            this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
        }
    }

    addMarker() {
        this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle, draggable: this.draggable}));
        this.markerTitle = null;
        this.dialogVisible = false;
    }

    handleDragEnd(event: any) {
        this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
    }

    initOverlays() {
        
        if (!this.overlays||!this.overlays.length) {
            this.overlays = [
            ];
        }
    }

    zoomIn(map: any) {
        map.setZoom(map.getZoom()+1);
    }

    zoomOut(map: any) {
        map.setZoom(map.getZoom()-1);
    }

    clear() {
        this.overlays = [];
    }

    cargarCantones():void{
        this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
          console.log(cantones);
          this.loading=false;
          this.listarCantones=cantones;
          for (let i = 0; i < cantones.length; i++) {
            this.overlays.push(new google.maps.Marker({position: {lat: Number(cantones[i].latitud), lng: Number(cantones[i].longitud)}, title:cantones[i].nombre}),)
            }
        },error=>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
        });
      
      }
    
}
