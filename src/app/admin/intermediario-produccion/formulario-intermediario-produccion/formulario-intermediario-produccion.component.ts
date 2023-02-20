import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioProduccionDTO, EditarIntermediarioProduccionDTO, IntermediarioProduccionDTO, obtenerIntermediarioProduccionDTO } from '../intermediario-produccion.model';
import { Subscription } from 'rxjs';
import { IntermediarioDTO } from '../../intermediario/intermediario.model';
import { IntermediarioService } from '../../servicios/intermediario.service';
import { LitarProduccionesDTO, ProduccionDTO } from '../../produccion/produccion.model';
import { ProduccionService } from '../../servicios/produccion.service';
import { SeleccionarProduccionComponent } from './seleccionar-produccion/seleccionar-produccion.component';
import { IntermediarioProduccionService } from '../../servicios/intermediario-produccion.service';
import { Router } from '@angular/router';
import { soloNumero } from 'src/app/core/validaciones/validarNumero';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-formulario-intermediario-produccion',
  templateUrl: './formulario-intermediario-produccion.component.html',
  styleUrls: ['./formulario-intermediario-produccion.component.scss']
})
export class FormularioIntermediarioProduccionComponent implements OnInit {

  listarIntemediarios:IntermediarioDTO[] = [];
  listarProducciones:LitarProduccionesDTO[] = [];
  subCargarProductores!:Subscription;


   //output
   @Output() onSubmitEmpresa:EventEmitter<CrearIntermediarioProduccionDTO>=new EventEmitter<CrearIntermediarioProduccionDTO>();
   //input
   @Input() modeloIntermediario!: IntermediarioProduccionDTO;
   @Input() modoLectura!:boolean;
   //formulario
   formIntermediario!:FormGroup;
   seleccionarProduccion!: ProduccionDTO;
   loading:boolean=false;




   intermediarios: obtenerIntermediarioProduccionDTO[]

  ref!: DynamicDialogRef;
  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    //public ref: DynamicDialogRef,
    private empresaService: IntermediarioProduccionService,
    private produccionService:ProduccionService,
    private intermediarioService: IntermediarioService,
    public dialogService: DialogService,
    private router:Router,
    private messageService: MessageService) {
      this.intermediarios = [];
    }

  ngOnInit(): void {
    this.cargarIntermediario()
    this.iniciarFormulario();
    this.aplicarPatch();
    this.produccionService.produccionSeleccionada$.subscribe(produccion=>{
        this.seleccionarProduccion=produccion;
        this.formIntermediario.get('fk_produccion_id')?.setValue(this.seleccionarProduccion.id);
    });


    this.empresaService.refresh$.subscribe(() => {
      this.router.navigate(['/admin/intermediario-produccion']);
     });
  }

  aplicarPatch(){
    if(this.modeloIntermediario!=undefined || this.modeloIntermediario!=null){
      this.seleccionarProduccion=this.modeloIntermediario.fk_produccion;
      this.formIntermediario.patchValue(this.modeloIntermediario);
      this.formIntermediario.get('fk_intermediario_id')?.setValue(this.modeloIntermediario.fk_intermediario);
      this.formIntermediario.get('year_compra')?.setValue(new Date(this.modeloIntermediario.year_compra, 0, 1));
    }
  }
  validarNumero(event:any){
    return soloNumero(event);
  }
  iniciarFormulario(){
    this.formIntermediario = this.formBuilder.group({
      year_compra: ['', Validators.required],
      cantidad_comprada: ['', Validators.required],
      activo: [true, Validators.required],
      fk_intermediario_id: ['', Validators.required],
      //fk_produccion_id: ['', Validators.required],
    });
  }

crearIntermediario():void{
  //console.log(this.formIntermediario.value)
  if(!this.seleccionarProduccion){
    return this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe seleccionar una producción'});
  }
  if(this.formIntermediario.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return Object.values(this.formIntermediario.controls).forEach(
        (contol) => {
            contol.markAsTouched();
        }
    );
  }

  //todo ok
  const fecha = new Date(this.formIntermediario.get('year_compra')?.value);
  let instanciaEmpresaCrear:CrearIntermediarioProduccionDTO={
    activo:this.formIntermediario.get('activo')?.value,
    cantidad_comprada:this.formIntermediario.get('cantidad_comprada')?.value,
    fk_intermediario_id:this.formIntermediario.get('fk_intermediario_id')?.value?.id,
    fk_produccion_id:this.seleccionarProduccion.id,
    year_compra:fecha.getFullYear()
  }
  this.onSubmitEmpresa.emit(instanciaEmpresaCrear);
}

showDialog() {
    this.ref=this.dialogService.open(SeleccionarProduccionComponent, {
        header: 'Producción',
        width: '70%'
    });

}

cargarIntermediario():void{
  this.subCargarProductores=this.intermediarioService.obtenerTodos().subscribe(lugares=>{
    this.loading=false;
    this.listarIntemediarios=lugares.data;
  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

onChange(event: any) {
  if(!event.value) return
  this.formIntermediario.value.fk_intermediario_id.id=Number(event.value['id']);
}



get year_compra(){ return this.formIntermediario.get('year_compra')?.invalid && this.formIntermediario.get('year_compra')?.touched;}
get cantidad_comprada(){ return this.formIntermediario.get('cantidad_comprada')?.invalid && this.formIntermediario.get('cantidad_comprada')?.touched;}
get fk_intermediario_id(){ return this.formIntermediario.get('fk_intermediario_id')?.invalid && this.formIntermediario.get('fk_intermediario_id')?.touched;}
get fk_produccion_id(){ return this.formIntermediario.get('fk_produccion_id')?.invalid && this.formIntermediario.get('fk_produccion_id')?.touched;}


}
