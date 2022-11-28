import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarGeneroComponent } from './listar-genero/listar-genero.component';

const routes: Routes = [
  {
    path: '',
    component: ListarGeneroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneroRoutingModule { }
