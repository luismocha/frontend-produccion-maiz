import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { LitarProduccionesDTO, ProduccionDTO } from 'src/app/admin/produccion/produccion.model';
import { ProduccionService } from 'src/app/admin/servicios/produccion.service';
import { ProductorService } from 'src/app/admin/servicios/productor.service';

@Component({
  //providers: [MessageService],
  selector: 'app-seleccionar-produccion',
  templateUrl: './seleccionar-produccion.component.html',
  styleUrls: ['./seleccionar-produccion.component.scss']
})
export class SeleccionarProduccionComponent implements OnInit {
    listarProducciones:LitarProduccionesDTO[] = [];
    selectedCustomer!: ProduccionDTO;
    subCargarProducciones!:Subscription;
    loading:boolean=false;
  constructor( private produccionService:ProduccionService,
                     public ref: DynamicDialogRef,
                    private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarProducciones();
  }
    btnSeleccionarroductor(produccion:ProduccionDTO){
        this.produccionService.produccionSeleccionado(produccion).subscribe(()=>{

            this.messageService.add({severity:'success', detail: 'Produccion seleccionada correctamente'});
            this.cerrarModal();
        },error=>{
            console.log(error);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al seleccionar produccion'});
        });
    }
    cargarProducciones():void{
        this.subCargarProducciones=this.produccionService.obtenerTodos().subscribe(productores=>{
          this.loading=false;
          this.listarProducciones=productores.data;
        },error=>{
            console.log(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
        });

    }
    cerrarModal(){
        this.ref.close();
    }
}
