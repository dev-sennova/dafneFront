import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { SuenosService } from 'src/app/services/suenos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suenos',
  templateUrl: './suenos.component.html',
  styleUrls: ['./suenos.component.css']
})
export class SuenosComponent {

  suenos: string | undefined;
  valorImportancia: string | undefined;
  otros: boolean=false;
  checkedCount: number = 0;
  arrayOpciones:any=[];
  arraySuenos:any=[];
  idSuenoGeneral: any;
  idSuenoPropio: any;
  suenoGeneral: any;
  suenoPropio: any;
  elementos: any[] = [];
  @ViewChildren('checkboxes') checkboxesRef!: QueryList<ElementRef>;
  idSueno: any;
  idUsuario: any;
  countSuenos: number=0;
  botonBloqueado = false;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=1;
  nombreSeccion:string="suenos";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  valorModeracion: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private suenosService:SuenosService) {
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
      this.obtenerSuenosGeneral();
      this.contarSuenosPropio(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  obtenerSuenosGeneral(){
    this.suenosService.lecturaSuenosGeneral().subscribe(
      (data) => {
        //
        console.log("Data Gen:"+JSON.stringify(data));
        for (let dato in data.suenos){
          this.idSuenoGeneral=data.suenos[dato].id;
          this.suenoGeneral=data.suenos[dato].sueno;
          this.valorModeracion=data.suenos[dato].moderacion;
          this.arrayOpciones.push({idSueno:this.idSuenoGeneral, sueno: this.suenoGeneral, valorModeracion: this.valorModeracion});
        }
        console.log("ArrayAcum Gen:"+JSON.stringify(this.arrayOpciones));
        this.obtenerSuenosPropios();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  contarSuenosPropio(id:any){
    this.suenosService.countSuenosPropio(id).subscribe(
      (data) => {
        //console.log("Data Gen:"+data);
        this.countSuenos=data.message;
        //console.log("Data Mess:"+this.countSuenos);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  obtenerSuenosPropios(){
    this.suenosService.lecturaSuenosPropio(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Data Propio:"+JSON.stringify(data));
        console.log("Len Data Propio:"+data.suenos.length);
        if(data.suenos.length>0){
          this.botonBloqueado=true;
          for (let dato in data.suenos){
            this.idSuenoPropio=data.suenos[dato].id;
            this.suenoPropio=data.suenos[dato].sueno;
            this.valorModeracion=data.suenos[dato].moderacion;
            this.arrayOpciones.push({idSueno:this.idSuenoPropio, sueno: this.suenoPropio, valorModeracion: this.valorModeracion});
          }
        } else{
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

  suenoSave(suenonuevo: string){
    const varNuevoSueno = {idUsuario:this.idUsuarioCargado, sueno:suenonuevo};
    if(this.countSuenos<5){
      this.suenosService.crearSuenos(varNuevoSueno).subscribe( (data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Nuevo sueño registrado correctamente',
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
          html: 'Llegaste al máximo de sueños propios creados',
          footer: 'No se ha podido completar el registro'
        }
      )
    }

  }

  agregarElemento(nombre: string) {
    this.elementos.push({ nombre, seleccionado: false });
  }

  validateSuenos() {
    const elementosSeleccionados = this.arrayOpciones
      .filter((elemento: any) => elemento.seleccionado)
      .map((elemento: any) => {
        return { idSueno: elemento.idSueno, sueno: elemento.sueno };
      });
    if(this.checkedCount<6){
      //console.log(elementosSeleccionados);
      for (let dato in elementosSeleccionados){
        this.idSueno=elementosSeleccionados[dato].idSueno;
        this.idUsuario=this.idUsuarioCargado;
        //console.log("ID HOBBY LOOP: "+this.idHobby);
        //console.log("ID USER LOOP: "+this.idUsuario);
        const varUsuario = {idUsuario:this.idUsuario, idSueno:this.idSueno};
        this.suenosService.cerrarRelacionSuenos(varUsuario).subscribe( (data)=>{
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
          text: 'Sueños registrados correctamente',
          footer: 'Sueños guardados'
        }
      ).then(() => {
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        const bitacora = {avance:1, idSeccion:6, idUsuario:parseInt(this.idUsuarioCargado)};
        this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
          console.log("Bitacora registrada");
          this.router.navigate(['valorsuenos']);
        }, (err) => {
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
      });
    } else{
      console.log("Excede la cantidad de sueños");
    }
    // Realiza cualquier otra lógica que necesites con los elementos seleccionados
  }

  ideasRoute(){
    this.router.navigate(['ideas']);
  }

  openPopup() {
    Swal.fire({
      title: 'Ingresa tu sueño personalizado:',
      html:
        '<input type="text" id="suenonuevo" class="swal2-input" placeholder="Nombre del sueño">',
      showCancelButton: true,
      confirmButtonText: 'Guardar Nuevo',
      preConfirm: () => {
        // Obtener el valor del input
        const suenonuevo = (document.getElementById('suenonuevo') as HTMLInputElement).value;
        // Realizar aquí las acciones necesarias con el valor ingresado
        this.suenoSave(suenonuevo);
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
