import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { ResumenempresaService } from '../../services/resumenempresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumenideacion',
  templateUrl: './resumenideacion.component.html',
  styleUrls: ['./resumenideacion.component.css']
})
export class ResumenideacionComponent {
  arrayEmpresa: any;
  idEmpresa: any;
  nombreIdea: any;
  nombreEmpresa: any;
  mision: any;
  vision: any;
  slogan: any;
  logo: any;
  arrayExperiencia: any;
  arrayEscolaridad: any;
  arrayOcupacion: any;
  experiencia: any;
  actividades: any;
  areaExperiencia: any;
  escolaridad: any;
  nivelescolaridad: any;
  areaconocimiento: any;
  ocupacion: any;
  lugar: any;
  arrayUsuario: any;
  nombre: any;
  tipodocumento: any;
  documento: any;
  direccion: any;
  telefono: any;
  ciudad: any;
  email: any;
  sexo: any;
  area: any;
  arrayHobbies: any;
  arraySuenos: any;
  hobby: any;
  sueno: any;

    //Inicio variables para validar bitacora ***
    //*******************************************//
    idModulo:number=1;
    nombreSeccion:string="resumenideacion";
    identificadorSeccion: string="";
    variableSeccion: string="";
    idUsuarioCargado: any;
    //*******************************************//
    //Fin variables para validar bitacora ***
  constructor(public router:Router, private route: ActivatedRoute, private loginService:LoginService, private resumenempresaService:ResumenempresaService) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.verAvance(this.idUsuarioCargado,this.idModulo);
  }

  //Inicio funciones nuevas para validar bitacora. ***
  //*******************************************//
  verAvance(idUsuario:any, idModulo:any){
    this.loginService.verAvance(idUsuario, idModulo).subscribe(
      (data) => {
        console.log("Seccion: "+JSON.stringify(data));

        if (data.seccion !== null) {
          this.variableSeccion = String(data.seccion.seccion);
        } else {
          this.variableSeccion = this.nombreSeccion; // O cualquier valor predeterminado que desees
        }

        console.log("VALOR VARIABLESECCION IN: "+this.variableSeccion);
        this.luegoDeObtenerVariableSeccion(this.variableSeccion);
      },
      (err) => {
        this.luegoDeObtenerVariableSeccion(this.nombreSeccion);
        console.log("SEC ERR: "+err); // Manejo de errores
      }
    );
  }

  luegoDeObtenerVariableSeccion(variableSeccion:any) {
    console.log("VALOR VARIABLESECCION OUT: " + variableSeccion);
    this.identificadorSeccion=variableSeccion;
    // Coloca aquí cualquier lógica que dependa de this.variableSeccion
    console.log("Identificador Seccion: "+this.identificadorSeccion);
    console.log("nombre Seccion: "+this.nombreSeccion);

    if(this.identificadorSeccion===this.nombreSeccion){
      this.cargarDatosEmpresa(this.idUsuarioCargado);
      this.cargarDatosExperiencia(this.idUsuarioCargado);
      this.cargarDatosOcupacion(this.idUsuarioCargado);
      this.cargarDatosEscolaridad(this.idUsuarioCargado);
      this.cargarDatosUsuario(this.idUsuarioCargado);
      this.cargarHobbiesUsuario(this.idUsuarioCargado);
      this.cargarSuenosUsuario(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  cargarDatosEmpresa(idUsuario:any){
    this.resumenempresaService.getEmpresaPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayEmpresa=data.resumen_empresa;
        for (let dato in this.arrayEmpresa){
          this.idEmpresa=this.arrayEmpresa[dato].id;
          this.nombreIdea=this.arrayEmpresa[dato].nombreIdea;
          this.nombreEmpresa=this.arrayEmpresa[dato].nombreEmpresa;
          this.mision=this.arrayEmpresa[dato].mision;
          this.vision=this.arrayEmpresa[dato].vision;
          this.slogan=this.arrayEmpresa[dato].slogan;
          this.logo=this.arrayEmpresa[dato].logo;
        }
        console.log("Actual idEmpresa: "+this.idEmpresa);
        console.log("Actual idUsuario: "+this.idUsuarioCargado);
        console.log("Actual nombreIdea: "+this.nombreIdea);
        console.log("Actual nombreEmpresa: "+this.nombreEmpresa);
        console.log("Actual mision: "+this.mision);
        console.log("Actual vision: "+this.vision);
        console.log("Actual slogan: "+this.slogan);
        console.log("Actual logo: "+this.logo);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosExperiencia(idUsuario:any){
    this.resumenempresaService.getExperienciaPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayExperiencia=data.resumen_experiencia;
        for (let dato in this.arrayExperiencia){
          this.experiencia=this.arrayExperiencia[dato].experiencia;
          this.actividades=this.arrayExperiencia[dato].actividades;
          this.areaExperiencia=this.arrayExperiencia[dato].area;
        }
        console.log("Actual experiencia: "+this.experiencia);
        console.log("Actual actividades: "+this.actividades);
        console.log("Actual areaExperiencia: "+this.areaExperiencia);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosEscolaridad(idUsuario:any){
    this.resumenempresaService.getEscolaridadPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayEscolaridad=data.resumen_escolaridad;
        for (let dato in this.arrayEscolaridad){
          this.escolaridad=this.arrayEscolaridad[dato].escolaridad;
          this.nivelescolaridad=this.arrayEscolaridad[dato].nivelescolaridad;
          this.areaconocimiento=this.arrayEscolaridad[dato].areaconocimiento;
        }
        console.log("Actual escolaridad: "+this.escolaridad);
        console.log("Actual nivelescolaridad: "+this.nivelescolaridad);
        console.log("Actual areaconocimiento: "+this.areaconocimiento);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosOcupacion(idUsuario:any){
    this.resumenempresaService.getOcupacionPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayOcupacion=data.resumen_ocupacion;
        for (let dato in this.arrayOcupacion){
          this.ocupacion=this.arrayOcupacion[dato].ocupacion;
          this.lugar=this.arrayOcupacion[dato].lugar;
          this.area=this.arrayOcupacion[dato].area;
        }
        console.log("Actual ocupacion: "+this.ocupacion);
        console.log("Actual lugar: "+this.lugar);
        console.log("Actual area: "+this.area);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosUsuario(idUsuario: any) {
    this.resumenempresaService.getUsuario(idUsuario).subscribe(
      (data) => {
        console.log(data);
        const usuario = data.user;
        const ciudad = data.ciudad; // 'data.user' es un objeto, no un arreglo
        this.nombre = usuario.nombre;
        this.tipodocumento = usuario.tipodocumento;
        this.documento = usuario.documento;
        this.direccion = usuario.direccion;
        this.telefono = usuario.telefono;
        this.ciudad = ciudad.ciudad;
        this.email = usuario.email;
        this.sexo = usuario.sexo;
  
        console.log("Actual nombre: " + this.nombre);
        console.log("Actual tipodocumento: " + this.tipodocumento);
        console.log("Actual documento: " + this.documento);
        console.log("Actual direccion: " + this.direccion);
        console.log("Actual telefono: " + this.telefono);
        console.log("Actual ciudad: " + this.ciudad);
        console.log("Actual email: " + this.email);
        console.log("Actual sexo: " + this.sexo);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }
  

  cargarHobbiesUsuario(idUsuario:any){
    this.resumenempresaService.getHobbies(idUsuario).subscribe(
      (data) => {
        //
        this.arrayHobbies=data.hobbies;
        for (let dato in this.arrayHobbies){
          this.hobby=this.arrayHobbies[dato].hobby;
          console.log("Actual hobby: "+this.hobby);
        }

      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarSuenosUsuario(idUsuario:any){
    this.resumenempresaService.getSuenos(idUsuario).subscribe(
      (data) => {
        //
        this.arraySuenos=data.suenos;
        for (let dato in this.arraySuenos){
          this.sueno=this.arraySuenos[dato].sueno;
          console.log("Actual sueño: "+this.sueno);
        }

      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  fakeRoute(){
    //Inicio Modificacion Bitacora ***
    //*******************************************//
    const bitacora = {avance:1, idSeccion:14, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
      console.log("Bitacora registrada");
      this.router.navigate(['matrizdofa']);
    }, (err) => {
      console.log(err); // Manejo de errores
    });
    //*******************************************//
    //Fin Modificacion Bitacora ***
  }

  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
