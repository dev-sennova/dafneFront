import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BasicosService {

  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpoint='api/auth/usuario/store';

  private endpointUserByID='api/auth/usuario/selectusuario/';

  private endpointUserUpdate='api/auth/usuario/update';


  private endpointUsuarios='api/auth/usuario';

  private endpointUsuario='api/auth/usuario/selectusuario';

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointUserByID}${id}`);
  }

  updateUser(user: any): Observable<any> {
    return this.httpClient.put(`${this.urlBase}/${this.endpointUserUpdate}`, user);
  }

  public crearUsuario(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpoint}`, user)
  }

  public lecturaUsuarios(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointUsuarios}`);
  }

  public lecturaUsuario(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointUsuario}/${id}`);
  }

}
