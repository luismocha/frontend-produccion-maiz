import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-galeria',
  templateUrl: './form-galeria.component.html',
  styleUrls: ['./form-galeria.component.scss']
})
export class FormGaleriaComponent implements OnInit {
    formGaleria!:FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
