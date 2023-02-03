import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductorComponent } from './crear-productor/crear-productor.component';
import { EditarProductorComponent } from './editar-productor/editar-productor.component';
import { ProductoresComponent } from './productores.component';

const routes: Routes = [
  {path: '',component: ProductoresComponent},
  {path: 'crear',component: CrearProductorComponent},
  {path: 'editar/:id',component: EditarProductorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoresRoutingModule { }
