import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verlistado',
  templateUrl: './verlistado.component.html',
  styleUrls: ['./verlistado.component.css']
})
export class VerlistadoComponent implements OnInit {
  idUsuarioCargado: any;
  arrayUsuarios: any[] = [];
  arrayUsuariosFiltrado: any[] = [];
  filtroNombre: string = '';
  filtroRol: string = '';
  filtroOrientador='';
  selectedGestor: { [key: number]: number } = {};
  gestores: any[] = [];
  orientadores: any[] = [];
  rolUsuario: string | null = null;
  orientador=false;

  constructor(private gestorService: GestorService, private router: Router) {}

  ngOnInit(): void {
    this.idUsuarioCargado = localStorage.getItem('identificador_usuario');
    this.rolUsuario = localStorage.getItem('rol');

    this.loadGestores();
    this.loadOrientadores();

    if (this.rolUsuario === '1') {
      this.verEmprendedores();
    } else if (this.rolUsuario === '2') {
      this.verEmprendedoresPorGestor();
      this.orientador=true;
    }
  }

  verEmprendedores(): void {
    this.gestorService.listadoEmprendedores().subscribe(
      (data) => {
        this.arrayUsuarios = data.users;
        this.arrayUsuariosFiltrado = [...this.arrayUsuarios];
        this.arrayUsuarios.forEach((usuario: any) => {
          this.selectedGestor[usuario.id] = usuario.gestor;
        });
        this.aplicarFiltro();
      },
      (err) => {
        console.error('Error obteniendo emprendedores', err);
      }
    );
  }

  verEmprendedoresPorGestor(): void {
    this.gestorService.listadoEmprendedoresPorGestor().subscribe(
      (data) => {
        this.arrayUsuarios = data.emprendedores;
        this.arrayUsuariosFiltrado = [...this.arrayUsuarios];
        this.arrayUsuarios.forEach((usuario: any) => {
          this.selectedGestor[usuario.id] = usuario.gestor;
        });
        this.aplicarFiltro();
      },
      (err) => {
        console.error('Error obteniendo emprendedores por gestor', err);
      }
    );
  }

  onGestorChange(elemento: any): void {
    const gestorSeleccionado = this.selectedGestor[elemento.id];
    const gestorActual = elemento.gestor;
    elemento.cambioGestor = gestorSeleccionado !== gestorActual;
  }

  loadGestores(): void {
    this.gestorService.listadoOrientadores().subscribe(
      (data) => {
        this.gestores = data.users;
      },
      (err) => {
        console.log('Error al obtener los gestores: ', err);
      }
    );
  }

  loadOrientadores(): void {
    this.gestorService.listadoOrientadores().subscribe(
      (data) => {
        this.orientadores = data.users;
      },
      (err) => {
        console.log('Error al obtener los orientadores: ', err);
      }
    );
  }

  aplicarFiltro(): void {
    // Filtrar los usuarios según los criterios seleccionados
    this.arrayUsuariosFiltrado = this.arrayUsuarios.filter((elemento: any) => {
      const nombreCoincide = !this.filtroNombre || elemento.name.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const rolCoincide = !this.filtroRol || elemento.rol.toString() == this.filtroRol;
      const orientadorCoincide = !this.filtroOrientador || elemento.gestor == this.filtroOrientador;
      return nombreCoincide && rolCoincide && orientadorCoincide;
    });

    // Si se selecciona "Todos los roles" o "Orientador", restablecer el filtro de orientadores
    if (this.filtroRol === '' || this.filtroRol === '2') {
      this.filtroOrientador = '';
      // Filtrar los usuarios según los criterios seleccionados
    this.arrayUsuariosFiltrado = this.arrayUsuarios.filter((elemento: any) => {
      const nombreCoincide = !this.filtroNombre || elemento.name.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const rolCoincide = !this.filtroRol || elemento.rol.toString() == this.filtroRol;
      return nombreCoincide && rolCoincide;
    });
    }

    // Si se selecciona "Emprendedor" y no se ha seleccionado un orientador,
    if (this.filtroRol === '3' && this.filtroOrientador === '') {
      this.filtroOrientador = '';
    }

    // Ordenar los usuarios filtrados por rol
    this.arrayUsuariosFiltrado.sort((a: any, b: any) => b.rol - a.rol);
}

  
  
  
  
  
  
  cambiarGestor(userId: number): void {
    const gestorId = this.selectedGestor[userId];
    if (!gestorId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor selecciona un gestor',
      });
      return;
    }
    const confirmacion = confirm('¿Estás seguro de cambiar el gestor del emprendedor?');
    if (confirmacion) {
      this.gestorService.cambiarOrientador(userId, gestorId).subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El gestor del emprendedor ha sido cambiado correctamente',
          });
          const usuario = this.arrayUsuarios.find((e: any) => e.id === userId);
          if (usuario) {
            usuario.gestor = gestorId;
          }
          this.aplicarFiltro();
        },
        (error) => {
          console.error('Error cambiando el gestor del emprendedor', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cambiar el gestor del emprendedor',
          });
        }
      );
    }
  }

  verAvance(id: number): void {
    sessionStorage.setItem('emprendedorId', id.toString());
    this.router.navigate(['/ver-avance']);

  }
  

  homeRoute(): void {
    this.router.navigate(['administrador']);
  }
}
