import { Component, HostListener } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import{ GlobalConstants } from './common/global-constants';
import Swal from 'sweetalert2';
import { GestorService } from './services/gestor.service';
import { OrientadorService } from './services/orientador.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gestorData: any;
  userRol: string|null=null;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  menuVisible = false;

  title = GlobalConstants.siteTitle;

  constructor(public authService: LoginService, public router: Router, private breakpointObserver: BreakpointObserver, public orientadorService:OrientadorService) { }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['login']);
  }

  changepassword(){
    this.router.navigate(['change-password'])
  }

  datosBasicos(){
    this.router.navigate(['datos-basicos'])
  }

  openGestorModal(): void {

    this.orientadorService.GestorDeUsuario().subscribe(
      (data) => {
        if (data.estado === 'Ok') {
          this.gestorData = data.gestor;
          this.showGestorModal();
        } else {
          Swal.fire('Error', 'No se pudo obtener la información del gestor', 'error');
        }
      },
      (error) => {
        console.error('Error al obtener los datos del gestor:', error);
        Swal.fire('Error', 'Ocurrió un error interno', 'error');
      }
    );
  }

  showGestorModal(): void {
    Swal.fire({
      title: 'Datos del Gestor',
      html: `
        <p><strong>Nombre:</strong> ${this.gestorData.nombre}</p>
        <p><strong>Email:</strong> ${this.gestorData.email}</p>
        <p><strong>Teléfono:</strong> ${this.gestorData.telefono}</p>
        <p><strong>Ciudad:</strong> ${this.gestorData.ciudad}</p>
      `,
      showCancelButton: false,
      confirmButtonText: 'Cerrar'
    });
  }

  
  @HostListener('document:click', ['$event'])
clickout(event: MouseEvent) {
  const targetElement = event.target as HTMLElement;
  const menuButton = document.querySelector('.menu-button') as HTMLElement;

  if (menuButton && menuButton.contains(targetElement)) {
    this.menuVisible = true;
  } else {
    this.menuVisible = false;
  }
}
  
}
