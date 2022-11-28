import { Component, HostListener, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;



  visibleSidebarMenu = false;
  visibleSidebarCarrito = false;

    mostrarMenu=true;
    mostrarInputSearch=false;




  countries: Country[];

  selectedCountry: Country | undefined;

  filterValue = '';

  constructor(public layoutService: LayoutService) {
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
   ngOnInit(): void {
  
    this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
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
