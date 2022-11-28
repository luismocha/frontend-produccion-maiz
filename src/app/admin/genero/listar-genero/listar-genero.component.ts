import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneroModel } from 'src/app/models/genero.model';
import { GeneroService } from '../../servicios/genero.service';

@Component({
    selector: 'app-listar-genero',
    templateUrl: './listar-genero.component.html',
    styleUrls: ['./listar-genero.component.scss'],
})
export class ListarGeneroComponent implements OnInit {
    /*VARIABLES DE P-TABLE*/
    selectedCustomer2!: GeneroModel;
    loading: boolean = true;

    /*VARIABLE PARA ABRIR Y CERRAR MODAL */
    displayBasic!: boolean;

    generoFormGroup: FormGroup;

    idObtainForUpdate: string = '';

    objGeneroModel: GeneroModel[] = [];

    constructor(
        public generoService: GeneroService,
        private formBuilder: FormBuilder
    ) {
        this.generoFormGroup = this.formBuilder.group({
            genero: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.cargarGeneros();
    }

    crearGenero() {
        if (this.generoFormGroup.invalid) {
            return;
        }

        if (this.idObtainForUpdate == '') {
            let fechaActual = new Date();

            const nuevoGenero = new GeneroModel();

            nuevoGenero.genero = this.generoFormGroup.value.genero;
            nuevoGenero.estado = 1;
            nuevoGenero.fecha = fechaActual;

            //console.log('new gener ' + nuevoGenero);
            this.generoService.crearGenero(nuevoGenero).subscribe((resp) => {
                if (resp) {
                    this.closeDialog()
                    this.cargarGeneros();
                }
            });
        } else {
            console.log('user changed: ' + this.generoFormGroup.value.genero);
            this.editarGenero();
        }
    }

    eliminarGenero(id: string) {
        this.generoService.eliminarGenero(id).subscribe(() => {
            this.cargarGeneros();
        });
    }

    cargarGeneros() {
        this.generoService.cargarGeneros().subscribe((genero) => {
            this.objGeneroModel = genero;
            //console.log(this.objGeneroModel);
            this.loading = false;
        });
    }

    cargarGenero(idGenero: string) {
        this.generoService
            .cargarGenero(idGenero)
            .subscribe((generoResponse) => {
                this.loading = false;
                const { id, genero, estado, fecha } = generoResponse;
                this.idObtainForUpdate = idGenero;
                this.generoFormGroup.setValue({ genero });
                this.showBasicDialog();
            });
    }

    editarGenero() {
        let objGenero = this.generoFormGroup.value;
        objGenero.id = this.idObtainForUpdate;
        this.generoService.editarGenero(objGenero).subscribe(
            () => {
                this.cargarGeneros();
                this.closeDialog();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onResetForm() {
        this.generoFormGroup.reset();
    }

    closeDialog() {
        this.onResetForm();
        this.idObtainForUpdate = '';
        this.displayBasic = false;
    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    get genero() {
        return this.generoFormGroup.get('genero');
    }
    get estado() {
        return this.generoFormGroup.get('estado');
    }
    get fecha() {
        return this.generoFormGroup.get('fecha');
    }
}
