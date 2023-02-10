import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GaleriaCompletoDTO } from '../galeria/galeria';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
    private apiURL=environment.apiURL+'/api';
    private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }
  token: any = localStorage.getItem('token');

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':`Token ${this.token}`
        })
    };
    public obtenerTodos():Observable<any>{
        return this.http.get<GaleriaCompletoDTO[]>(`${this.apiURL}/galeria/`, this.httpOptions);
    }
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
    //observables
    get refresh$(){
        return this._refresh$;
    }
}
