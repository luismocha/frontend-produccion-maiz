import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-galeria',
  templateUrl: './form-galeria.component.html',
  styleUrls: ['./form-galeria.component.scss']
})
export class FormGaleriaComponent implements OnInit {
    @Input() modoLectura!:boolean;
    formGaleria!:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }
  iniciarFormulario(){

    //if(this.tipoAccion != 'ver'){
      this.formGaleria = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.maxLength(100)]],
        imagen: ['', [Validators.required]],
        descripcion: ['', Validators.required,Validators.maxLength(100)],
      });
    //}
  }
  submitGaleria(){

  }
    get nombre(){ return this.formGaleria.get('nombre')?.invalid && this.formGaleria.get('nombre')?.touched ;}
    get imagen(){ return this.formGaleria.get('imagen')?.invalid && this.formGaleria.get('imagen')?.touched ;}
    get descripcion(){ return this.formGaleria.get('descripcion')?.invalid && this.formGaleria.get('descripcion')?.touched ;}
}


