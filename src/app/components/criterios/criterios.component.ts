import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { CriteriosService } from 'src/app/services/criterios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent {
  criterios: string | undefined;
  valorImportancia: string | undefined;
  otros: boolean=false;
  suenonuevo: string='';
  checkedCount: number = 0;
  arrayOpciones:any=[];
  arrayCriterios:any=[];
  idCriterioGeneral: any;
  idCriterioPropio: any;
  criterioGeneral: any;
  criterioPropio: any;
  elementos: any[] = [];
  @ViewChildren('checkboxes') checkboxesRef!: QueryList<ElementRef>;
  idCriterio: any;
  idUsuario: any;
  countCriterios: number=0;
  botonBloqueado=false;

//Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=1;
  nombreSeccion:string="criterios";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  valorModeracion: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private criteriosService:CriteriosService) {
  }

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
      //this.llamarAPI();
      this.obtenerCriteriosGeneral();
      this.contarCriteriosPropio(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  obtenerCriteriosGeneral(){
    this.criteriosService.lecturaCriteriosGeneral().subscribe(
      (data) => {
        //
        console.log("Data Propio:"+JSON.stringify(data));
        console.log("Len Data Propio:"+data.criterios.length);
        for (let dato in data.criterios){
          this.idCriterioGeneral=data.criterios[dato].id;
          this.criterioGeneral=data.criterios[dato].criterio;
          this.valorModeracion=data.criterios[dato].moderacion;
          this.arrayOpciones.push({idCriterio:this.idCriterioGeneral, criterio: this.criterioGeneral, valorModeracion: this.valorModeracion});
        }
        this.obtenerCriteriosPropios();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  contarCriteriosPropio(id:any){
    this.criteriosService.countCriteriosPropio(id).subscribe(
      (data) => {
        //console.log("Data Gen:"+data);
        this.countCriterios=data.message;
        //console.log("Data Mess:"+this.countSuenos);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  obtenerCriteriosPropios(){
    this.criteriosService.lecturaCriteriosPropio(this.idUsuarioCargado).subscribe(
      (data) => {
        //console.log("Data Prop:"+data);
        if(data.criterios.length>0){
          this.botonBloqueado=true;
          for (let dato in data.criterios){
            this.idCriterioPropio=data.criterios[dato].id;
            this.criterioPropio=data.criterios[dato].criterio;
            this.valorModeracion=data.criterios[dato].moderacion;
            this.arrayOpciones.push({idCriterio:this.idCriterioPropio, criterio:this.criterioPropio, valorModeracion: this.valorModeracion});
          }
        }else{
          this.botonBloqueado=false;
        }
        for (let dato in this.arrayOpciones){
          //console.log("Array Opciones orden: "+dato+ "idSuenos: " + this.arrayOpciones[dato].idSuenos+ "hobbie: " + this.arrayOpciones[dato].suenos);
        }
        //console.log("Array Opciones length: "+this.arrayOpciones.length);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  onCheckboxChange(event: any, elemento: any) {
    elemento.seleccionado = event.target.checked;
    this.checkedCount = this.arrayOpciones.filter((e: any) => e.seleccionado).length;
  }

  criterioSave(criterionuevo:string, pregunta:string){
    const varNuevoCriterio = {idUsuario:this.idUsuarioCargado, criterio:criterionuevo, pregunta:pregunta};
    if(this.countCriterios<4){
      this.criteriosService.crearCriterios(varNuevoCriterio).subscribe( (data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Nuevo criterio registrado correctamente',
            footer: data.message
          }
        ).then(() => {
          //this.router.navigateByUrl('suenos');
          //
          window.location.reload();
        });
      }, (err) => {
        //debugger
        Swal.fire(
          {
            icon: 'error',
            title: 'Error al crear',
            html: 'Por favor verifique los datos e intente nuevamente',
            footer: 'No se ha podido completar el registro'
          }
        )
      });
    }else{
      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Llegaste al máximo de criterios propias creados',
          footer: 'No se ha podido completar el registro'
        }
      )
    }
  }

  agregarElemento(nombre: string) {
    this.elementos.push({ nombre, seleccionado: false });
  }

  validateCriterios() {
    const elementosSeleccionados = this.arrayOpciones
      .filter((elemento: any) => elemento.seleccionado)
      .map((elemento: any) => {
        return { idCriterio: elemento.idCriterio, criterio: elemento.criterio };
      });
    if(this.checkedCount<6){
      //console.log(elementosSeleccionados);
      for (let dato in elementosSeleccionados){
        this.idCriterio=elementosSeleccionados[dato].idCriterio;
        this.idUsuario=this.idUsuarioCargado;
        //
        console.log("ID HOBBY LOOP: "+this.idCriterio);
        //
        console.log("ID USER LOOP: "+this.idUsuario);
        const varUsuario = {idUsuario:this.idUsuario, idCriterio:this.idCriterio};
        this.criteriosService.cerrarRelacionCriterios(varUsuario).subscribe( (data)=>{
          console.log("Ok");
        }, (err) => {
          //debugger
          console.log("Error");
        });
      }
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Criterios registrados correctamente',
          footer: 'Criterios guardados'
        }
      ).then(() => {
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        const bitacora = {avance:1, idSeccion:9, idUsuario:parseInt(this.idUsuarioCargado)};
        this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
          console.log("Bitacora registrada");
          this.router.navigate(['valorcriterios']);
        }, (err) => {
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
      });
    } else{
      console.log("Excede la cantidad de criterios");
      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Por favor verifique los datos e intente nuevamente',
          footer: 'No se ha podido completar el registro'
        }
      )
    }
    // Realiza cualquier otra lógica que necesites con los elementos seleccionados
  }

  evaluacionRoute(){
    this.router.navigate(['evaluacion']);
  }

  openPopup() {
    Swal.fire({
      title: 'Ingresa tu criterio personalizado:',
      html:
        '<input type="text" id="criterionuevo" class="swal2-input" placeholder="Nombre del criterio" required><br>',
      showCancelButton: true,
      confirmButtonText: 'Guardar Nuevo',
      preConfirm: () => {
        const criterionuevo = (document.getElementById('criterionuevo') as HTMLInputElement).value;
        const pregunta = `Organiza las ideas de mayor a menor según su ${criterionuevo}`;
        this.criterioSave(criterionuevo, pregunta);
      }
    })
  }
  
//Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
