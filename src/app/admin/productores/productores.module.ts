import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoresRoutingModule } from './productores-routing.module';
import { ProductoresComponent } from './productores.component';
import { CrearProductorComponent } from './crear-productor/crear-productor.component';
import { EditarProductorComponent } from './editar-productor/editar-productor.component';
import { FormularioProductorComponent } from './formulario-productor/formulario-productor.component';
import { ListarProductorComponent } from './listar-productor/listar-productor.component';


@NgModule({
  declarations: [
    ProductoresComponent,
    CrearProductorComponent,
    EditarProductorComponent,
    FormularioProductorComponent,
    ListarProductorComponent
  ],
  imports: [
    CommonModule,
    ProductoresRoutingModule
  ]
})
export class ProductoresModule { }
