import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearParroquiaComponent } from './crear-parroquia/crear-parroquia.component';
import { EditarParroquiaComponent } from './editar-parroquia/editar-parroquia.component';
import { ParroquiaComponent } from './parroquia.component';

const routes: Routes = [
  {path: '',component: ParroquiaComponent},
  {path: "crear",component:CrearParroquiaComponent},
  {path: "editar/:id",component:EditarParroquiaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParroquiaRoutingModule { }
