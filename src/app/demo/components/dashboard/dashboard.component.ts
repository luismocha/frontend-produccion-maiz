import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
import { CantonDTO, LitarCantonesDTO, obtenerCantonDTO } from 'src/app/admin/canton/canton.model';
import { CantonService } from 'src/app/admin/servicios/canton.service';
import { ProductorService } from 'src/app/admin/servicios/productor.service';
import { LitarProductoresDTO, ProductorDTO } from 'src/app/admin/productores/productor.model';
import { IntermediarioDTO, LitarIntermediariosDTO } from 'src/app/admin/intermediario/intermediario.model';
import { IntermediarioService } from 'src/app/admin/servicios/intermediario.service';
import { CostoProduccionService } from 'src/app/admin/servicios/costo-produccion.service';
import { LitarCostoProduccionesDTO } from 'src/app/admin/costo-produccion/costo.produccion.model';
declare var google: any

@Component({
    providers: [MessageService],
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









    subCargarProductores!:Subscription;
    listarProductores:LitarProductoresDTO[] = [];
    totalProductores: number=0;

    //variables globales
    listarCantones:LitarCantonesDTO[] = [];
    cantones: obtenerCantonDTO[];
    subCargarCantones!:Subscription;
    totalCantones: number=0;


    listarIntermediarios:LitarIntermediariosDTO[] = [];
    subCargarIntermediarios!:Subscription;
    totalIntermediarios: number=0;


    loading: boolean = false;

    selectedCustomer1!: ProductorDTO;
    selectedCustomer2!: CantonDTO;
    selectedCustomer3!: IntermediarioDTO;

    objGeneroModel!: Product[]
    listarCostoProduccion:LitarCostoProduccionesDTO[] = [];

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;
    subCargarCostoProduccion!:Subscription;

    subscription!: Subscription;

    constructor(private productorService:ProductorService,
        private cantonService:CantonService,
        private intermediarioService:IntermediarioService,
        private costoProduccionService:CostoProduccionService,
        private messageService: MessageService) {
        this.cantones = [];
    }

    ngOnInit() {
        if (!navigator.onLine) {
            console.log('No hay conexión a internet.');
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No hay conexión a internet.'});
          }

        this.options = {
            center: {lat: -3.989530079515933, lng: -79.20430183410645},
            zoom: 9
        };

        this.initOverlays();

        this.infoWindow = new google.maps.InfoWindow();
        this.cargarCantones();
        this.cargarProductores();
        this.cargarIntermediarios();
        this.cargarCostroProduccion();
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
          console.log(cantones.data);
          this.loading=false;
          this.listarCantones=cantones.data;
          this.totalCantones = this.listarCantones.length;
          for (let i = 0; i < cantones.data.length; i++) {
            this.overlays.push(new google.maps.Marker({position: {lat: Number(cantones.data[i].latitud), lng: Number(cantones.data[i].longitud)}, title:cantones.data[i].nombre}),)
            }
        },error=>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error: no ha iniciado el servidor'});
        });

      }

      cargarProductores():void{
        this.subCargarProductores=this.productorService.obtenerTodos().subscribe(productores=>{
          console.log(productores);
          this.loading=false;
          this.listarProductores=productores.data;
          this.totalProductores = this.listarProductores.length;
        },error=>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: error.error.message});
        });

      }

      cargarIntermediarios():void{
        this.subCargarIntermediarios=this.intermediarioService.obtenerTodos().subscribe(cantones=>{
          console.log(cantones);
          this.loading=false;
          this.listarIntermediarios=cantones.data;
          this.totalIntermediarios = this.listarIntermediarios.length;
        },error=>{
          let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
        });

      }

      cargarCostroProduccion(){
        this.subCargarCostoProduccion=this.costoProduccionService.obtenerTodos().subscribe(costoProduccion=>{
            this.listarCostoProduccion=costoProduccion.data;
          },error=>{
            let message= error.error.message;
            this.messageService.add({severity:'error', summary: 'Error', detail: message});
          });
      }


}
