/* Comentarios respecto al uso
Este servicio controla la autenticación y el almacenamiento del token en local storage, de igual forma hace uso del manejo
adecuado del mismo al momento del logout; el endpoint no se trabaja como global dado que apunta a otro servidor; la ruta se
establece en el archivo proxy para evitar el error de cors; al momento de recibir respuesta correcta redirecciona al componente
indicado; en este caso un componente en blanco llamado home.
*/

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';
import Swal from 'sweetalert2';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointGlobales='api/auth/variables_globales';

  private endpointEmail='api/auth/usuario/selectemaillogin';

  private endpointCount='api/auth/countUsuario';

  private endpoint= 'api/auth/login';

  private endpointRegister= 'api/auth/register';

  private endpointVerifyEmail= 'api/auth/verify-email';

  private endpointResendEmail= 'api/auth/resend-email';

  private endpointSeccion='api/auth/bitacora/validaravance';

  private endpointBitacora='api/auth/bitacora/store';

  private endpointCrearEmpresaFormalizacion='api/auth/formalizacion_empresa/store';

  private endpointCrearPersonaFormalizacion='api/auth/formalizacion_persona/store';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  idUsuario: any;
  globales: any;
  auxilio: any;
  uvt: any;
  minimo: any;
  idUsuarioEmprendedor: any;
  conteo: any;

  constructor(private http: HttpClient, public router: Router){}

    // Sign-in
    signIn(user: any): Observable<any> {
      return this.http.post<any>(`${this.urlBase}/${this.endpoint}`, user);
    }
  
    handleLoginResponse(response: any): void {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('nombre_usuario', response.nombre_usuario);
      localStorage.setItem('email_usuario', response.email_usuario);
      localStorage.setItem('identificador_usuario', response.id_usuario);
      localStorage.setItem('rol', response.rol);

      this.verCantidad(response.id_usuario).subscribe(
        (data) => {
          console.log("TIPO DATA: " + typeof (data));
          console.log("DATA: " + JSON.stringify(data));

          // Verifica si existe la propiedad 'users' y asigna su valor a this.idUsuarioEmprendedor
          if (data && data.users !== undefined) {
            this.conteo = data.users;
            if(this.conteo>0){
              this.idUsuarioEmprendedor=localStorage.getItem('identificador_usuario');
              localStorage.setItem('identificador_emprendedor', this.idUsuarioEmprendedor);
            }
            console.log("Item iEmprendedor: " + localStorage.getItem('identificador_emprendedor'));
          } else {
            console.log("La propiedad 'users' no existe en la respuesta.");
          }
        },

        (err) => {
          console.log(err);
        }
      );
  
      // Redireccionar según el rol
      if (response.rol == 1) {
        this.router.navigate(['administrador']);
      } else if (response.rol == 3) {
        this.router.navigate(['home']);
      }
    }
  
    resendEmail(email:string): Observable<any>{
      return this.http.post<any>(`${this.urlBase}/${this.endpointResendEmail}`,{email})
    }
    
    verifyEmail(email: string, pin: string): Observable<any> {
      return this.http.post(`${this.urlBase}/${this.endpointVerifyEmail}`, { email, pin });
    }

    public crearEmprendedor(user: any): Observable<any>{
      return this.http.post(`${this.urlBase}/${this.endpointRegister}`, user)
    }

    public verAvance(idUsuario:any, idModulo:any): Observable<any> {
      //
      console.log("Query Ver Avance: "+`${this.urlBase}/${this.endpointSeccion}?idUsuario=${idUsuario}&idModulo=${idModulo}`);
      return this.http.get(`${this.urlBase}/${this.endpointSeccion}?idUsuario=${idUsuario}&idModulo=${idModulo}`);
    }

    public verCantidad(idUsuario:any): Observable<any> {
      console.log("Query Ver Cantidad: "+`${this.urlBase}/${this.endpointCount}/${idUsuario}`);
      return this.http.get(`${this.urlBase}/${this.endpointCount}/${idUsuario}`);
    }

    public crearBitacora(user: any): Observable<any>{
      return this.http.post(`${this.urlBase}/${this.endpointBitacora}`, user)
    }

    public crearEmpresaFormalizacion(user: any): Observable<any>{
      return this.http.post(`${this.urlBase}/${this.endpointCrearEmpresaFormalizacion}`, user)
    }

    public crearPersonaFormalizacion(user: any): Observable<any>{
      return this.http.post(`${this.urlBase}/${this.endpointCrearPersonaFormalizacion}`, user)
    }

    public lecturaUsuario(email:any): Observable<any> {
      //console.log("Query: "+`${this.urlBase}/${this.endpointEmail}/${email}`);
      return this.http.get(`${this.urlBase}/${this.endpointEmail}/${email}`);
    }

    public fetchOptions(email: any): Observable<any> {
      return this.lecturaUsuario(email).pipe(
        map((data) => data.idUsuario)
      );
    }

    getToken() {
      return localStorage.getItem('access_token');
    }

    getUsuario() {
      return localStorage.getItem('nombre_usuario');
    }

    getIdUsuario() {
      return localStorage.getItem('identificador_usuario');
    }

    get isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return (authToken !== null) ? true : false;
    }

    get isLoggedOut(): boolean {
      let authToken = localStorage.getItem('access_token');
      return (authToken === null) ? true : false;
    }

    doLogout() {
      let removeToken = localStorage.removeItem('access_token');
      localStorage.clear();
      if (removeToken == null) {
        this.router.navigate(['auth']);
      }
    }

    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }

    public lecturaGlobales(): Observable<any> {
      return this.http.get(`${this.urlBase}/${this.endpointGlobales}`);
    }
}
