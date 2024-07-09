import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { HobbiesService } from 'src/app/services/hobbies.service';
import Swal from 'sweetalert2';
import { OrientadorService } from 'src/app/services/orientador.service';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent {
  hobbies: string | undefined;
  valorImportancia: string | undefined;
  otros: boolean = false;
  hobbienuevo: string = '';
  checkedCount: number = 0;
  arrayOpciones: any = [];
  arrayHobbies: any = [];
  idHobbieGeneral: any;
  idHobbiePropio: any;
  hobbieGeneral: any;
  hobbiePropio: any;
  elementos: any[] = [];
  @ViewChildren('checkboxes') checkboxesRef!: QueryList<ElementRef>;
  idHobby: any;
  idUsuario: any;
  countHobbies: number = 0;
  botonBloqueado = false;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo: number = 1;
  nombreSeccion: string = "hobbies";
  identificadorSeccion: string = "";
  variableSeccion: string = "";
  idUsuarioCargado: any;
  valorModeracion: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router: Router, private orientadorService: OrientadorService, private loginService: LoginService, private utilsService: UtilsService, private route: ActivatedRoute, private hobbiesService: HobbiesService) {
  }

  ngOnInit(): void {
    this.idUsuarioCargado = localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: " + this.idUsuarioCargado);

    this.verAvance(this.idUsuarioCargado, this.idModulo);
  }

  //Inicio funciones nuevas para validar bitacora. ***
  //*******************************************//
  verAvance(idUsuario: any, idModulo: any) {
    this.loginService.verAvance(idUsuario, idModulo).subscribe(
      (data) => {
        console.log("Seccion: " + JSON.stringify(data));

        if (data.seccion !== null) {
          this.variableSeccion = String(data.seccion.seccion);
        } else {
          this.variableSeccion = this.nombreSeccion; // O cualquier valor predeterminado que desees
        }

        console.log("VALOR VARIABLESECCION IN: " + this.variableSeccion);
        this.luegoDeObtenerVariableSeccion(this.variableSeccion);
      },
      (err) => {
        this.luegoDeObtenerVariableSeccion(this.nombreSeccion);
        console.log("SEC ERR: " + err); // Manejo de errores
      }
    );
  }

  luegoDeObtenerVariableSeccion(variableSeccion: any) {
    console.log("VALOR VARIABLESECCION OUT: " + variableSeccion);
    this.identificadorSeccion = variableSeccion;
    // Coloca aquí cualquier lógica que dependa de this.variableSeccion
    console.log("Identificador Seccion: " + this.identificadorSeccion);
    console.log("nombre Seccion: " + this.nombreSeccion);

    if (this.identificadorSeccion === this.nombreSeccion) {
      this.obtenerHobbiesGeneral();
      this.contarHobbiesPropio(this.idUsuarioCargado);
    } else {
      console.log("VAL RUTA: this.router.navigate([" + this.identificadorSeccion + "])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  obtenerHobbiesGeneral() {
    this.hobbiesService.lecturaHobbiesGeneral().subscribe(
      (data) => {
        //
        console.log("Data Hobb Gen:" + JSON.stringify(data));
        for (let dato in data.hobbies) {
          this.idHobbieGeneral = data.hobbies[dato].id;
          this.hobbieGeneral = data.hobbies[dato].hobby;
          this.valorModeracion = data.hobbies[dato].moderacion;
          this.arrayOpciones.push({ idHobby: this.idHobbieGeneral, hobby: this.hobbieGeneral, valorModeracion: this.valorModeracion });
        }
        console.log("ArrayAcum Gen:" + JSON.stringify(this.arrayOpciones));
        this.obtenerHobbiesPropios();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  contarHobbiesPropio(id: any) {
    this.hobbiesService.countHobbiesPropio(id).subscribe(
      (data) => {
        //console.log("Data Gen:"+data);
        this.countHobbies = data.message;
        //
        console.log("Data ContarHobPr Mess:" + this.countHobbies);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  obtenerHobbiesPropios() {
    this.hobbiesService.lecturaHobbiesPropio(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Data Propio:" + JSON.stringify(data));
        console.log("Len Data Propio:" + data.hobbies.length);
        if (data.hobbies.length > 0) {
          this.botonBloqueado = true;
          for (let dato in data.hobbies) {
            this.idHobbiePropio = data.hobbies[dato].id;
            this.hobbiePropio = data.hobbies[dato].hobby;
            this.valorModeracion = data.hobbies[dato].moderacion;
            this.arrayOpciones.push({ idHobby: this.idHobbiePropio, hobby: this.hobbiePropio, valorModeracion: this.valorModeracion });
          }
        } else {
          this.botonBloqueado = false;
        }
        for (let dato in this.arrayOpciones) {
          //console.log("Array Opciones orden: "+dato+ "idHobbie: " + this.arrayOpciones[dato].idHobby+ "hobbie: " + this.arrayOpciones[dato].hobby);
        }
        console.log("ArrayAcum Gen Post:" + JSON.stringify(this.arrayOpciones));
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

  hobbieSave(hobbienuevo: string) {
    const varNuevoHobby = { idUsuario: this.idUsuarioCargado, hobby: hobbienuevo };
    if (this.countHobbies < 5) {
      this.hobbiesService.crearHobbies(varNuevoHobby).subscribe((data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Nuevo hobbie registrado correctamente',
            footer: data.message
          }
        ).then(() => {
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
    } else {
      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Llegaste al máximo de hobbies propios creados',
          footer: 'No se ha podido completar el registro'
        }
      )
    }

  }

  agregarElemento(nombre: string) {
    this.elementos.push({ nombre, seleccionado: false });
  }

  validateHobbies() {
    const elementosSeleccionados = this.arrayOpciones
      .filter((elemento: any) => elemento.seleccionado)
      .map((elemento: any) => {
        return { idHobby: elemento.idHobby, hobby: elemento.hobby };
      });
    if (this.checkedCount < 6) {
      //console.log(elementosSeleccionados);
      for (let dato in elementosSeleccionados) {
        this.idHobby = elementosSeleccionados[dato].idHobby;
        this.idUsuario = this.idUsuarioCargado;
        //console.log("ID HOBBY LOOP: "+this.idHobby);
        //console.log("ID USER LOOP: "+this.idUsuario);
        const varUsuario = { idUsuario: this.idUsuario, idHobby: this.idHobby };
        this.hobbiesService.cerrarRelacionHobbies(varUsuario).subscribe((data) => {
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
          text: 'Hobbies registrados correctamente',
          footer: 'Hobbies guardados'
        }
      ).then(() => {
        //this.router.navigate(['valorhobbies'], { queryParams: { id: this.idUsuarioCreado} } );
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        const bitacora = { avance: 1, idSeccion: 4, idUsuario: parseInt(this.idUsuarioCargado) };
        this.loginService.crearBitacora(bitacora).subscribe((data) => {
          console.log("Bitacora registrada");
          this.router.navigate(['valorhobbies']);
        }, (err) => {
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
      });
    } else {
      console.log("Excede la cantidad de hobbies");
    }
    // Realiza cualquier otra lógica que necesites con los elementos seleccionados
  }

  suenosRoute() {
    this.router.navigate(['suenos']);
  }

  openPopup() {
    Swal.fire({
      title: 'Ingresa tu hobbie personalizado:',
      html:
        '<input type="text" id="hobbienuevo" class="swal2-input" placeholder="Nombre del hobbie">',
      showCancelButton: true,
      confirmButtonText: 'Guardar Nuevo',
      preConfirm: () => {
        // Obtener el valor del input
        const hobbienuevo = (document.getElementById('hobbienuevo') as HTMLInputElement).value;
        // Realizar aquí las acciones necesarias con el valor ingresado
        this.hobbieSave(hobbienuevo);
      }
    })
  }
  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute() {
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***

}
