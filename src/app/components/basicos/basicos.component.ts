import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BasicosService } from 'src/app/services/basicos.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {
  nombre: any;
  tipoDocumento: string | undefined;
  numeroDocumento: string | undefined;
  correo: any;
  telefono: string | undefined;
  direccion: string | undefined;
  ciudad: string | undefined;
  departamentos: any[] = [];
  ciudades: any[] = [];
  selectedDepartamento: number | undefined;
  sexo: string | undefined;
  idRol: number = 3;
  divEspera: string | undefined;
  options: any[] = [];
  idCiudad: any;
  nombreCiudad: any;
  ordinal: number = 0;

  // Variables para validar bitácora
  idUsuarioCargado: any;
  idModulo: number = 1;
  nombreSeccion: string = "basicos";
  identificadorSeccion: string = "";
  variableSeccion: string = "";

  constructor(
    private basicosService: BasicosService,
    public router: Router,
    private loginService: LoginService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.idUsuarioCargado = localStorage.getItem('identificador_usuario');
    this.nombre = localStorage.getItem('nombre_usuario');
    this.correo = localStorage.getItem('email_usuario');
    console.log("BASICOS IDUSUARIOCARGADO: " + this.idUsuarioCargado);

    this.verAvance(this.idUsuarioCargado, this.idModulo);
    this.fetchDepartamentos(); // Cargar departamentos al inicializar
  }

  // Funciones de validación de bitácora
  verAvance(idUsuario: any, idModulo: any) {
    this.loginService.verAvance(idUsuario, idModulo).subscribe(
      (data) => {
        console.log("Seccion: " + JSON.stringify(data));
        this.variableSeccion = data.seccion ? String(data.seccion.seccion) : this.nombreSeccion;
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
    if (this.identificadorSeccion === this.nombreSeccion) {
      this.fetchOptions();
    } else {
      this.router.navigate([this.variableSeccion]);
    }
  }

  // Cargar departamentos
  fetchDepartamentos(): void {
    this.utilsService.lecturaDepartamentos().subscribe(
      (data) => {
        this.departamentos = [{ id: null, nombre: 'Selecciona departamento' }, ...data.departamentos];
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  // Cargar ciudades basadas en el departamento seleccionado
  onDepartamentoChange(event: any): void {
    const departamentoId = event?.target?.value;
    console.log(event.target.value);
    if (departamentoId) {
      this.utilsService.lecturaCiudades(departamentoId).subscribe(
        (data) => {
          console.log(data); // Verifica aquí si recibes los datos de las ciudades correctamente
          this.ciudades = data.ciudades;
        },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
    }
  }
  

  fetchOptions() {
    if (this.selectedDepartamento) {
      this.onDepartamentoChange(this.selectedDepartamento);
    }
  }

  // Guardar usuario
  basicosSave() {
    const usuario = {
      id: this.idUsuarioCargado,
      nombre: this.nombre,
      tipodocumento: this.tipoDocumento,
      documento: this.numeroDocumento,
      email: this.correo,
      telefono: this.telefono,
      direccion: this.direccion,
      ciudad: this.ciudad,
      sexo: this.sexo,
      idRol: this.idRol
    };
    console.log("USUARIO OBJECT: " + JSON.stringify(usuario));
    this.basicosService.crearUsuario(usuario).subscribe(
      (data) => {
        localStorage.setItem('identificador_emprendedor', this.idUsuarioCargado);
        Swal.fire({
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Usuario creado correctamente',
          footer: data.message
        }).then(() => {
          const bitacora = { avance: 1, idSeccion: 2, idUsuario: parseInt(this.idUsuarioCargado) };
          this.loginService.crearBitacora(bitacora).subscribe(
            (data) => {
              console.log("Bitacora registrada");
              const bitacora2 = { avance: 1, idSeccion: 18, idUsuario: parseInt(this.idUsuarioCargado) };
              this.loginService.crearBitacora(bitacora2).subscribe(
                (data) => {
                  console.log("Bitacora2 registrada");
                  const bitacora3 = { avance: 1, idSeccion: 23, idUsuario: parseInt(this.idUsuarioCargado) };
                  this.loginService.crearBitacora(bitacora3).subscribe(
                    (data) => {
                      console.log("Bitacora3 registrada");
                    },
                    (err) => {
                      console.log("PAYLOAD ERROR: " + JSON.stringify(bitacora3));
                      console.log(err); // Manejo de errores
                    }
                  );
                },
                (err) => {
                  console.log("PAYLOAD ERROR: " + JSON.stringify(bitacora2));
                  console.log(err); // Manejo de errores
                }
              );
              this.router.navigate(['experiencia']);
            },
            (err) => {
              console.log("PAYLOAD ERROR: " + JSON.stringify(bitacora));
              console.log(err); // Manejo de errores
            }
          );
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear',
          html: 'Por favor verifique los datos e intente nuevamente',
          footer: 'No se ha podido completar el registro'
        });
      }
    );
  }

  experienciaRoute() {
    this.router.navigate(['experiencia']);
  }

  homeRoute() {
    this.router.navigate(['home']);
  }
}
