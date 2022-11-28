import { Component, OnInit } from '@angular/core';
import { ReproductorService } from 'src/app/services/reproductor.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss']
})
export class CardPlayerComponent implements OnInit {

  constructor(public reproductorService: ReproductorService,) { }

  ngOnInit(): void {
  }

  sendPlay(track: String): void{
    this.reproductorService.trackInfo$.next(track);
    console.log('CARD: '+track)
  }

}
