import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import {GMapModule} from 'primeng/gmap';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { GraficoBarrasComponent } from './grafico-barras/grafico-barras.component';
import { GraficoPastelComponent } from './grafico-pastel/grafico-pastel.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        InputTextModule,
        DashboardsRoutingModule,
        GMapModule,
        DialogModule,
        ToastModule,
        CheckboxModule
    ],
    exports:[GraficoBarrasComponent,GraficoPastelComponent],
    providers: [MessageService],
    declarations: [DashboardComponent, GraficoBarrasComponent, GraficoPastelComponent]
})
export class DashboardModule { }
