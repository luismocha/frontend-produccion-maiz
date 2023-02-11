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
  fecha = new Date().getFullYear();
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
  goPublicaciones(){
    const nosotrosSection = document.querySelector('#publicaciones');
    nosotrosSection?.scrollIntoView({ behavior: 'smooth' });
  }
  goGrupoInvestigador(){
    const nosotrosSection = document.querySelector('#grupoinvestigacion');
    nosotrosSection?.scrollIntoView({ behavior: 'smooth' });
  }

  goAcercaDe(){
    const nosotrosSection = document.querySelector('#acerdade');
    nosotrosSection?.scrollIntoView({ behavior: 'smooth' });
  }
  goGaleria(){
    const galeriaSection = document.querySelector('#galeria');
    galeriaSection?.scrollIntoView({ behavior: 'smooth' });
  }
  goResultados(){
    const nosotrosSection = document.querySelector('#resultados');
    nosotrosSection?.scrollIntoView({ behavior: 'smooth' });
  }
  goObjetivos(){
    const nosotrosSection = document.querySelector('#objetivos');
    nosotrosSection?.scrollIntoView({ behavior: 'smooth' });
  }
  goInicio(){
    const nosotrosSection = document.querySelector('#hero-area');
    nosotrosSection?.scrollIntoView({ behavior: 'smooth' });
  }
  btnResultados(){
    this.divToScroll.nativeElement.scrollTop = 30;
  }
}
