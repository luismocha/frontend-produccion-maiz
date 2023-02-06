import { Component, OnInit } from '@angular/core';
import { LitarProduccionesDTO, ProduccionDTO } from 'src/app/admin/produccion/produccion.model';

@Component({
  selector: 'app-seleccionar-produccion',
  templateUrl: './seleccionar-produccion.component.html',
  styleUrls: ['./seleccionar-produccion.component.scss']
})
export class SeleccionarProduccionComponent implements OnInit {
    listarProducciones:LitarProduccionesDTO[] = [];
    selectedCustomer!: ProduccionDTO;
    loading:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  btnSeleccionarroductor(productor:ProduccionDTO){
    this.selectedCustomer = productor
/*     this.productorSelected = productor.id
    this.yearProduccion = productor.year
    this.formIntermediario.controls['fk_produccion_id'].setValue(this.productorSelected);
    this.formIntermediario.controls['year_compra'].setValue(this.yearProduccion);
    this.produccionSeleccionada = true;
    this.display = false; */
    }
}
