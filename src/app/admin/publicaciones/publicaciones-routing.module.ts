import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPublicacionesComponent } from './crear-publicaciones/crear-publicaciones.component';
import { EditarPublicacionesComponent } from './editar-publicaciones/editar-publicaciones.component';
import { PublicacionesComponent } from './publicaciones.component';

const routes: Routes = [
    {path: '',component: PublicacionesComponent},
    {path: "crear",component:CrearPublicacionesComponent},
    {path: "editar/:id",component:EditarPublicacionesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicacionesRoutingModule { }
