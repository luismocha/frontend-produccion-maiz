import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.scss']
})
export class GraficoBarrasComponent implements OnInit {
    basicData: any;

    basicOptions: any;
  constructor() { }

  ngOnInit(): void {

    this.basicData = {
        labels: ['Pindal', 'Celica', 'Zapotillo', 'Pindal', 'Celica', 'Zapotillo'],
        datasets: [
            {
                label: 'Productores',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80,65, 59, 80]
            }
        ]
    };
  }

}
