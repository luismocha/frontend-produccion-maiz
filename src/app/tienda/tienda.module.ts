import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { TiendaComponent } from './tienda.component';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SliderModule } from 'primeng/slider';
import { CarritoComponent } from './carrito/carrito.component';
import { CarouselModule } from 'primeng/carousel';
import { CoreModule } from '../core/core.module';
import { CardPlayerComponent } from './card-player/card-player.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TopMusicComponent } from './top-music/top-music.component';


@NgModule({
    declarations: [
        TiendaComponent, 
        TopbarComponent, 
        FooterComponent, 
        CarritoComponent, CardPlayerComponent, TopMusicComponent],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        TiendaRoutingModule,
        DropdownModule,
        ButtonModule,
        SidebarModule,
        InputTextModule,
        SliderModule,
        CarouselModule,
        CoreModule,
        ProgressSpinnerModule
    ],
    exports: [TiendaComponent, TopbarComponent, FooterComponent, TopMusicComponent],
})
export class TiendaModule {}
