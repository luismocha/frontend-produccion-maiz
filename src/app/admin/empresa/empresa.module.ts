import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { FormularioEmpresaComponent } from './formulario-empresa/formulario-empresa.component';
import { ListarEmpresaComponent } from './listar-empresa/listar-empresa.component';


@NgModule({
  declarations: [
    EmpresaComponent,
    CrearEmpresaComponent,
    EditarEmpresaComponent,
    FormularioEmpresaComponent,
    ListarEmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule
  ]
})
export class EmpresaModule { }
