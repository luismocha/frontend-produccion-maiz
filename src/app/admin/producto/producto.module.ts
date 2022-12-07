import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { ListarProductoComponent } from './listar-producto/listar-producto.component';


@NgModule({
  declarations: [
    ProductoComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    FormularioProductoComponent,
    ListarProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
