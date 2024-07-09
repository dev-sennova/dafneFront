import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrientadorService {

  constructor(private httpClient: HttpClient, public router: Router){}

  private urlBase=GlobalConstants.apiURL;
  
  private endPointgetHobbiesUsuariosGestionados ='api/auth/usuario-hobbies';

  private endPointAceptarHobby = 'api/auth/actualizar-hobby/';

  private endPointEliminarHobby = 'api/auth/eliminar-hobby/';

  private endPointgetSuenosUsuariosGestionados ='api/auth/usuario-suenos';

  private endPointAceptarSueno = 'api/auth/actualizar-sueno/';

  private endPointEliminarSueno = 'api/auth/eliminar-sueno/';

  private endPointgetIdeasUsuariosGestionados ='api/auth/usuario-ideas';

  private endPointAceptarIdea = 'api/auth/actualizar-idea/';

  private endPointEliminarIdea = 'api/auth/eliminar-idea/';

  private endPointgetCriteriosUsuariosGestionados ='api/auth/usuario-criterios';

  private endPointAceptarCriterio = 'api/auth/actualizar-criterio/';

  private endPointEliminarCriterio = 'api/auth/eliminar-criterio/';

  private endPointObtenerGestorUsuario = 'api/auth/obtener-gestor';


  public HobbiesPendientes(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endPointgetHobbiesUsuariosGestionados}`);
  }

  public GestorDeUsuario(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endPointObtenerGestorUsuario}`);
  }

  public AceptarHobby(id: number): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endPointAceptarHobby}${id}`,{})
  }

  public EliminarHobby(id: number): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endPointEliminarHobby}${id}`,{})
  }

  public SuenosPendientes(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endPointgetSuenosUsuariosGestionados}`);
  }

  public AceptarSueno(id: number): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endPointAceptarSueno}${id}`,{})
  }

  public EliminarSueno(id: number): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endPointEliminarSueno}${id}`,{})
  }

  public IdeasPendientes(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endPointgetIdeasUsuariosGestionados}`);
  }

  public AceptarIdeas(id: number): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endPointAceptarIdea}${id}`,{})
  }

  public EliminarIdeas(id: number): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endPointEliminarIdea}${id}`,{})
  }

  public CriteriosPendientes(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endPointgetCriteriosUsuariosGestionados}`);
  }

  public AceptarCriterio(id: number): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endPointAceptarCriterio}${id}`,{})
  }

  public EliminarCriterio(id: number): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endPointEliminarCriterio}${id}`,{})
  }

}
