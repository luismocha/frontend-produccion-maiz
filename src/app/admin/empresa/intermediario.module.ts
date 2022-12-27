import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntermediarioRoutingModule } from './intermediario-routing.module';
import { IntermediarioComponent } from './intermediario.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ListarIntermediarioComponent } from './listar-intermediario/listar-intermediario.component';
import { FormularioIntermediarioComponent } from './formulario-empresa/formulario-intermediario.component';
import { EditarIntermediarioComponent } from './editar-empresa/editar-intermediario.component';
import { CrearIntermediarioComponent } from './crear-empresa/crear-intermediario.component';

@NgModule({
  declarations: [
    IntermediarioComponent,
    CrearIntermediarioComponent,
    EditarIntermediarioComponent,
    FormularioIntermediarioComponent,
    ListarIntermediarioComponent
  ],
  imports: [
    CommonModule,
    IntermediarioRoutingModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule
  ]
})
export class IntermediarioModule { }
