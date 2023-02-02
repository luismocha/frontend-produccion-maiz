import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProduccionComponent } from './crear-produccion/crear-produccion.component';
import { EditarProduccionComponent } from './editar-produccion/editar-produccion.component';
import { ProduccionComponent } from './produccion.component';

const routes: Routes = [
  {path: '',component: ProduccionComponent},
  {path: "crear",component:CrearProduccionComponent},
  {path: "editar/:id",component:EditarProduccionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccionRoutingModule { }
