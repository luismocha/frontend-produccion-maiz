import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearGaleriaComponent } from './crear-galeria/crear-galeria.component';
import { EditarGaleriaComponent } from './editar-galeria/editar-galeria.component';
import { GaleriaComponent } from './galeria.component';

const routes: Routes = [
    {path: '',component: GaleriaComponent},
    {path: "crear",component:CrearGaleriaComponent},
    {path: "editar/:id",component:EditarGaleriaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaleriaRoutingModule { }
