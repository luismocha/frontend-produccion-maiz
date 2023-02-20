import { ValidatorFn } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { soloLetras } from 'src/app/core/validaciones/validarTexto';
import { CantonService } from '../../servicios/canton.service';
import { CantonDTO, CrearCantonDTO } from '../canton.model';
import { validateDecimalesEnteros } from 'src/app/core/validaciones/validateDecimalesEnteros';
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
  submited: any = false;

   //output
   @Output() onSubmitCanton:EventEmitter<CrearCantonDTO>=new EventEmitter<CrearCantonDTO>();
   //input
   @Input() modeloCanton!: CantonDTO;
   @Input() modoLectura!:boolean;
   
   //formulario
   formCanton!:FormGroup;
   //
   idObtainForUpdate: string = '';

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    //public ref: DynamicDialogRef,
    private cantonService:CantonService,
    private router:Router,
    private messageService: MessageService) { }

    ngOnInit(): void {

      this.iniciarFormulario();
      this.aplicarPatch();
      this.cantonService.refresh$.subscribe(() => {
        this.router.navigate(['/admin/canton']);
       });

      this.options = {
            center: {lat: -3.989530079515933, lng: -79.20430183410645},
            zoom: 9
        };



        this.infoWindow = new google.maps.InfoWindow();

        this.initOverlays();
        setTimeout(() => {
          this.iniciarMarcadoresDelCanton()
        }, 1000);
    }

    iniciarMarcadoresDelCanton(){

      if(this.modeloCanton){
        this.overlays.push(new google.maps.Marker({
          position: {
            lat: Number(this.modeloCanton.latitud),
            lng: Number(this.modeloCanton.longitud)},
            title:this.modeloCanton.nombre}),)
      }
    }
    aplicarPatch(){
      if(this.modeloCanton!=undefined || this.modeloCanton!=null){
        this.formCanton.patchValue(this.modeloCanton);


      }
    }
    validarLetras(event:any){
        return soloLetras(event);
    }
    ValidarDecimalesEnteros(event:KeyboardEvent){
        return validateDecimalesEnteros(event.key);
    }
    iniciarFormulario(){
      this.formCanton = this.formBuilder.group({
        nombre: ['', Validators.required],
        latitud: ['', Validators.required],
        longitud: ['', Validators.required],
        activo: [true, Validators.required],
      });
    }

  crearCanton():void{
    this.submited = true;
    if(this.formCanton.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
        return Object.values(this.formCanton.controls).forEach(
            (contol) => {
                contol.markAsTouched();
            }
        );
    }

    this.formCanton.controls['nombre'].setValue(this.formCanton.value.nombre.toUpperCase());

    //todo ok
    let instanciaCantonCrear:CrearCantonDTO=this.formCanton.value;
    this.onSubmitCanton.emit(instanciaCantonCrear);

  }

  cerrarModal(){
    //this.dialogService.cerrarModal();
    //this.ref.close();
  }



  handleMapClick(event: any) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;




    //console.log(this.selectedPosition.lng())

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

      const lat = this.overlays[0].position.lat();
      const lng = this.overlays[0].position.lng();
      const title = this.overlays[0].title;

      this.formCanton.setValue({
        nombre: title,
        latitud: lat,
        longitud: lng,
        activo: true
      });

      /*this.formCanton.value.nombre = this.overlays[0].title;
      this.formCanton.value.latitud = this.overlays[0].position.lat();
      this.formCanton.value.longitud = this.overlays[0].position.lng();*/


    this.markerTitle = null;
    this.dialogVisible = false;
}

handleDragEnd(event: any) {
    this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
}

initOverlays() {
  console.log('initOverleay')
    if (!this.overlays||!this.overlays.length) {
        this.overlays = [
            //new google.maps.Marker({position: {lat: Number(this.formCanton.value.latitud), lng: Number(this.formCanton.value.longitud)}, title:this.formCanton.value.nombre}),

        ];
        /*this.overlays.push(new google.maps.Marker({
          position: {
            lat: Number(this.modeloCanton.latitud),
            lng: Number(this.modeloCanton.longitud)},
            title:this.modeloCanton.nombre}),)*/
    }else{
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


get nombre(){ return this.formCanton.get('nombre')?.invalid && this.formCanton.get('nombre')?.touched;}
get latitud(){ return this.formCanton.get('latitud')?.invalid && this.formCanton.get('latitud')?.touched;}
get longitud(){ return this.formCanton.get('longitud')?.invalid && this.formCanton.get('longitud')?.touched;}
get activo(){ return this.formCanton.get('activo')?.invalid && this.formCanton.get('activo')?.touched;;}

}
