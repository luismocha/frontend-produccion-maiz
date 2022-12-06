import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { FormularioEmpresaComponent } from './formulario-empresa/formulario-empresa.component';
import { ListarEmpresaComponent } from './listar-empresa/listar-empresa.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

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
    EmpresaRoutingModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule
  ]
})
export class EmpresaModule { }
