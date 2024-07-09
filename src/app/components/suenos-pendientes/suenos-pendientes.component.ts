import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrientadorService } from 'src/app/services/orientador.service';

@Component({
  selector: 'app-suenos-pendientes',
  templateUrl: './suenos-pendientes.component.html',
  styleUrls: ['./suenos-pendientes.component.css']
})
export class SuenosPendientesComponent {
  suenosIniciales: any[]=[];
  usuarioSuenos: any[]=[];


  constructor(private orientadorService: OrientadorService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerSuenos();
  }

  obtenerSuenos(): void {
    this.orientadorService.SuenosPendientes().subscribe(
      (response) => {
        this.suenosIniciales = response.suenosIniciales;
        this.usuarioSuenos = response.usuarioSuenos;
      },
      (error) => {
        console.error('Error al obtener los sueños:', error);
      }
    );
  }

  aceptarSueno(id: number): void {
    this.orientadorService.AceptarSueno(id).subscribe(
      (response) => {
        console.log('Sueño aceptado correctamente:', response);
        location.reload();
      },
      (error) => {
        console.error('Error al aceptar el sueño:', error);
      }
    );
  }

  eliminarSueno(id: number): void {
    this.orientadorService.EliminarSueno(id).subscribe(
      (response) => {
        console.log('Sueño eliminado correctamente:', response);
        location.reload();

      },
      (error) => {
        console.error('Error al eliminar el sueño:', error);
      }
    );
  }
  homeRoute(): void {
    this.router.navigate(['acciones']);
  }
}
