import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrientadorService } from 'src/app/services/orientador.service';

@Component({
  selector: 'app-hobbies-pendientes',
  templateUrl: './hobbies-pendientes.component.html',
  styleUrls: ['./hobbies-pendientes.component.css']
})
export class HobbiesPendientesComponent {
  hobbiesIniciales: any[]=[];
  usuarioHobbies: any[]=[];


  constructor(private orientadorService: OrientadorService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerHobbies();
  }

  obtenerHobbies(): void {
    this.orientadorService.HobbiesPendientes().subscribe(
      (response) => {
        this.hobbiesIniciales = response.hobbiesIniciales;
        this.usuarioHobbies = response.usuarioHobbies;
      },
      (error) => {
        console.error('Error al obtener los hobbies:', error);
      }
    );
  }

  aceptarHobby(id: number): void {
    this.orientadorService.AceptarHobby(id).subscribe(
      (response) => {
        console.log('Hobby aceptado correctamente:', response);
        location.reload();
      },
      (error) => {
        console.error('Error al aceptar el hobby:', error);
      }
    );
  }

  eliminarHobby(id: number): void {
    this.orientadorService.EliminarHobby(id).subscribe(
      (response) => {
        console.log('Hobby eliminado correctamente:', response);
        location.reload();

      },
      (error) => {
        console.error('Error al eliminar el hobby:', error);
      }
    );
  }
  homeRoute(): void {
    this.router.navigate(['acciones']);
  }
}
