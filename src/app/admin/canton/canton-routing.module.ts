import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CantonComponent } from './canton.component';
import { CrearCantonComponent } from './crear-canton/crear-canton.component';
import { EditarCantonComponent } from './editar-canton/editar-canton.component';

const routes: Routes = [
  {path: '', component: CantonComponent},
  {path: "crear",component:CrearCantonComponent},
  {path: "editar/:id",component:EditarCantonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CantonRoutingModule { }
