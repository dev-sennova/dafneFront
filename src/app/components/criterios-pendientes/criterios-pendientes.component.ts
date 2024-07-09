import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrientadorService } from 'src/app/services/orientador.service';

@Component({
  selector: 'app-criterios-pendientes',
  templateUrl: './criterios-pendientes.component.html',
  styleUrls: ['./criterios-pendientes.component.css']
})
export class CriteriosPendientesComponent {
  criteriosIniciales: any[]=[];
  usuarioCriterios: any[]=[];


  constructor(private orientadorService: OrientadorService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerCriterios();
  }

  obtenerCriterios(): void {
    this.orientadorService.CriteriosPendientes().subscribe(
      (response) => {
        this.criteriosIniciales = response.criteriosIniciales;
        this.usuarioCriterios = response.usuarioCriterios;
      },
      (error) => {
        console.error('Error al obtener los criterios:', error);
      }
    );
  }

  aceptarCriterio(id: number): void {
    this.orientadorService.AceptarCriterio(id).subscribe(
      (response) => {
        console.log('Criterio aceptado correctamente:', response);
        location.reload();
      },
      (error) => {
        console.error('Error al aceptar el criterio:', error);
      }
    );
  }

  eliminarCriterio(id: number): void {
    this.orientadorService.EliminarCriterio(id).subscribe(
      (response) => {
        console.log('Criterio eliminado correctamente:', response);
        location.reload();

      },
      (error) => {
        console.error('Error al eliminar el criterio:', error);
      }
    );
  }
  homeRoute(): void {
    this.router.navigate(['acciones']);
  }
}
