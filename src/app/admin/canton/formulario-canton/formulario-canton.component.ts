import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CantonDTO, CrearCantonDTO } from '../canton.model';
declare var google: any

@Component({
  providers: [MessageService],
  selector: 'app-formulario-canton',
  templateUrl: './formulario-canton.component.html',
  styleUrls: ['./formulario-canton.component.scss']
})
export class FormularioCantonComponent implements OnInit {


  options: any;
  overlays: any[] = [];
  dialogVisible: boolean = false;
  markerTitle?: string | null;
  selectedPosition: any;
  infoWindow: any;
  draggable: boolean = false;





  
   //output
   @Output() onSubmitCanton:EventEmitter<CrearCantonDTO>=new EventEmitter<CrearCantonDTO>();
   //input
   @Input() modeloCanton!: CantonDTO;
   //formulario
   formCanton!:FormGroup;
   //
   idObtainForUpdate: string = '';

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private messageService: MessageService) { }

    ngOnInit(): void {

      this.options = {
            center: {lat: -3.989530079515933, lng: -79.20430183410645},
            zoom: 9
        };

        this.initOverlays();

        this.infoWindow = new google.maps.InfoWindow();


      this.iniciarFormulario();
      this.aplicarPatch();
    }
    aplicarPatch(){
      if(this.modeloCanton!=undefined || this.modeloCanton!=null){
        this.formCanton.patchValue(this.modeloCanton);
      }
    }
    iniciarFormulario(){
      this.formCanton = this.formBuilder.group({
        nombre: [''],
        latitud: [''],
        longitud: [''],
        activo: [true, Validators.required],
      });
    }

  crearCanton():void{
    if(this.formCanton.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
      return;
    }
    //todo ok
    let instanciaCantonCrear:CrearCantonDTO=this.formCanton.value;
    this.onSubmitCanton.emit(instanciaCantonCrear);

  }

  cerrarModal(){
    //this.dialogService.cerrarModal();
    this.ref.close();
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
  this.overlays = []
    this.overlays.push(new google.maps.Marker({
      position:{lat: this.selectedPosition.lat(), 
        lng: this.selectedPosition.lng()}, 
        title:this.markerTitle, 
        draggable: this.draggable
      }));


      this.formCanton.value.nombre = this.overlays[0].title;
      this.formCanton.value.latitud = this.overlays[0].position.lat();
      this.formCanton.value.longitud = this.overlays[0].position.lng();

    this.markerTitle = null;
    this.dialogVisible = false;
}

handleDragEnd(event: any) {
    this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
}

initOverlays() {
    if (!this.overlays||!this.overlays.length) {
        this.overlays = [
            new google.maps.Marker({position: {lat: -3.9958869286736585, lng: -79.20165982597871}, title:"Loja"}),
            
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


}
