import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/core/config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { GeneroModel } from 'src/app/models/genero.model';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(public http: HttpClient) { }


  crearGenero(genero: GeneroModel) {

    let url = URL_SERVICIOS + '/generos';

    //SI NO EXISTE EL ID, CREA UNA NUEVA VISITA
    return this.http.post(url, genero)
      .pipe(map((resp: any) => {
          return resp;
        }),
        catchError((err) => {
          return err;
        })
      );
  }

  cargarGeneros() {
    let url = URL_SERVICIOS + '/generos';
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  cargarGenero(id: string) {
    let url = URL_SERVICIOS + '/generos/'+id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }


  editarGenero(genero: GeneroModel) {
    let url = URL_SERVICIOS + '/generos/' + genero.id;

    return this.http.put(url, genero)
      .pipe(map((resp: any) => resp.data));
  }

  eliminarGenero(id: string) {
    let url = URL_SERVICIOS + '/generos/'+id;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
