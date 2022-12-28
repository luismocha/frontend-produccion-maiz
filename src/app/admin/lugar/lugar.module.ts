import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LugarRoutingModule } from './lugar-routing.module';
import { LugarComponent } from './lugar.component';
import { CrearLugarComponent } from './crear-lugar/crear-lugar.component';
import { EditarLugarComponent } from './editar-lugar/editar-lugar.component';
import { FormularioLugarComponent } from './formulario-lugar/formulario-lugar.component';
import { ListarLugarComponent } from './listar-lugar/listar-lugar.component';
import { VerLugarComponent } from './ver-lugar/ver-lugar.component';
import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    LugarComponent,
    CrearLugarComponent,
    EditarLugarComponent,
    FormularioLugarComponent,
    ListarLugarComponent,
    VerLugarComponent
  ],
  imports: [
    CommonModule,
    LugarRoutingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class LugarModule { }
