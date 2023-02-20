import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { soloLetras } from 'src/app/core/validaciones/validarTexto';
import { IntermediarioService } from '../../servicios/intermediario.service';
import { CrearIntermediarioDTO, IntermediarioDTO } from '../intermediario.model';



@Component({
  providers: [MessageService],
  selector: 'app-formulario-intermediario',
  templateUrl: './formulario-intermediario.component.html',
  styleUrls: ['./formulario-intermediario.component.scss']
})
export class FormularioIntermediarioComponent implements OnInit {

  //output
  @Output() onSubmitIntermediario:EventEmitter<CrearIntermediarioDTO>=new EventEmitter<CrearIntermediarioDTO>();
  //input
  @Input() modeloIntermediario!: IntermediarioDTO;
  @Input() modoLectura!: boolean;
  //formulario
  formIntermediario!:FormGroup;
  //
  idObtainForUpdate: string = '';
  submited: any = false;

 constructor(private formBuilder: FormBuilder,
   //public dialogService: ListarRolesComponent,
   //public ref: DynamicDialogRef,
   
              
   private router:Router,            
   private intermediarioService:IntermediarioService,
   private messageService: MessageService) { }


  ngOnInit(): void {

    this.iniciarFormulario();
    this.aplicarPatch();
    this.intermediarioService.refresh$.subscribe(()=>{
    this.router.navigate(['/admin/intermediario']);
    });

  }

  aplicarPatch(){
    if(this.modeloIntermediario!=undefined || this.modeloIntermediario!=null){
      this.formIntermediario.patchValue(this.modeloIntermediario);


    }
  }

  validarLetras(event:any){
    return soloLetras(event);
  }
  iniciarFormulario(){
    this.formIntermediario = this.formBuilder.group({
      lugar: ['', Validators.required],
      activo: ['true', Validators.required],
    });
  }


  crearLugar():void{
    this.submited = true;
    if(this.formIntermediario.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
      return Object.values(this.formIntermediario.controls).forEach(
        (contol) => {
            contol.markAsTouched();
        }
    );
    }

    this.formIntermediario.controls['lugar'].setValue(this.formIntermediario.value.lugar.toUpperCase());
    //todo ok
    let instanciaLugarCrear:CrearIntermediarioDTO=this.formIntermediario.value;
    this.onSubmitIntermediario.emit(instanciaLugarCrear);

  }


  get lugar(){ return this.formIntermediario.get('lugar')?.invalid  && this.formIntermediario.get('lugar')?.touched;}

}
