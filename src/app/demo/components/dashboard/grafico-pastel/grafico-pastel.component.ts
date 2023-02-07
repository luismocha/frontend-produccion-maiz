import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico-pastel',
  templateUrl: './grafico-pastel.component.html',
  styleUrls: ['./grafico-pastel.component.scss']
})
export class GraficoPastelComponent implements OnInit {
    basicData: any;
    chartOptions: any;

    data: any;
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
    this.data = {
        labels: ['A','B','C'],
        datasets: [
            {
                data: [0, 50, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    };
  }

}
