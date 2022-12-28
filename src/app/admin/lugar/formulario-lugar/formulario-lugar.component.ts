import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearLugarDTO, LugarDTO } from '../lugar.model';



@Component({
  providers: [MessageService],
  selector: 'app-formulario-lugar',
  templateUrl: './formulario-lugar.component.html',
  styleUrls: ['./formulario-lugar.component.scss']
})
export class FormularioLugarComponent implements OnInit {

  //output
  @Output() onSubmitLugar:EventEmitter<CrearLugarDTO>=new EventEmitter<CrearLugarDTO>();
  //input
  @Input() modeloLugar!: LugarDTO;
  @Input() tipoAccion!: string;
  //formulario
  formLugar!:FormGroup;
  //
  idObtainForUpdate: string = '';
  submited: any = false;

 constructor(private formBuilder: FormBuilder,
   //public dialogService: ListarRolesComponent,
   public ref: DynamicDialogRef, 
   private messageService: MessageService) { }


  ngOnInit(): void {

    this.iniciarFormulario();

  }

  aplicarPatch(){
    if(this.modeloLugar!=undefined || this.modeloLugar!=null){
      this.formLugar.patchValue(this.modeloLugar);
      

    }
  }
  iniciarFormulario(){
    this.formLugar = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }


  crearLugar():void{
    this.submited = true;
    if(this.formLugar.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
      return;
    }

    console.log(this.formLugar.value.nombre)
    //todo ok
    let instanciaLugarCrear:CrearLugarDTO=this.formLugar.value;
    this.onSubmitLugar.emit(instanciaLugarCrear);

  }

  cerrarModal(){
    //this.dialogService.cerrarModal();
    this.ref.close();
  }

  get nombre(){ return this.formLugar.get('nombre');}

}
