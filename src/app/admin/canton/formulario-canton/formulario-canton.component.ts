import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CantonDTO, CrearCantonDTO } from '../canton.model';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-canton',
  templateUrl: './formulario-canton.component.html',
  styleUrls: ['./formulario-canton.component.scss']
})
export class FormularioCantonComponent implements OnInit {

  
   //output
   @Output() onSubmitCanton:EventEmitter<CrearCantonDTO>=new EventEmitter<CrearCantonDTO>();
   //input
   @Input() modeloCanton!: CantonDTO;
   //formulario
   formCanton!:FormGroup;
   //
   idObtainForUpdate: string = '';

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private messageService: MessageService) { }

    ngOnInit(): void {
      this.iniciarFormulario();
      this.aplicarPatch();
    }
    aplicarPatch(){
      if(this.modeloCanton!=undefined || this.modeloCanton!=null){
        this.formCanton.patchValue(this.modeloCanton);
      }
    }
    iniciarFormulario(){
      this.formCanton = this.formBuilder.group({
        nombre: ['', Validators.required],
        latitud: ['', Validators.required],
        longitud: ['', Validators.required],
        imagen: ['', Validators.required],
      });
    }

  crearCanton():void{
    if(this.formCanton.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
      return;
    }
    //todo ok
    let instanciaCantonCrear:CrearCantonDTO=this.formCanton.value;
    this.onSubmitCanton.emit(instanciaCantonCrear);

  }

  cerrarModal(){
    //this.dialogService.cerrarModal();
    this.ref.close();
  }

}
