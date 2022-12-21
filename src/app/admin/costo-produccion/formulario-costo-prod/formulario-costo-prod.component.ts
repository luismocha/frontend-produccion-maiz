import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-costo-prod',
  templateUrl: './formulario-costo-prod.component.html',
  styleUrls: ['./formulario-costo-prod.component.scss']
})
export class FormularioCostoProdComponent implements OnInit {

  date10!: Date;

  constructor() { }

  ngOnInit(): void {
  }

  submit(event: any){
    let year = new Date(event).getFullYear()
    console.log(year)
    alert('selected: ' +year)
  }

}
