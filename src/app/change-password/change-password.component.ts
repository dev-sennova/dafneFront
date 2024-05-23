import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  verifyPassword = true;
  changePassword = false;
  password: string = "";
  newPassword: string = "";
  confirmNewPassword: string = "";

  constructor(public router: Router, public loginService: LoginService) { }


  public backHome() {
    this.router.navigate(['home']);
    this.verifyPassword = true;
    this.changePassword = false;
  }

  VerifyPassword(): void {
    this.loginService.verifyPassword(this.password).subscribe(
      response => {
        console.log(response); // Maneja la respuesta del servicio según tus necesidades
        this.verifyPassword = false;
        this.changePassword = true;
      },
      error => {
        Swal.fire({
          title: "Contraseña Erronea",
          text: "La contraseña es incorrecta. Intente nuevamente",
          icon: "error"
        });
      }
    );
  }

  ChangePassword(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      Swal.fire({
        title: "Contraseñas no coinciden",
        text: "Las contraseñas no coinciden, intentelo nuevamente.",
        icon: "error"
      });
      console.log('Las contraseñas no coinciden');
      return;
    }

    this.loginService.changePassword(this.newPassword).subscribe(
      response => {
        console.log(response); 
        Swal.fire({
          title: "Cambio exitoso",
          text: "La contraseña ha sido cambiada exitosamente",
          icon: "success"
        });
        this.router.navigate(['home']);

      },
      error => {
        if (error.status === 422 && error.error.errors && error.error.errors.new_password) {
          Swal.fire({
            title: "Error",
            text: "La contraseña debe tener almenos 6 digitos",
            icon: "error"
          });
        }else{
        console.error(error); 
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error, intentelo de nuevo mas tarde",
          icon: "error"
        });
      }
      }
    );
  }
}
