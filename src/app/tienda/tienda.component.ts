import { Component, OnInit, HostListener } from '@angular/core';
import { Product } from '../demo/api/product';
import { ProductService } from '../demo/service/product.service';
import { LayoutService } from '../services/app.layout.service';
import { ReproductorService } from '../services/reproductor.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;



  visibleSidebar1 = false;
    visibleSidebar2 = false;

    mostrarInputSearch=false;
    mostrarMenu=true;
    rangeValues: number[] = [20,80];




  countries: Country[];
  responsiveOptions;
  products: Product[] =[];

  selectedCountry: Country | undefined;

  filterValue = '';

  constructor(public reproductorService: ReproductorService, public layoutService: LayoutService, private productService: ProductService) { 

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];


    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
  ];

  }


  sendPlay(track: String): void{
    this.reproductorService.trackInfo$.next(track);
    console.log(track)
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;

      this.productService.getProductsSmall().then(products => {
        this.products = products;
      });

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  mostrarDatosMenu(){
    this.mostrarInputSearch=false;
    this.mostrarMenu=true;
}

mostrarSearch(){
    if(this.getScreenWidth <=768){
      this.mostrarInputSearch=true;
      this.mostrarMenu=false;
    }
    
}

}
interface Country {
  name: string,
  code: string
}
