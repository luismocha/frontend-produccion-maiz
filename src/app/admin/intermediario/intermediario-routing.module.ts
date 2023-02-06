import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearIntermediarioComponent } from './crear-intermediario/crear-intermediario.component';
import { EditarIntermediarioComponent } from './editar-intermediario/editar-intermediario.component';
import { IntermediarioComponent } from './intermediario.component';

const routes: Routes = [
  {path: '',component: IntermediarioComponent},
  {path: 'crear',component: CrearIntermediarioComponent},
  {path: 'editar/:id',component: EditarIntermediarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntermediarioRoutingModule { }
