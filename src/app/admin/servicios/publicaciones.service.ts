import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicacionesCompletoDTO } from '../publicaciones/publicaciones';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
    private apiURL=environment.apiURL+'/api';
    token: any = localStorage.getItem('token');
    private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }


  public crear(galeria: FormData) {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        });
        return this.http.post<any>(`${this.apiURL}/galeria/`, galeria,{ headers })  //envia el contenido del form al backend (web api)
        .pipe(
        tap(() => {
            this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
        })
        );
    }
    public obtenerTodos():Observable<any>{
        return this.http.get<PublicacionesCompletoDTO[]>(`${this.apiURL}/publicaciones/`);
    }
    public eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiURL}/publicaciones/${id}`).pipe(
          tap(() => {
            this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
          })
        );
    }
}
