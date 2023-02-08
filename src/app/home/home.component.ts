import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  login: boolean = true;
  token = localStorage.getItem('token');
  usuarioLogueado: any = localStorage.getItem('name');
  constructor(private productService: ProductService,
    public router: Router ,
    private costoProduccionService:CostoProduccionService) {

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
