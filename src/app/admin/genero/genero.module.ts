import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneroRoutingModule } from './genero-routing.module';
import { ListarGeneroComponent } from './listar-genero/listar-genero.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
@NgModule({
  declarations: [
    ListarGeneroComponent,
  ],
  imports: [
    CommonModule,
    GeneroRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule
  ]
})
export class GeneroModule { }
