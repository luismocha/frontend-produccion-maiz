import { Component, OnInit } from '@angular/core';
import { ReproductorService } from 'src/app/services/reproductor.service';

@Component({
  selector: 'app-top-music',
  templateUrl: './top-music.component.html',
  styleUrls: ['./top-music.component.scss']
})
export class TopMusicComponent implements OnInit {

  constructor(public reproductorService: ReproductorService) { }

  ngOnInit(): void {
  }

  sendPlay(track: String): void{
    this.reproductorService.trackInfo$.next(track);
    console.log('TOP MUSIC: '+track)
  }

}
