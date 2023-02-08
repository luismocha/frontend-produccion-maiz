import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearGaleriaComponent } from './crear-galeria/crear-galeria.component';
import { GaleriaComponent } from './galeria.component';

const routes: Routes = [
    {path: '',component: GaleriaComponent},
    {path: "crear",component:CrearGaleriaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaleriaRoutingModule { }
