import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from './product';
import { ProductService } from './productservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('resultados') divToScroll!: ElementRef;
  products!: Product[];
  responsiveOptions;
  constructor(private productService: ProductService) {
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
    });
  }
  btnResultados(){
    this.divToScroll.nativeElement.scrollTop = 30;
  }
}
