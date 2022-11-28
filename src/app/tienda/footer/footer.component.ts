import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductosModel } from 'src/app/models/tracks.model';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { ReproductorService } from 'src/app/services/reproductor.service';
import { BehaviorSubject } from 'rxjs';
import { min } from 'rxjs';

declare var WaveSurfer:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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







  volumeInit: number = 30;
  song = '../../../assets/Ryan Castro - Avemaria - Intro Acapella - Dj Fernando Alean - 097 Bpm.mp3';

  timeElapsed = '00:00'
  remainingTime = '00:00'




  constructor( public reproductorService: ReproductorService ) { }

  ngOnInit(): void {
    this.reproductorService.trackInfo$.subscribe(res => {
      this.song = res
      console.log('Reproducir la canci[on'+this.song);
      if(this.song != undefined){
        this.play()
        this.rangoVolumen(this.volumeInit)
      }
    });

    
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
      let rutaCancion=this.song;
      //let rutaCancion=environment.dominio+'/Recursos/productos-demos/'+this.instanciaProductoModel.url_directorio;
      if(!this.instanciaProductoModel.url_directorio){
        this.wsx.destroy();
        this.waveForm();
        this.wsx.load(rutaCancion);
        this.wsx.on('ready', ()=> {
          //CALL THIS METHOD FOR CALCULATE THE PERCENTAGE OF VOLUME
          this.rangoVolumen(this.volumeInit)
          //DOCUMENTACION
          this.cargado=true;
          this.wsx.play();
          this.timeSong()
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

   timeSong(){
    try {
      this.wsx.on('audioprocess', () =>{
        if (this.wsx.isPlaying()) {
          var totalTime = this.wsx.getDuration(),
              currentTime = this.wsx.getCurrentTime()
              //this.remainingTime = totalTime - currentTime;
              this.setTimeElapsed(currentTime);
              this.setRemining(currentTime, totalTime)
        }
      });
  }
     catch (error) {
      
    }
  }



  private setTimeElapsed(currentTime: number){
    let seconds = Math.floor(currentTime%60);
    let minutes = Math.floor((currentTime/60)%60);

    const displaySeconds = (seconds<10)? `0${seconds}`: seconds;
    const displayMinutes = (minutes<10)? `0${minutes}`: minutes;

    const displayFormat = `${displayMinutes}: ${displaySeconds}`;
    this.timeElapsed = displayFormat
    
  }

  private setRemining( currentTime: number, duration: number): void{

    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft%60);
    let minutes = Math.floor((timeLeft/60)%60);

    const displaySeconds = (seconds<10)? `0${seconds}`: seconds;
    const displayMinutes = (minutes<10)? `0${minutes}`: minutes;

    const displayFormat = `${displayMinutes}: ${displaySeconds}`;
    this.remainingTime = displayFormat
  }


  mute(){
    if(this.tipoVolumen=='alto'){
      this.wsx.setMute(true);
      this.tipoVolumen='mute';
      this.volumeInit = 0;
      return 'mute';
    }
    this.wsx.setMute(false);
    this.tipoVolumen='alto';
    this.volumeInit = 30;
    return 'alto';
  }
  rangoVolumen(valor:any){
    let rangoVolumen;
    if(valor.value != undefined){
      rangoVolumen=Number(valor.value)/100;
    }else{
      rangoVolumen=Number(valor)/100;
    }
    if(rangoVolumen==0){
      this.tipoVolumen='mute';
    }else{
      this.tipoVolumen='alto';
    }
    this.wsx.setVolume(rangoVolumen);
  }
  ngOnDestroy(): void {
    this.wsx.stop();
    try {
      this.wsx=null;
    } catch (error) {
      console.error(error);
    }
  }
  
}
