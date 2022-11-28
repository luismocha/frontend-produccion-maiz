import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { ListarRolesComponent } from './listar-roles/listar-roles.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RolComponent } from './rol.component';
import { RolRoutingModule } from './rol-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { FormularioRolComponent } from './formulario-rol/formulario-rol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { EditarRolComponent } from './editar-rol/editar-rol.component';
import { VerRolComponent } from './ver-rol/ver-rol.component';
import {ProgressBarModule} from 'primeng/progressbar';
@NgModule({
  declarations: [
    CrearRolComponent,
    ListarRolesComponent,
    RolComponent,
    FormularioRolComponent,
    EditarRolComponent,
    VerRolComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RolRoutingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    ProgressBarModule
  ],
})
export class RolModule { }
