import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { InputDemoComponent } from './formulario-producto/input-demo/input-demo.component';
import { InputRemixComponent } from './formulario-producto/input-remix/input-remix.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';



@NgModule({
  declarations: [
    FormularioProductoComponent,
    InputDemoComponent,
    InputRemixComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    ListarProductosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
