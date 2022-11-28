import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductosModel} from 'src/app/models/tracks.model';
import { ReproductorService } from 'src/app/services/reproductor.service';
import { environment } from 'src/environments/environment';
declare var WaveSurfer:any;

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.scss']
})
export class ReproductorComponent implements OnInit, OnDestroy {
  //child o nodos
  @ViewChild('waveform') waveformNodo!: ElementRef;

  //variables globales
  dominio=environment.dominio;
  private wsx!:any;
  instanciaProductoModel:ProductosModel=new ProductosModel;
  ocularPlay:boolean=false;
  ocularStop:boolean=true;
  cargado:boolean=false;
  tipoVolumen:string='alto';
  mostrarReproductor:boolean=true;
  volumenSlider=0;
  duracionMinutos:any=0;
  //ruta cancion
  //https://proeditsclub.com/Recursos/productos-demos/Ryan Castro - Avemaria - Intro Acapella - Dj Fernando Alean - 097 Bpm.mp3
  
  listObservers$ : Array<Subscription> = [];
  constructor(public reproductorService: ReproductorService) { }

  ngOnInit(): void {
    this.reproductorService.trackInfo$.subscribe(res => {
      console.log('Reproducir la canci[on');
    });
    //this.waveForm();
  }

 


  ngAfterViewInit(): void {
    this.waveForm();
    this.mostrarReproductor=true;
  }
  waveForm(){

    console.log(WaveSurfer);
    this.wsx=null;
    this.wsx =
    WaveSurfer.create({
      container:this.waveformNodo['nativeElement'],
      normalize: true,
      barHeight:1,
      height:50,
      mediaType:'audio',
      cursorWidth:1,
      hideScrollbar:true,
      autoCenter:true,
      maxCanvasWidth:60,
      cursorColor:'black',
      barGap: 1.5,
      splitChannels: false,
      backend: 'MediaElement',
      progressColor: '#10a86f',
      barWidth: 0.8,

    });
  }
  play(){
    console.log("play");
    this.cargado=false;
    this.ocularPlay=true;
    this.ocularStop=false;
    try {
      let auxCancion="https://proeditsclub.com/Recursos/productos-demos/Ryan Castro - Avemaria - Intro Acapella - Dj Fernando Alean - 097 Bpm.mp3";
      let rutaCancion='../../../assets/Ryan Castro - Avemaria - Intro Acapella - Dj Fernando Alean - 097 Bpm.mp3';
      //let rutaCancion=environment.dominio+'/Recursos/productos-demos/'+this.instanciaProductoModel.url_directorio;
      if(!this.instanciaProductoModel.url_directorio){
        this.wsx.destroy();
        this.waveForm();
        this.wsx.load(rutaCancion);
        this.wsx.on('ready', ()=> {
          //DOCUMENTACION
          this.cargado=true;
          this.getTimeString(this.wsx.getDuration());
          this.duracionMinutos=this.getTimeString(this.wsx.getDuration());
          this.wsx.play();
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  stop(){
    try {
      this.wsx.stop();
      this.ocularPlay=false;
      this.ocularStop=true;
    } catch (error) {
      console.error(error);
    }
  }
  getTimeString(totalSeconds:any) {

    var hours:any = Math.floor(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;

    var minutes:any = Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;

    var seconds:any = Math.floor(totalSeconds);

    // Pad the minutes and seconds with leading zeros, if required
    hours = this.timeToString(hours);
    minutes = this.timeToString(minutes);
    seconds = this.timeToString(seconds);

    // Compose the string for display
    var currentTimeString = minutes + ":" + seconds;

    return currentTimeString;
  }
  timeToString(num:any){
    return ( num < 10 ? "0" : "" ) + num;
  }
  mute(){
    if(this.tipoVolumen=='alto'){
      this.wsx.setMute(true);
      this.tipoVolumen='mute';
      return 'mute';
    }
    this.wsx.setMute(false);
    this.tipoVolumen='alto';
    return 'alto';
  }
  rangoVolumen(valor:string){
    let rangoVolumen=Number(valor)/100;
    if(rangoVolumen==0){
     this.tipoVolumen='mute';
    }else{
      this.tipoVolumen='alto';
    }
    this.wsx.setVolume(rangoVolumen);
  }
  ngOnDestroy(): void {
    this.listObservers$.forEach( e => e.unsubscribe());
    this.wsx.stop();
    try {
      this.wsx=null;
    } catch (error) {
      console.error(error);
    }
  }

}
