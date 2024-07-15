import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BasicosService } from 'src/app/services/basicos.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';
import { GestorService } from 'src/app/services/gestor.service';

@Component({
  selector: 'app-crearusuarios',
  templateUrl: './crearusuarios.component.html',
  styleUrls: ['./crearusuarios.component.css']
})
export class CrearusuariosComponent implements OnInit {
  nombre: string | undefined;
  correo: string | undefined;
  password: string | undefined;
  idRol: number | null = null;
  idUsuarioCargado: any = null;
  roles: any[] = [
    { id: 3, name: 'emprendedor' },
    { id: 2, name: 'orientador' }
  ];
  gestores: any[] = [];
  showGestorSelect: boolean = false;
  isOrientador: boolean = false;

  constructor(
    private basicosService: BasicosService,
    public router: Router,
    private loginService: LoginService,
    private utilsService: UtilsService,
    private gestorService: GestorService
  ) {}

  ngOnInit(): void {
    this.loadGestores();
    this.checkUserRole();
  }

  loadGestores(): void {
    this.gestorService.listadoOrientadores().subscribe((data: any) => {
      this.gestores = data.users;
    }, (err) => {
      console.error('Error loading gestores', err);
    });
  }

  checkUserRole(): void {
    const userRole = localStorage.getItem('rol'); 
    if (userRole == '2') {
      this.isOrientador = true;
      this.idUsuarioCargado = localStorage.getItem('identificador_usuario')
      this.idRol = 3; 
    }
  }

  onRoleChange(event: any): void {
    this.showGestorSelect = event.target.value == 3; 
  }

  emprendedorSave(): void {
    let gestor = null;

    if (this.idRol == 3) {
      if (!this.idUsuarioCargado) {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear',
          text: 'Por favor selecciona un orientador'
        });
        return;
      }
      gestor = this.idUsuarioCargado;
    } else if (this.idRol == 2) {
      gestor = localStorage.getItem('identificador_usuario');
    }

    const usuario = {
      name: this.nombre,
      email: this.correo,
      rol: this.idRol,
      gestor: gestor,
      password: this.password,
    };

    this.loginService.crearEmprendedor(usuario).subscribe((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Usuario creado correctamente',
        footer: data.message
      }).then(() => {
        this.router.navigate(['administrador']);
      });
    }, (err) => {
      const errorMessage = err.error.errors ? Object.values(err.error.errors).join(', ') : 'No se ha podido completar el registro';
      Swal.fire({
        icon: 'error',
        title: 'Error al crear',
        html: 'Por favor verifique los datos e intente nuevamente',
        footer: errorMessage
      });
    });
  }

  homeRoute(): void {
    this.router.navigate(['administrador']);
  }
}
