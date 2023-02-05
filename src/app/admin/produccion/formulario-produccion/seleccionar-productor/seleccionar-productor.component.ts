import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { LitarProductoresDTO, ProductorDTO } from 'src/app/admin/productores/productor.model';
import { ProductorService } from 'src/app/admin/servicios/productor.service';

@Component({
  selector: 'app-seleccionar-productor',
  templateUrl: './seleccionar-productor.component.html',
  styleUrls: ['./seleccionar-productor.component.scss']
})
export class SeleccionarProductorComponent implements OnInit {
    @Input() modoLectura!:boolean;
    subCargarProductores!:Subscription;
    loading:boolean=false;
    selectedCustomer!: ProductorDTO;
    productorSeleccionado: boolean = false;
    productorSelected!: number;
    listarProductores:LitarProductoresDTO[] = [];
  constructor(   private productorService:ProductorService,
                public ref: DynamicDialogRef,
                 private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarProductores();
  }
  cargarProductores():void{
    //this.listaPresentarDatosProductor = []
    this.subCargarProductores=this.productorService.obtenerTodos().subscribe(productores=>{
      //console.log(productores.data);
      this.loading=false;
      this.listarProductores=productores.data;
      //this.combinarCantonProductores()
    },error=>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
    });

  }

    btnSeleccionarroductor(productor:ProductorDTO){
        this.productorService.productorSeleccionado(productor).subscribe(()=>{
            this.selectedCustomer=productor;
            this.messageService.add({severity:'success', detail: 'Productor seleccionado correctamente'});
            this.cerrarModal();
        },error=>{
            console.log(error);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al seleccionar productor'});
        });
    }
    cerrarModal(){
        this.ref.close();
    }

}
