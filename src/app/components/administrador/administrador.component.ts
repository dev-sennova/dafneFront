import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  idUsuario:any;
  rol:any;

  constructor(public router: Router, private loginService:LoginService) {}

  ngOnInit(): void {
    console.log("UsuarioLocal: " + localStorage.getItem('nombre_usuario'));
    console.log("idUsuarioLocal: " + localStorage.getItem('identificador_usuario'));
    this.rol = Number(localStorage.getItem('rol')); // Convertir a número si es necesario
    //this.setIdLocal();
  }

/*   setIdLocal() {
    const email = localStorage.getItem('nombre_usuario');
    this.loginService.fetchOptions(email).subscribe(
      (idUsuario) => {
        this.idUsuario = idUsuario;
        localStorage.setItem('identificador_usuario', String(this.idUsuario));
        console.log("IdUsuario: " + this.idUsuario);
        console.log("IdUsuarioLocal: " + localStorage.getItem('identificador_usuario'));
      },
      (error) => {
        console.error(error);
      }
    );
  } */

  loginFake(){
    this.router.navigate(['home']);
  }

  usuariosRoute(){
    this.router.navigate(['crearusuarios']);
  }

  listadoRoute(){
    this.router.navigate(['verlistado']);
  }

  accionesRoute(){
    this.router.navigate(['acciones']);
  }
}
