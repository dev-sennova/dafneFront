import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasService } from 'src/app/services/canvas.service';
import { CriteriosService } from 'src/app/services/criterios.service';
import { DofaService } from 'src/app/services/dofa.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { ResumenempresaService } from 'src/app/services/resumenempresa.service';
import { SimulacionesService } from 'src/app/services/simulaciones.service';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { FormalizacionService } from 'src/app/services/formalizacion.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-avance',
  templateUrl: './ver-avance.component.html',
  styleUrls: ['./ver-avance.component.css']
})
export class VerAvanceComponent implements OnInit {
  idUsuario: string | null = null;
  currentSection: string = 'seccion1';
  nombre: any;
  tipodocumento: any;
  documento: any;
  direccion: any;
  telefono: any;
  ciudad: any;
  email: any;
  sexo: any;
  error: boolean = false;

  arrayEmpresa: any[] = [];
  idEmpresa: any;
  nombreIdea: any;
  nombreEmpresa: any;
  mision: any;
  vision: any;
  slogan: any;
  logo: any;
  arrayExperiencia: any[] = [];
  arrayEscolaridad: any[] = [];
  arrayOcupacion: any[] = [];
  experiencia: any;
  actividades: any;
  areaExperiencia: any;
  escolaridad: any;
  nivelescolaridad: any;
  areaconocimiento: any;
  ocupacion: any;
  lugar: any;
  arrayUsuario: any;
  area: any;
  arrayHobbies: any[] = [];
  arraySuenos: any[] = [];
  arrayIdeas: any[] = [];
  arrayCriterios: any[] = [];
  hobby: any;
  sueno: any;
  dofaData: any[] = [];
  estrategiaData: any[] = [];
  canvasData: any[] = [];
  arrayResumenLegal: any[]=[];
  arrayResumenTributario:any[]=[];
  arrayValores: any[]=[];
  arrayFormalizacionEmpresa: any[]=[];
  arrayFormalizacionPersona: any[]=[];
  isLoading: boolean = true; 
  isLoadingseccion: boolean = false;


  constructor(
    public simulacionService: SimulacionesService,
    public canvaService: CanvasService,
    public dofaService: DofaService,
    public criteriosService: CriteriosService,
    public evaluacionService: EvaluacionService,
    public router: Router,
    private resumenempresaService: ResumenempresaService,
    private sanitizer: DomSanitizer,
    private formalizacionService:FormalizacionService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  async ngOnInit() {
    this.idUsuario = sessionStorage.getItem('emprendedorId');
    if (this.idUsuario) {
      await this.loadDataBySection(this.currentSection);
      this.cargarDatosUsuario();
      this.isLoading = false; 

    } else {
      this.error = true;
    }
  }

  async selectSection(section: string) {
    this.currentSection = section;
    await this.loadDataBySection(section);
  }

  async loadDataBySection(section: string) {

    switch (section) {
      case 'seccion1':
        await this.loadSection1Data();
        break;
      case 'seccion2':
        this.isLoadingseccion = false; 

        await this.loadSection2Data();
        break;
      case 'seccion3':
        this.isLoadingseccion = false; 

        await this.loadSection3Data();
        break;
      default:
        break;
    }

  }

  async loadSection1Data() {
    if (this.arrayEmpresa.length === 0) {
      await Promise.all([
        this.cargarDatosEmpresa(),
        this.cargarDatosEscolaridad(),
        this.cargarDatosExperiencia(),
        this.cargarDatosOcupacion(),
        this.cargarHobbiesUsuario(),
        this.cargarSuenosUsuario(),
        this.cargarCriteriosPropio(),
        this.obtenerIdeasPropio(),
        this.cargarDatosDofa(),
        this.cargarDatosEstrategia(),
        this.cargarDatosCanvas(),
      ]);

    }
  }

  async loadSection2Data() {
    if (this.arrayResumenLegal.length === 0) {
      await Promise.all([
        this.cargarResumenLegal(),
        this.cargarResumenTributario(),
        this.cargarDatosSimulacion(),
      ]);
    }
  }

  async loadSection3Data() {
    if (this.arrayFormalizacionEmpresa.length === 0 && this.arrayFormalizacionPersona.length === 0) {
      await Promise.all([
        this.cargarDatosFormalizacionEmpresa(),
        this.cargarDatosFormalizacionPersona(),
      ]);

    }
  }

  async cargarCriteriosPropio(): Promise<void> {
    try {
      const data = await this.criteriosService.getCriteriosPropio(this.idUsuario).toPromise();
      this.arrayCriterios = data.criterios;
      console.log("Data Prop:", data);
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  async obtenerIdeasPropio(): Promise<void> {
    try {
      const data = await this.evaluacionService.getIdeasPropio(this.idUsuario).toPromise();
      this.arrayIdeas = data.ideas;
      console.log("Data Prop:", data);
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  async cargarDatosUsuario(): Promise<void> {
    try {
      const data = await this.resumenempresaService.getUsuario(this.idUsuario).toPromise();
      if (data.estado == 'Error') {
        this.error = true;
      } else {
        const usuario = data.user;
        const ciudad = data.ciudad; // 'data.user' es un objeto, no un arreglo
        this.nombre = usuario.nombre;
        this.tipodocumento = usuario.tipodocumento;
        this.documento = usuario.documento;
        this.telefono = usuario.telefono;
        this.ciudad = ciudad.ciudad;
        this.email = usuario.email;
        console.log("Actual nombre: " + this.nombre);
        console.log("Actual tipodocumento: " + this.tipodocumento);
        console.log("Actual documento: " + this.documento);
        console.log("Actual telefono: " + this.telefono);
        console.log("Actual ciudad: " + this.ciudad);
        console.log("Actual email: " + this.email);
      }
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
      this.error = true;
    }
  }

  async cargarDatosEmpresa(): Promise<void> {
    try {
      const data = await this.resumenempresaService.getEmpresaPropio(this.idUsuario).toPromise();
      this.arrayEmpresa = data.resumen_empresa;
      for (let dato in this.arrayEmpresa) {
        this.idEmpresa = this.arrayEmpresa[dato].id;
        this.nombreIdea = this.arrayEmpresa[dato].nombreIdea;
        this.nombreEmpresa = this.arrayEmpresa[dato].nombreEmpresa;
        this.mision = this.arrayEmpresa[dato].mision;
        this.vision = this.arrayEmpresa[dato].vision;
        this.slogan = this.arrayEmpresa[dato].slogan;
        this.logo = this.arrayEmpresa[dato].logo;
      }
      console.log("Actual nombreIdea: " + this.nombreIdea);
      console.log("Actual nombreEmpresa: " + this.nombreEmpresa);
      console.log("Actual mision: " + this.mision);
      console.log("Actual vision: " + this.vision);
      console.log("Actual slogan: " + this.slogan);
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  async cargarDatosExperiencia(): Promise<void> {
    try {
      const data = await this.resumenempresaService.getExperienciaPropio(this.idUsuario).toPromise();
      this.arrayExperiencia = data.resumen_experiencia;
      for (let dato in this.arrayExperiencia) {
        this.experiencia = this.arrayExperiencia[dato].experiencia;
        this.actividades = this.arrayExperiencia[dato].actividades;
        this.areaExperiencia = this.arrayExperiencia[dato].area;
      }
      console.log("Actual experiencia: " + this.experiencia);
      console.log("Actual actividades: " + this.actividades);
      console.log("Actual areaExperiencia: " + this.areaExperiencia);
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  async cargarDatosEscolaridad(): Promise<void> {
    try {
      const data = await this.resumenempresaService.getEscolaridadPropio(this.idUsuario).toPromise();
      this.arrayEscolaridad = data.resumen_escolaridad;
      for (let dato in this.arrayEscolaridad) {
        this.escolaridad = this.arrayEscolaridad[dato].escolaridad;
        this.nivelescolaridad = this.arrayEscolaridad[dato].nivelescolaridad;
        this.areaconocimiento = this.arrayEscolaridad[dato].areaconocimiento;
      }
      console.log("Actual escolaridad: " + this.escolaridad);
      console.log("Actual nivelescolaridad: " + this.nivelescolaridad);
      console.log("Actual areaconocimiento: " + this.areaconocimiento);
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  async cargarDatosOcupacion(): Promise<void> {
    try {
      const data = await this.resumenempresaService.getOcupacionPropio(this.idUsuario).toPromise();
      this.arrayOcupacion = data.resumen_ocupacion;
      for (let dato in this.arrayOcupacion) {
        this.ocupacion = this.arrayOcupacion[dato].ocupacion;
        this.lugar = this.arrayOcupacion[dato].lugar;
        this.area = this.arrayOcupacion[dato].area;
      }
      console.log("Actual ocupacion: " + this.ocupacion);
      console.log("Actual lugar: " + this.lugar);
      console.log("Actual area: " + this.area);
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  async cargarHobbiesUsuario(): Promise<void> {
    try {
      const data = await this.resumenempresaService.getHobbies(this.idUsuario).toPromise();
      this.arrayHobbies = data.hobbies;
      for (let dato in this.arrayHobbies) {
        this.hobby = this.arrayHobbies[dato].hobby;
        console.log("Actual hobby: " + this.hobby);
      }
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  async cargarSuenosUsuario(): Promise<void> {
    try {
      const data = await this.resumenempresaService.getSuenos(this.idUsuario).toPromise();
      this.arraySuenos = data.suenos;
      for (let dato in this.arraySuenos) {
        this.sueno = this.arraySuenos[dato].sueno;
        console.log("Actual sueno: " + this.sueno);
      }
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  async cargarDatosDofa(): Promise<void> {
    try {
      const data = await this.dofaService.lecturaDofaPropio(this.idUsuario).toPromise();
      this.dofaData = data.matriz_dofa;
      console.log("Datos del DOFA cargados:", this.dofaData);
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  openDofaPopup() {
    const formatItem = (item: string) => item ? item : '';
    
    const dofaHtml = `
      <div style="text-align: left;">
        <p>El usuario ha empezado a llenar la matriz DOFA</p>
        <div style="background-color: #FADBD8; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <strong>D</strong>
          <ul>
            <li>${formatItem(this.dofaData[0]?.debilidades1)}</li>
            <li>${formatItem(this.dofaData[0]?.debilidades2)}</li>
            <li>${formatItem(this.dofaData[0]?.debilidades3)}</li>
            <li>${formatItem(this.dofaData[0]?.debilidades4)}</li>
          </ul>
        </div>
        <div style="background-color: #D1F2EB; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <strong>O</strong>
          <ul>
            <li>${formatItem(this.dofaData[0]?.oportunidades1)}</li>
            <li>${formatItem(this.dofaData[0]?.oportunidades2)}</li>
            <li>${formatItem(this.dofaData[0]?.oportunidades3)}</li>
            <li>${formatItem(this.dofaData[0]?.oportunidades4)}</li>
          </ul>
        </div>
        <div style="background-color: #D7BDE2; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <strong>F</strong>
          <ul>
            <li>${formatItem(this.dofaData[0]?.fortalezas1)}</li>
            <li>${formatItem(this.dofaData[0]?.fortalezas2)}</li>
            <li>${formatItem(this.dofaData[0]?.fortalezas3)}</li>
            <li>${formatItem(this.dofaData[0]?.fortalezas4)}</li>
          </ul>
        </div>
        <div style="background-color: #FDEBD0; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <strong>A</strong>
          <ul>
            <li>${formatItem(this.dofaData[0]?.amenazas1)}</li>
            <li>${formatItem(this.dofaData[0]?.amenazas2)}</li>
            <li>${formatItem(this.dofaData[0]?.amenazas3)}</li>
            <li>${formatItem(this.dofaData[0]?.amenazas4)}</li>
          </ul>
        </div>
      </div>
    `;
  
    Swal.fire({
      title: 'Matriz DOFA',
      html: dofaHtml,
      showCancelButton: false,
      confirmButtonText: 'Cerrar'
    });
  }
  
  

  async cargarDatosEstrategia(): Promise<void> {
    try {
      const data = await this.dofaService.lecturaEstrategiasPropio(this.idUsuario).toPromise();
      this.estrategiaData = data.estrategias;
      console.log("Datos de estrategia cargados:", this.estrategiaData);
    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  openEstrategiasPopup() {
    const formatItem = (item: string) => item ? item : '';
  
    const estrategiasHtml = this.estrategiaData.map(item => `
      <div style="text-align: left;">
        <div style="background-color: #FADBD8; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <strong>Fortalezas vs Oportunidades</strong>
          <ul>
            <li>Estrategia: ${formatItem(item.estrategiaFO)}</li>
            <li>Acción: ${formatItem(item.accionFO)}</li>
          </ul>
        </div>
        <div style="background-color: #D1F2EB; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <strong>Debilidades vs Oportunidades</strong>
          <ul>
            <li>Estrategia: ${formatItem(item.estrategiaDO)}</li>
            <li>Acción: ${formatItem(item.accionDO)}</li>
          </ul>
        </div>
        <div style="background-color: #D7BDE2; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <strong>Fortalezas vs Amenazas</strong>
          <ul>
            <li>Estrategia: ${formatItem(item.estrategiaFA)}</li>
            <li>Acción: ${formatItem(item.accionFA)}</li>
          </ul>
        </div>
        <div style="background-color: #FDEBD0; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <strong>Debilidades vs Amenazas</strong>
          <ul>
            <li>Estrategia: ${formatItem(item.estrategiaDA)}</li>
            <li>Acción: ${formatItem(item.accionDA)}</li>
          </ul>
        </div>
      </div>
    `).join('');
  
    Swal.fire({
      title: 'Estrategias',
      html: estrategiasHtml,
      showCancelButton: false,
      confirmButtonText: 'Cerrar'
    });
  }  

  async cargarDatosCanvas(): Promise<void> {
    try {
      const data = await this.canvaService.lecturaCanvasPropio(this.idUsuario).toPromise();
      this.canvasData = data.modelo_canvas;
      console.log("Datos del Canvas cargados:", this.canvasData);
      this.isLoadingseccion = true; 

    } catch (error) {
      this.errorHandlerService.handleError(error as HttpErrorResponse);
    }
  }

  openCanvasPopup() {
    Swal.fire({
      title: 'Detalles del Modelo Canvas',
      html: `
        <div class="canvas-swal-container">
          <div class="canvas-section" style="background-color: #FADBD8;">
            <p><strong>1. Proposición de valor</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.proposicion || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
          <div class="canvas-section" style="background-color: #D1F2EB;">
            <p><strong>2. Segmento de clientes</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.segmento || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
          <div class="canvas-section" style="background-color: #D7BDE2;">
            <p><strong>3. Relaciones con el cliente</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.relaciones || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
          <div class="canvas-section" style="background-color: #FDEBD0;">
            <p><strong>4. Canales</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.canales || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
          <div class="canvas-section" style="background-color: #FADBD8;">
            <p><strong>5. Actividades claves</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.actividades || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
          <div class="canvas-section" style="background-color: #D1F2EB;">
            <p><strong>6. Recursos claves</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.recursos || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
          <div class="canvas-section" style="background-color: #D7BDE2;">
            <p><strong>7. Aliados y personas claves</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.aliados || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
          <div class="canvas-section" style="background-color: #FDEBD0;">
            <p><strong>8. Flujos de ingresos</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.flujos || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
          <div class="canvas-section" style="background-color: #FADBD8;">
            <p><strong>9. Estructura de costos</strong></p>
            <p>${this.canvasData.length > 0 ? (this.canvasData[0]?.estructura || '(Aun no se registra)') : '(Aun no se registra)'}</p>
          </div>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        container: 'canvas-swal-container',
        htmlContainer: 'canvas-swal-html-container'
      }
    });
  }
  
  
  

  isEmptyDofaData(): boolean {
    if (!this.dofaData || this.dofaData.length === 0) {
      return true;
    }
    const dofaItem = this.dofaData[0];
    return !(dofaItem.debilidades1 || dofaItem.debilidades2 || dofaItem.debilidades3 || dofaItem.debilidades4 ||
      dofaItem.oportunidades1 || dofaItem.oportunidades2 || dofaItem.oportunidades3 || dofaItem.oportunidades4 ||
      dofaItem.fortalezas1 || dofaItem.fortalezas2 || dofaItem.fortalezas3 || dofaItem.fortalezas4 ||
      dofaItem.amenazas1 || dofaItem.amenazas2 || dofaItem.amenazas3 || dofaItem.amenazas4 ||
      dofaItem.avancea === 0 || dofaItem.avanced === 0 || dofaItem.avancef === 0 || dofaItem.avanceo === 0);
  }

  isEmptyEstrategiaData(): boolean {
    if (!this.estrategiaData || this.estrategiaData.length === 0) {
      return true;
    }
    return this.estrategiaData.every(item =>
      !(item.accionDA || item.accionDO || item.accionFA || item.accionFO ||
        item.avanceDA > 0 || item.avanceDO > 0 || item.avanceFA > 0 || item.avanceFO > 0 ||
        item.estrategiaDA || item.estrategiaDO || item.estrategiaFA || item.estrategiaFO)
    );
  }

  isEmptyCanvasData(): boolean {
    if (!this.canvasData || this.canvasData.length === 0) {
      return true;
    }
    const canvasItem = this.canvasData[0];
    return !(canvasItem.proposicion || canvasItem.segmento || canvasItem.relaciones ||
      canvasItem.canales || canvasItem.actividades || canvasItem.recursos ||
      canvasItem.aliados || canvasItem.flujos || canvasItem.estructura ||
      canvasItem.avancepro > 0 || canvasItem.avanceseg > 0 || canvasItem.avancerel > 0 ||
      canvasItem.avancecan > 0 || canvasItem.avanceact > 0 || canvasItem.avancerec > 0 ||
      canvasItem.avanceali > 0 || canvasItem.avanceflu > 0 || canvasItem.avanceest > 0);
  }

  cargarResumenLegal(){
    this.simulacionService.lecturaResumenLegal(this.idUsuario).subscribe(
      (data) => {
        this.arrayResumenLegal=data.avances_legal;
        console.log("Legal",this.arrayResumenLegal)
        
      },
      (err) => {
        this.errorHandlerService.handleError(err as HttpErrorResponse);
      }
    );
  }

  cargarResumenTributario(){
    this.simulacionService.lecturaResumenTributarioEmpresa(this.idUsuario).subscribe(
      (data) => {
        //
        this.arrayResumenTributario=data.avances_tributario;
        console.log("ARRAY RESUMEN LEGAL: "+JSON.stringify(this.arrayResumenTributario));
        
      },
      (err) => {
        this.errorHandlerService.handleError(err as HttpErrorResponse);
      }
    );
  }

  cargarDatosSimulacion(){
    this.simulacionService.lecturaConsolidadoEmpresa(this.idUsuario).subscribe(
      (data) => {
        //
        this.arrayValores=data.consolidado_simulacion_financiera;
        console.log(this.arrayValores);
        this.isLoadingseccion = true; 

        
      },
      (err) => {
        this.errorHandlerService.handleError(err as HttpErrorResponse);
      }
    );
  }

  cargarDatosFormalizacionEmpresa(){
    this.formalizacionService.lecturaResumenEmpresa(this.idUsuario).subscribe(
      (data) => {
        //
        this.arrayFormalizacionEmpresa=data.formalizacion_empresa;
        console.log(this.arrayFormalizacionEmpresa);

        
      },
      (err) => {
        this.errorHandlerService.handleError(err as HttpErrorResponse);
      }
    );
  }

  cargarDatosFormalizacionPersona(){
    this.formalizacionService.lecturaResumenPersona(this.idUsuario).subscribe(
      (data) => {
        //
        this.arrayFormalizacionPersona=data.formalizacion_persona;
        console.log (this.arrayFormalizacionPersona);
        this.isLoadingseccion = true; 

        
      },
      (err) => {
        this.errorHandlerService.handleError(err as HttpErrorResponse);
      }
    );
  }


  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  homeRoute(): void {
    this.router.navigate(['verlistado']);
  }
}
