import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { obtenerCantonDTO } from '../../canton/canton.model';
import { CrearParroquiaDTO, ParroquiaDTO } from '../parroquia.model';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-parroquia',
  templateUrl: './formulario-parroquia.component.html',
  styleUrls: ['./formulario-parroquia.component.scss']
})
export class FormularioParroquiaComponent implements OnInit {

  cities: obtenerCantonDTO[];
  selectedCity1!: obtenerCantonDTO;

   //output
   @Output() onSubmitParroquia:EventEmitter<CrearParroquiaDTO>=new EventEmitter<CrearParroquiaDTO>();
   //input
   @Input() modeloParroquia!: ParroquiaDTO;
   //formulario
   formParroquia!:FormGroup;
   //
   idObtainForUpdate: string = '';

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private messageService: MessageService) { 
      this.cities = [
        {name: 'Celica'},
        {name: 'Pindal'},
        {name: 'Zapotillo'},
      ];
    }

  ngOnInit(): void {
    this.iniciarFormulario();
      this.aplicarPatch();
     
      console.log(this.cities)
  }

  aplicarPatch(){
    if(this.modeloParroquia!=undefined || this.modeloParroquia!=null){
      this.formParroquia.patchValue(this.modeloParroquia);
    }
  }
  iniciarFormulario(){
    this.formParroquia = this.formBuilder.group({
      nombre: ['', Validators.required],
      canton: ['', Validators.required],
    });
  }

crearParroquia():void{
  if(this.formParroquia.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  let instanciaParroquiaCrear:CrearParroquiaDTO=this.formParroquia.value;
  this.onSubmitParroquia.emit(instanciaParroquiaCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}
}
