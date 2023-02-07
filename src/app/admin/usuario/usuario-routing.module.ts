import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {path: '',component: UsuarioComponent},
  {path: 'crear',component: CrearUsuarioComponent},
  {path: 'editar/:id',component: EditarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
