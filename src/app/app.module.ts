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
import { ClientComponent } from './admin/client/client.component';
import { AdminModule } from './admin/admin.module';
import { TiendaModule } from './tienda/tienda.module';
import { InputTextModule } from 'primeng/inputtext';
import { CartModule } from './cart/cart.module';
import { PrincipalModule } from './principal/principal.module';

@NgModule({
    declarations: [
        AppComponent, 
        NotfoundComponent, 
        HomeComponent, 
        DashboardComponent, 
        ClientComponent, 

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AdminModule,
        TiendaModule,
        PrincipalModule,
        CartModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
