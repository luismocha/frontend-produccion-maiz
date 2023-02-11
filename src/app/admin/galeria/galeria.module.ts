import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaRoutingModule } from './galeria-routing.module';
import { ListarGaleriaComponent } from './listar-galeria/listar-galeria.component';
import { FormGaleriaComponent } from './form-galeria/form-galeria.component';
import { CrearGaleriaComponent } from './crear-galeria/crear-galeria.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { GaleriaComponent } from './galeria.component';
import { InputTextModule } from 'primeng/inputtext';
import { EditarGaleriaComponent } from './editar-galeria/editar-galeria.component';


@NgModule({
  declarations: [
    ListarGaleriaComponent,
    FormGaleriaComponent,
    CrearGaleriaComponent,
    GaleriaComponent,
    EditarGaleriaComponent
],
  imports: [
    CommonModule,
    GaleriaRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
  ]
})
export class GaleriaModule { }
