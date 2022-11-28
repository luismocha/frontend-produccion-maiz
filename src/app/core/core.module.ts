import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReproductorComponent } from './reproductor/reproductor.component';



@NgModule({
  declarations: [ReproductorComponent],
  imports: [
    CommonModule
  ],
  exports: [ReproductorComponent],
})
export class CoreModule { }
