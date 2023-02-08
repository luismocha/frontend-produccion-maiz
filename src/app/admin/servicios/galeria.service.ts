import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GaleriaCompletoDTO } from '../galeria/galeria';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
    private apiURL=environment.apiURL+'/api';
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
}
