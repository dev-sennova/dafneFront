import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BasicosComponent } from './components/basicos/basicos.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { SuenosComponent } from './components/suenos/suenos.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { SeleccionComponent } from './components/seleccion/seleccion.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ValorhobbiesComponent } from './components/valorhobbies/valorhobbies.component';
import { ValorsuenosComponent } from './components/valorsuenos/valorsuenos.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { ValorcriteriosComponent } from './components/valorcriterios/valorcriterios.component';
import { MatrizComponent } from './components/matriz/matriz.component';
import { AmenazasComponent } from './components/amenazas/amenazas.component';
import { MatrizdofaComponent } from './components/matrizdofa/matrizdofa.component';
import { DebilidadesComponent } from './components/debilidades/debilidades.component';
import { FortalezasComponent } from './components/fortalezas/fortalezas.component';
import { OportunidadesComponent } from './components/oportunidades/oportunidades.component';
import { EstrategiasComponent } from './components/estrategias/estrategias.component';
import { Estrategias1f10Component } from './components/estrategias1f10/estrategias1f10.component';
import { Estrategias1d20Component } from './components/estrategias1d20/estrategias1d20.component';
import { Estrategias1f1aComponent } from './components/estrategias1f1a/estrategias1f1a.component';
import { Estrategias2d2aComponent } from './components/estrategias2d2a/estrategias2d2a.component';
import { ModelocanvasComponent } from './components/modelocanvas/modelocanvas.component';
import { ResumenideacionComponent } from './components/resumenideacion/resumenideacion.component';
import { VistadofaComponent } from './components/vistadofa/vistadofa.component';
import { SimulacionlegalComponent } from './components/simulacionlegal/simulacionlegal.component';
import { SimulaciontributariaComponent } from './components/simulaciontributaria/simulaciontributaria.component';
import { SimulaciontributariapersonaComponent } from './components/simulaciontributariapersona/simulaciontributariapersona.component';
import { SimulacionfinancieraComponent } from './components/simulacionfinanciera/simulacionfinanciera.component';
import { ResumensimulacionComponent } from './components/resumensimulacion/resumensimulacion.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { CrearusuariosComponent } from './components/crearusuarios/crearusuarios.component';
import { VerlistadoComponent } from './components/verlistado/verlistado.component';
import { AccionesComponent } from './components/acciones/acciones.component';
import { VistaestrategiasComponent } from './components/vistaestrategias/vistaestrategias.component';
import { VistacanvasComponent } from './components/vistacanvas/vistacanvas.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { CifComponent } from './components/cif/cif.component';
import { MaquinariaComponent } from './components/maquinaria/maquinaria.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { FinanciacionComponent } from './components/financiacion/financiacion.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { PrecioventaComponent } from './components/precioventa/precioventa.component';
import { IngresosadicionalesComponent } from './components/ingresosadicionales/ingresosadicionales.component';
import { GastosadicionalesComponent } from './components/gastosadicionales/gastosadicionales.component';
import { PuntoequilibrioComponent } from './components/puntoequilibrio/puntoequilibrio.component';
import { ProyeccionmensualComponent } from './components/proyeccionmensual/proyeccionmensual.component';
import { BasicoformalizacionComponent } from './components/basicoformalizacion/basicoformalizacion.component';
import { EmpresaformalizacionComponent } from './components/empresaformalizacion/empresaformalizacion.component';
import { PersonaformalizacionComponent } from './components/personaformalizacion/personaformalizacion.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DatosBasicosComponent } from './components/datos-basicos/datos-basicos.component';
import { loginAdmin, loginUser } from './components/guards/role.guard';
import { HobbiesPendientesComponent } from './components/hobbies-pendientes/hobbies-pendientes.component';
import { SuenosPendientesComponent } from './components/suenos-pendientes/suenos-pendientes.component';
import { IdeasPendientesComponent } from './components/ideas-pendientes/ideas-pendientes.component';
import { CriteriosPendientesComponent } from './components/criterios-pendientes/criterios-pendientes.component';
import { VerAvanceComponent } from './components/ver-avance/ver-avance.component';

const routes: Routes = [
    //{ path: "", component: AppComponent, pathMatch: "full" },
    { path: "", component: LoginComponent, pathMatch: "full" },
    { path: "login", component:LoginComponent, pathMatch: "full"},
    { path: "administrador", component:AdministradorComponent, pathMatch: "full", canActivate:[loginAdmin]},
    { path: "home", component:HomeComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "basicos", component:BasicosComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "experiencia", component:ExperienciaComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "hobbies", component:HobbiesComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "suenos", component:SuenosComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "ideas", component:IdeasComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "evaluacion", component:EvaluacionComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "seleccion", component:SeleccionComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "resumen", component:ResumenComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "valorhobbies", component:ValorhobbiesComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "valorsuenos", component:ValorsuenosComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "criterios", component:CriteriosComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "valorcriterios", component:ValorcriteriosComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "matriz", component:MatrizComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "amenazas", component:AmenazasComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "matrizdofa", component:MatrizdofaComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "debilidades", component:DebilidadesComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "fortalezas", component:FortalezasComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "oportunidades", component:OportunidadesComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "estrategias", component:EstrategiasComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "estrategias1f10", component:Estrategias1f10Component, pathMatch: "full", canActivate:[loginUser]},
    { path: "estrategias1d20", component:Estrategias1d20Component, pathMatch: "full", canActivate:[loginUser]},
    { path: "estrategias1f1a", component:Estrategias1f1aComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "estrategias2d2a", component:Estrategias2d2aComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "modelocanvas", component:ModelocanvasComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "resumenideacion", component:ResumenideacionComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "vistadofa", component:VistadofaComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "simulacionlegal", component:SimulacionlegalComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "simulaciontributaria", component:SimulaciontributariaComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "simulaciontributariapersona", component:SimulaciontributariapersonaComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "simulacionfinanciera", component:SimulacionfinancieraComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "resumensimulacion", component:ResumensimulacionComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "crearusuarios", component:CrearusuariosComponent, pathMatch: "full", canActivate:[loginAdmin]},
    { path: "verlistado", component:VerlistadoComponent, pathMatch: "full", canActivate:[loginAdmin]},
    { path: "acciones", component:AccionesComponent, pathMatch: "full", canActivate:[loginAdmin]},
    { path: "vistaestrategias", component:VistaestrategiasComponent, pathMatch: "full"},
    { path: "vistacanvas", component:VistacanvasComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "perfiles", component:PerfilesComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "cif", component:CifComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "maquinaria", component:MaquinariaComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "empleados", component:EmpleadosComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "financiacion", component:FinanciacionComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "gastos", component:GastosComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "precioventa", component:PrecioventaComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "ingresosadicionales", component:IngresosadicionalesComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "gastosadicionales", component:GastosadicionalesComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "puntoequilibrio", component:PuntoequilibrioComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "proyeccionmensual", component:ProyeccionmensualComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "basicoformalizacion", component:BasicoformalizacionComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "empresaformalizacion", component:EmpresaformalizacionComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "personaformalizacion", component:PersonaformalizacionComponent, pathMatch: "full", canActivate:[loginUser]},
    { path: "change-password", component:ChangePasswordComponent,pathMatch:"full"},
    { path: "datos-basicos", component:DatosBasicosComponent, pathMatch:"full"},
    { path: "hobbies-pendientes", component:HobbiesPendientesComponent, pathMatch:"full"},
    { path: "suenos-pendientes", component:SuenosPendientesComponent, pathMatch:"full"},
    { path: "ideas-pendientes", component:IdeasPendientesComponent,pathMatch:"full"},
    { path: "criterios-pendientes", component:CriteriosPendientesComponent,pathMatch:"full"},
    { path: "ver-avance", component: VerAvanceComponent, pathMatch:"full"}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
