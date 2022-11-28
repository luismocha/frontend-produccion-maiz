import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReproductorService {

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined); 
  public audio!: HTMLAudioElement;

  constructor() { 
    this.audio = new Audio();
    this.trackInfo$.subscribe(respOK => {
      if(respOK){
        console.log('Service: '+respOK);
        //this.setAudio(respOK);
      }
    })
  }

  public setAudio(url : string): void{

  this.audio.src = url;
  this.audio.play()
  }
}
