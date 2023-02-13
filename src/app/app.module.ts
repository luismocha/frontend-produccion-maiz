import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { InputTextModule } from 'primeng/inputtext';
import { PrincipalModule } from './principal/principal.module';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import {MenubarModule} from 'primeng/menubar';
import {TabViewModule} from 'primeng/tabview';
import {CarouselModule} from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { GMapModule } from 'primeng/gmap';
import { ChartModule } from 'primeng/chart';
import { DashboardModule } from './demo/components/dashboard/dashboard.module';
import { CostoProduccionModule } from './admin/costo-produccion/costo-produccion.module';
import { GaleriaModule } from './admin/galeria/galeria.module';
import { SeccionGaleriaComponent } from './home/seccion-galeria/seccion-galeria.component';
import { SeccionPublicacionComponent } from './home/seccion-publicacion/seccion-publicacion.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ProduccionModule } from './admin/produccion/produccion.module';
import { SeccionResultadosComponent } from './home/seccion-resultados/seccion-resultados.component';
import { ResultadosModule } from './admin/resultados/resultados.module';
@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        HomeComponent,
        DashboardComponent,
        SeccionGaleriaComponent,
        SeccionPublicacionComponent,
        SeccionResultadosComponent,

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AdminModule,
        MenubarModule,
        TabViewModule,
        CarouselModule,
        ButtonModule,
        GMapModule,
        ChartModule,
        PrincipalModule,
        DashboardModule,
        CostoProduccionModule,
        PdfViewerModule,
        DialogModule,
        TableModule,
        ProduccionModule,
        ResultadosModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
          }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
