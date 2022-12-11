import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Administrador',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    {
                        label: 'Productores',
                        items: [
                            {
                                label: 'Administrar Productores', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/productores']
                            }
                        ]
                    },
                    {
                        label: 'Empresas',
                        items: [
                            {
                                label: 'Administrar Empresas', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/empresa']
                            }
                        ]
                    },
                    {
                        label: 'Cantones',
                        items: [
                            {
                                label: 'Administrar Cantón', icon: 'pi pi-fw pi-bookmark',
                                 routerLink: ['/admin/canton']
                            },
                        ]
                    },
                    {
                        label: 'Parroquias',
                        items: [
                            {
                                label: 'Administrar Parroquia', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/parroquia']
                            },
                        ]
                    },
                    {
                        label: 'Produccion',
                        items: [
                            {
                                label: 'Administrar Producto', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/produccion']
                            }
                        ]
                    },
                    {
                        label: 'Costo de Pro',
                        items: [
                            {
                                label: 'Administrar Costos de Producción', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/costoproduccion']
                            }
                        ]
                    },
                    {
                        label: 'Rentabilidad',
                        items: [
                            {
                                label: 'Administrar Rentabilidad', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/rentabilidad']
                            }
                        ]
                    },
                ]
            },
        ];
    }
}
