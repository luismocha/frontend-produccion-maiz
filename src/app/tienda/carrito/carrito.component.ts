import { Component, OnInit } from '@angular/core';
import { ReproductorService } from 'src/app/services/reproductor.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  visibleSidebar2 = false;
  constructor(public reproductorService: ReproductorService) { }

  ngOnInit(): void {
  }
  sendPlay(track: String): void{
    this.reproductorService.trackInfo$.next(track);
    console.log('CART: '+track)
  }
}
