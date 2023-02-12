import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CrearGaleriaDTO, GaleriaCompletoDTO } from '../galeria';

@Component({
  selector: 'app-form-galeria',
  templateUrl: './form-galeria.component.html',
  styleUrls: ['./form-galeria.component.scss']
})
export class FormGaleriaComponent implements OnInit {
    //output
    @Input() modoLectura!:boolean;
    @Input() modeloGaleria!:GaleriaCompletoDTO;
    //output
    @Output() onSubmitGaleria:EventEmitter<any>=new EventEmitter<any>();
    formGaleria!:FormGroup;
    file!:any;
    uploadedFiles: any[] = [];
  constructor(private formBuilder: FormBuilder,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.aplicarPatch();
  }
  fileEvent(fileInput:Event){
      const file=(<HTMLInputElement>fileInput.target).files;
      this.file=file;
  }
  iniciarFormulario(){

    //if(this.tipoAccion != 'ver'){
      this.formGaleria = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.maxLength(100)]],
        imagen: ['', [Validators.required]],
        descripcion: ['', [Validators.required,Validators.maxLength(100)]],
      });
    //}
  }
  aplicarPatch(){
    if(this.modeloGaleria!=undefined || this.modeloGaleria!=null){
        this.modeloGaleria.imagen="";
        this.formGaleria.get('imagen')?.clearValidators();
      this.formGaleria.patchValue(this.modeloGaleria);
    }
  }
  submitGaleria(){
    console.log(this.formGaleria);
    if(this.formGaleria.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
        return Object.values(this.formGaleria.controls).forEach(
            (contol) => {
                contol.markAsTouched();
            }
        );
    }
    //todo ok
    const formadata=new FormData();
    if(this.file){
        formadata.append('imagen',this.file[0]);
        formadata.append('nombre',this.formGaleria.value.nombre);
        formadata.append('descripcion',this.formGaleria.value.descripcion);
    }else{
        formadata.append('imagen',"");
        formadata.append('nombre',this.formGaleria.value.nombre);
        formadata.append('descripcion',this.formGaleria.value.descripcion);
    }
    this.onSubmitGaleria.emit(formadata);

  }
/*   uploadImage(event:any) {
    const file = event.target.files[0];
    const fileType = file.type;

    if (!fileType.startsWith("image/")) {
        alert("EL ARCHIVO SELECCIONADO NO ES UNA IMAGEN");
        return;
    }

  } */


    get nombre(){ return this.formGaleria.get('nombre')?.invalid && this.formGaleria.get('nombre')?.touched ;}
    get imagen(){ return this.formGaleria.get('imagen')?.invalid && this.formGaleria.get('imagen')?.touched ;}
    get descripcion(){ return this.formGaleria.get('descripcion')?.invalid && this.formGaleria.get('descripcion')?.touched ;}
}


