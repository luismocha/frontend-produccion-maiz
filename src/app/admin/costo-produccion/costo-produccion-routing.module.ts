import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostoProduccionComponent } from './costo-produccion.component';
import { CrearCostoProdComponent } from './crear-costo-prod/crear-costo-prod.component';
import { EditarCostoProdComponent } from './editar-costo-prod/editar-costo-prod.component';

const routes: Routes = [
  {path: '',component: CostoProduccionComponent},
  {path: 'crear',component: CrearCostoProdComponent},
  {path: 'editar/:id',component: EditarCostoProdComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostoProduccionRoutingModule { }
