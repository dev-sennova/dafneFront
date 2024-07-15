import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrientadorService } from 'src/app/services/orientador.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit {
  usuarioHobbies: any[] = [];
  usuarioSuenos: any[] = [];
  usuarioIdeas: any[] = [];
  usuarioCriterios: any[] = [];


  constructor(
    public router: Router,
    private orientadorService: OrientadorService
  ) {}

  ngOnInit(): void {
    this.obtenerHobbies();
    this.obtenerSuenos();
    this.obtenerIdeas();
    this.obtenerCriterios();
  }

  hobbiesRoute() {
    this.router.navigate(['hobbies-pendientes']);
  }

  suenosRoute() {
    this.router.navigate(['suenos-pendientes']);
  }

  ideasRoute() {
    this.router.navigate(['ideas-pendientes']);
  }

  criteriosRoute() {
    this.router.navigate(['criterios-pendientes']);
  }

  obtenerHobbies(): void {
    this.orientadorService.HobbiesPendientes().subscribe(
      (response) => {
        this.usuarioHobbies = response.usuarioHobbies;
      },
      (error) => {
        console.error('Error al obtener los hobbies:', error);
      }
    );
  }

  obtenerSuenos(): void {
    this.orientadorService.SuenosPendientes().subscribe(
      (response) => {
        this.usuarioSuenos = response.usuarioSuenos;
      },
      (error) => {
        console.error('Error al obtener los sueños:', error);
      }
    );
  }

  obtenerIdeas(): void {
    this.orientadorService.IdeasPendientes().subscribe(
      (response) => {
        this.usuarioIdeas = response.usuarioIdeas;
      },
      (error) => {
        console.error('Error al obtener las Ideas:', error);
      }
    );
  }

  obtenerCriterios(): void {
    this.orientadorService.CriteriosPendientes().subscribe(
      (response) => {
        this.usuarioCriterios = response.usuarioCriterios;
      },
      (error) => {
        console.error('Error al obtener los criterios:', error);
      }
    );
  }

  homeRoute(): void {
    this.router.navigate(['administrador']);
  }
}
