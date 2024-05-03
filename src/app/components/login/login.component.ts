import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { error } from 'jquery';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  password: string;
  Viewpin: boolean = false;
  pin: string;
  message!: string;


  constructor(public loginService: LoginService, public router: Router) {
    this.usuario = "";
    this.password = "";
    this.pin = "";
  }

  login() {
    const user = { email: this.usuario, password: this.password };
    this.loginService.signIn(user).subscribe(
      (response) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('nombre_usuario', response.nombre_usuario);
        localStorage.setItem('email_usuario', response.email_usuario);
        localStorage.setItem('identificador_usuario', response.id_usuario);
        localStorage.setItem('rol', response.rol);

        // Redireccionar según el rol
        if (response.rol == 1) {
          this.router.navigate(['administrador']);
        } else if (response.rol == 3) {
          this.router.navigate(['home']);
        }
      },
      (error) => {
        if (error.error.error_code == 'email_not_verified') {
          this.Viewpin = true;
        }
      }
    );
  }

  verifyEmail() {
    this.loginService.verifyEmail(this.usuario, this.pin).subscribe(
      (response) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('nombre_usuario', response.nombre_usuario);
        localStorage.setItem('email_usuario', response.email_usuario);
        localStorage.setItem('identificador_usuario', response.id_usuario);
        localStorage.setItem('rol', response.rol);

        // Redireccionar según el rol
        if (response.rol == 1) {
          this.router.navigate(['administrador']);
        } else if (response.rol == 3) {
          this.router.navigate(['home']);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  resendEmail() {
    this.loginService.resendEmail(this.usuario).subscribe(
      (response)=>{
        Swal.fire({
          title: "Reenvio de correo",
          text: "Se ha reenviado correctamente el email al correo electrónico registrado",
          icon: "success"
        });
      },
      (error)=>{
        Swal.fire({
          title: "Error en el reenvio",
          text: "No se pudo enviar el email, intente más tarde o verifique si la dirección es válida.",
          icon: "error"
        });
        console.log('Error al reenviar el correo:',error);
      }
    )
  }


  loginFake() {
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
    console.log("Valor isLoggedIn: " + this.loginService.isLoggedIn);
  }

}
