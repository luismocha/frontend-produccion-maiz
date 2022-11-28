import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { TiendaModule } from '../tienda/tienda.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    TiendaModule,
    ButtonModule
  ]
})
export class CartModule { }
