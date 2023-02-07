import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearResultadosComponent } from './crear-resultados/crear-resultados.component';
import { EditarResultadosComponent } from './editar-resultados/editar-resultados.component';
import { ResultadosComponent } from './resultados.component';

const routes: Routes = [
  {path: '',component: ResultadosComponent},
  {path: 'crear',component: CrearResultadosComponent},
  {path: 'editar/:id',component: EditarResultadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosRoutingModule { }
