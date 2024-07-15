import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrientadorService } from 'src/app/services/orientador.service';

@Component({
  selector: 'app-ideas-pendientes',
  templateUrl: './ideas-pendientes.component.html',
  styleUrls: ['./ideas-pendientes.component.css']
})
export class IdeasPendientesComponent {

  ideasIniciales: any[] = [];
  usuarioIdeas: any[] = [];


  constructor(private orientadorService: OrientadorService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerIdeas();
  }

  obtenerIdeas(): void {
    this.orientadorService.IdeasPendientes().subscribe(
      (response) => {
        console.log(response)
        this.ideasIniciales = response.ideasIniciales;
        this.usuarioIdeas = response.usuarioIdeas;
      },
      (error) => {
        console.error('Error al obtener las Ideas:', error);
      }
    );
  }

  aceptarIdea(id: number): void {
    this.orientadorService.AceptarIdeas(id).subscribe(
      (response) => {
        console.log('Ideas aceptadas correctamente:', response);
        location.reload();
      },
      (error) => {
        console.error('Error al aceptar la idea:', error);
      }
    );
  }

  eliminarIdea(id: number): void {
    this.orientadorService.EliminarIdeas(id).subscribe(
      (response) => {
        console.log('Idea eliminada correctamente:', response);
        location.reload();

      },
      (error) => {
        console.error('Error al eliminar la idea:', error);
      }
    );
  }
  homeRoute(): void {
    this.router.navigate(['acciones']);
  }


}
