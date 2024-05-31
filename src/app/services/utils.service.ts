import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  departamentoId: number = 0;

  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointCiudades = 'api/auth/ciudad/filterByDepartamento/';

  private endpointDepartamentos='api/auth/departamento';

  private endpointCiuu='api/auth/codigo_ciiu';

  private endpointCiuuUnico='codigo_ciiu/selectcodigo_ciiu';

  private endpointUserEmail='api/auth/usuario/selectemail';

  private endpointCrearPerfil='api/auth/perfiles_empresa/store';

  private endpointLeerPerfiles='api/auth/perfiles_empresa/selectperfiles_propios';

  private endpointCrearEmpleado='api/auth/empleados_empresa/store';

  private endpointLeerEmpleados='api/auth/empleados_empresa/selectempleados_propios';

  private endpointCrearMaquinaria='api/auth/maquinaria/store';

  private endpointLeerMaquinaria='api/auth/maquinaria/selectmaquinaria_propia';

  private endpointCrearCif='api/auth/cif/store';

  private endpointLeerCif='api/auth/cif/selectcif_propio';

  private endpointCrearFinanciacion='api/auth/financiacion/store';

  private endpointLeerFinanciacion='api/auth/financiacion/selectfinanciacion_propio';

  private endpointCrearGastos='api/auth/gastos/store';

  private endpointLeerGastos='api/auth/gastos/selectgastos_propio';

  private endpointCrearPrecioventa='api/auth/precio_venta/store';

  private endpointLeerPrecioventa='api/auth/precio_venta/selectprecio_venta_propio';

  private endpointCrearIngresosadicionales='api/auth/ingresos_adicionales/store';

  private endpointLeerIngresosadicionales='api/auth/ingresos_adicionales/selectingresos_adicionales_propio';

  private endpointCrearGastosadicionales='api/auth/gastos_adicionales/store';

  private endpointLeerGastosadicionales='api/auth/gastos_adicionales/selectgastos_adicionales_propio';

  private endpointCrearPuntoequilibrio='api/auth/punto_equilibrio/store';

  private endpointLeerPuntoequilibrio='api/auth/punto_equilibrio/selectpunto_equilibrio_propio';

  private endpointCrearProyeccionmensual='api/auth/proyeccion_mensual/store';

  private endpointLeerProyeccionmensual='api/auth/proyeccion_mensual/selectproyeccion_mensual_propio';

  private endpointValidarPersona='api/auth/avances_legal/validarPersona';

  private endpointCrearNomina='api/auth/nomina_empleados_simula/store';

  private endpointLeerNomina='api/auth/nomina_empleados_simula/selectnomina_empleados_simula_propio';

  private endpointCrearHojaCostos='api/auth/hoja_costos_simula/store';

  private endpointLeerHojaCostos='api/auth/hoja_costos_simula/selecthoja_costos_simula_propio';

  private endpointCrearHojaGastos='api/auth/hoja_gastos_simula/store';

  private endpointLeerHojaGastos='api/auth/hoja_gastos_simula/selecthoja_gastos_simula_propio';

  private endpointCrearHojaResultados='api/auth/estado_resultados_simula/store';

  private endpointLeerHojaResultados='api/auth/estado_resultados_simula/selectestado_resultados_simula_propio';

  private endpointLeerImpuestos='api/auth/impuesto';

  private endpointConsolidadoHojaCostos='api/auth/hoja_costos_simula/consolidado';

  private endpointConsolidadoHojaCostosUnidad='api/auth/hoja_costos_simula/consolidadoUnidad';

  private endpointConsolidadoHojaGastos='api/auth/hoja_gastos_simula/consolidado';


  constructor(private httpClient: HttpClient, private loginService:LoginService) { }

  public lecturaCiudades(departamentoId: number): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCiudades}${departamentoId}`);
  }

  public lecturaDepartamentos(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointDepartamentos}`);
  }

  public lecturaImpuestos(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerImpuestos}`);
  }

  public lecturaCiuu(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCiuu}`);
  }

  public lecturaCiuuId(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCiuuUnico}/${id}`);
  }

  public lecturaUsuarioEmail(idUser:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointUserEmail}/${idUser}`);
  }

  public validarPersona(idUser:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointValidarPersona}/${idUser}`);
  }

  public consolidadoHojaCostos(idUser:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointConsolidadoHojaCostos}/${idUser}`);
  }

  public consolidadoHojaCostosUnidad(idUser:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointConsolidadoHojaCostosUnidad}/${idUser}`);
  }

  public consolidadoHojaGastos(idUser:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointConsolidadoHojaGastos}/${idUser}`);
  }

  public crearPerfil(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearPerfil}`, data);
  }

  public lecturaPerfiles(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerPerfiles}/${idUsuario}`);
  }

  public crearEmpleado(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearEmpleado}`, data);
  }

  public lecturaEmpleados(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerEmpleados}/${idUsuario}`);
  }

  public crearMaquinaria(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearMaquinaria}`, data);
  }

  public lecturaMaquinaria(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerMaquinaria}/${idUsuario}`);
  }

  public crearCif(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearCif}`, data);
  }

  public lecturaCif(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerCif}/${idUsuario}`);
  }

  public crearFinanciacion(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearFinanciacion}`, data);
  }

  public lecturaFinanciacion(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerFinanciacion}/${idUsuario}`);
  }
  public crearGastos(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearGastos}`, data);
  }

  public lecturaGastos(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerGastos}/${idUsuario}`);
  }

  public crearPrecioventa(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearPrecioventa}`, data);
  }

  public lecturaPrecioventa(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerPrecioventa}/${idUsuario}`);
  }

  public crearIngresosadicionales(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearIngresosadicionales}`, data);
  }

  public lecturaIngresosadicionales(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerIngresosadicionales}/${idUsuario}`);
  }

  public crearGastosadicionales(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearGastosadicionales}`, data);
  }

  public lecturaGastosadicionales(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerGastosadicionales}/${idUsuario}`);
  }
  public crearPuntoequilibrio(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearPuntoequilibrio}`, data);
  }

  public lecturaPuntoequilibrio(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerPuntoequilibrio}/${idUsuario}`);
  }

  public crearNomina(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearNomina}`, data);
  }

  public lecturaNomina(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerNomina}/${idUsuario}`);
  }

  public crearHojaCostos(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearHojaCostos}`, data);
  }

  public lecturaHojaCostos(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerHojaCostos}/${idUsuario}`);
  }

  public crearHojaGastos(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearHojaGastos}`, data);
  }

  public lecturaHojaGastos(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerHojaGastos}/${idUsuario}`);
  }

  public crearEstadoResultados(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearHojaResultados}`, data);
  }

  public lecturaEstadoResultados(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerHojaResultados}/${idUsuario}`);
  }

  public crearProyeccionmensual(data: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCrearProyeccionmensual}`, data);
  }

  public lecturaProyeccionmensual(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerProyeccionmensual}/${idUsuario}`);
  }

}
