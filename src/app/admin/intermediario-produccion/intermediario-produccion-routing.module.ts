import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearIntermediarioProduccionComponent } from './crear-intermediario-produccion/crear-intermediario-produccion.component';
import { EditarIntermediarioProduccionComponent } from './editar-intermediario-produccion/editar-intermediario-produccion.component';
import { IntermediarioProduccionComponent } from './intermediario-produccion.component';

const routes: Routes = [
  {path: '',component: IntermediarioProduccionComponent},
  {path: 'crear',component: CrearIntermediarioProduccionComponent},
  {path: 'editar/:id',component: EditarIntermediarioProduccionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntermediarioRoutingModule { }
