import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CostoProduccionDTO } from '../admin/costo-produccion/costo.produccion.model';
import { CostoProduccionService } from '../admin/servicios/costo-produccion.service';
import { Product } from './product';
import { ProductService } from './productservice';

@Component({
  providers:[ProductService],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('resultados') divToScroll!: ElementRef;
  modeloCostoProduccion!:CostoProduccionDTO;
  products!: Product[];
  responsiveOptions;
  constructor(private productService: ProductService,
    private costoProduccionService:CostoProduccionService) {
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
  }

  ngOnInit(): void {
    this.productService.getProductsSmall().then(products => {
        this.products = products;
        console.log(this.products);
    });
  }

  btnResultados(){
    this.divToScroll.nativeElement.scrollTop = 30;
  }
}
