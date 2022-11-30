import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { TopbarPrincipalComponent } from '../principal/topbar-principal/topbar-principal.component';
import { PrincipalModule } from '../principal/principal.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        PrincipalModule
    ]
})
export class AuthModule { }
