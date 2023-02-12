import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionesComponent } from './publicaciones.component';
import { FormularioPublicacionesComponent } from './formulario-publicaciones/formulario-publicaciones.component';
import { CrearPublicacionesComponent } from './crear-publicaciones/crear-publicaciones.component';
import { EditarPublicacionesComponent } from './editar-publicaciones/editar-publicaciones.component';
import { VisualizarPublicacionesComponent } from './visualizar-publicaciones/visualizar-publicaciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ListarPublicacionesComponent } from './listar-publicaciones/listar-publicaciones.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    PublicacionesComponent,
    FormularioPublicacionesComponent,
    CrearPublicacionesComponent,
    EditarPublicacionesComponent,
    //VisualizarPublicacionesComponent,
    ListarPublicacionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    PublicacionesRoutingModule
  ]
})
export class PublicacionesModule { }
