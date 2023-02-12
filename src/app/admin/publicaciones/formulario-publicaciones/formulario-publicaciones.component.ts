import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulario-publicaciones',
  templateUrl: './formulario-publicaciones.component.html',
  styleUrls: ['./formulario-publicaciones.component.scss']
})
export class FormularioPublicacionesComponent implements OnInit {
    //output
    @Input() modoLectura!:boolean;
    @Output() onSubmitPublicaciones:EventEmitter<any>=new EventEmitter<any>();
    //form
    formPublicaciones!:FormGroup;
    file!:any;
    uploadedFiles: any[] = [];
  constructor(private formBuilder: FormBuilder,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }
  iniciarFormulario(){
      this.formPublicaciones = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.maxLength(100)]],
        archivo: ['', [Validators.required]],
        descripcion: ['', [Validators.required,Validators.maxLength(100)]],
      });
  }
    fileEvent(fileInput:Event){
        const file=(<HTMLInputElement>fileInput.target).files;
        this.file=file;
    }
  submitPublicaciones(){
    console.log(this.formPublicaciones);
    if(this.formPublicaciones.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
        return Object.values(this.formPublicaciones.controls).forEach(
            (contol) => {
                contol.markAsTouched();
            }
        );
    }
    //todo ok
    const formadata=new FormData();
    if(this.file){
        formadata.append('archivo',this.file[0]);
        formadata.append('nombre',this.formPublicaciones.value.nombre);
        formadata.append('descripcion',this.formPublicaciones.value.descripcion);
    }else{
        formadata.append('archivo',"");
        formadata.append('nombre',this.formPublicaciones.value.nombre);
        formadata.append('descripcion',this.formPublicaciones.value.descripcion);
    }
    this.onSubmitPublicaciones.emit(formadata);

  }
  get nombre(){ return this.formPublicaciones.get('nombre')?.invalid && this.formPublicaciones.get('nombre')?.touched ;}
  get archivo(){ return this.formPublicaciones.get('archivo')?.invalid && this.formPublicaciones.get('archivo')?.touched ;}
  get descripcion(){ return this.formPublicaciones.get('descripcion')?.invalid && this.formPublicaciones.get('descripcion')?.touched ;}
}
