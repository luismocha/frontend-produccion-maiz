import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { TopbarPrincipalComponent } from './topbar-principal/topbar-principal.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';
import { GrupoInvestigacionComponent } from './grupo-investigacion/grupo-investigacion.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    TopbarPrincipalComponent,
    ObjetivosComponent,
    GrupoInvestigacionComponent,
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
  ],
  exports: [TopbarPrincipalComponent]
})
export class PrincipalModule { }
