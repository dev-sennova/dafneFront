import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicosService } from 'src/app/services/basicos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-basicos',
  templateUrl: './datos-basicos.component.html',
  styleUrls: ['./datos-basicos.component.css']
})
export class DatosBasicosComponent implements OnInit {
  userForm: FormGroup;
  userId: number | null = null;
  isEditing: boolean = false;
  departamentos: any[] = [];
  ciudades: any[] = [];
  ciudadSeleccionada: number | null = null;
  departamentoSeleccionado: number | null = null;
  loadingCities: boolean = false;
  userRol: string | null = null;
  crearOrientador: boolean = false;
  orientadorId: number | null=null;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private userService: BasicosService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private basicosService: BasicosService
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      tipodocumento: ['', Validators.required],
      departamento: [null, Validators.required],
      documento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ciudad: [null, Validators.required],
      sexo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('identificador_emprendedor');
    this.userId = userIdString ? Number(userIdString) : null;
    this.userRol = localStorage.getItem('rol');
    const orientadorIdString = localStorage.getItem('identificador_usuario');
    this.orientadorId = orientadorIdString ? Number(orientadorIdString) : null;

    // Verificar si el usuario tiene rol '2' y no tiene userId asignado
    if (this.userRol === '2' && this.userId === null) {
      this.crearOrientador = true;
      this.isEditing = true;
      this.userForm.enable(); // Habilitar el formulario para creación
    } else if (this.userId !== null) {
      this.isEditing = true;
      this.viewEdit();
    }

    this.fetchDepartamentos(); // Cargar departamentos al inicializar
  }

  isFieldInvalid(field: string): boolean {
    const control = this.userForm.get(field);
    return !!control && !control.valid && control.touched;
  }

  viewEdit(): void {
    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe(
        data => {
          if (data.estado === 'Ok' && data.user) {
            const userData = data.user;
            const ciudadId = data.ciudad ? data.ciudad.id : null;
            const departamentoId = data.ciudad ? data.ciudad.departamento_id : null;

            this.userForm.patchValue({
              id: userData.id,
              nombre: userData.nombre,
              tipodocumento: userData.tipodocumento,
              documento: userData.documento,
              direccion: userData.direccion,
              telefono: userData.telefono,
              email: userData.email,
              sexo: userData.sexo,
              departamento: departamentoId,
              ciudad: ciudadId
            });

            if (ciudadId) {
              this.ciudadSeleccionada = ciudadId;
            }

            if (departamentoId) {
              this.departamentoSeleccionado = departamentoId;
              this.loadingCities = true;
              setTimeout(() => {
                this.onDepartamentoChange({ target: { value: departamentoId } }, true);
              });
            }
          }
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.isEditing = false;
      this.userForm.disable();
    }
  }

  fetchDepartamentos(): void {
    this.utilsService.lecturaDepartamentos().subscribe(
      (data) => {
        this.departamentos = data.departamentos;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onDepartamentoChange(event: any, isInitialLoad: boolean = false): void {
    const departamentoId = event?.target?.value;
    if (departamentoId) {
      if (!isInitialLoad) {
        this.ciudades = [{ id: null, ciudad: 'Seleccione una ciudad' }];
        this.userForm.get('ciudad')?.setValue(null);
      }
      this.utilsService.lecturaCiudades(departamentoId).subscribe(
        (data) => {
          this.ciudades = [{ id: null, ciudad: 'Seleccione una ciudad' }, ...data.ciudades];
          if (isInitialLoad && this.ciudadSeleccionada) {
            this.userForm.get('ciudad')?.setValue(this.ciudadSeleccionada);
            this.loadingCities = false;
          }
        },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
    } else {
      this.ciudades = [{ id: null, ciudad: 'Seleccione una ciudad' }];
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.getRawValue();

      if (this.userId === null) {
        user.id = this.orientadorId
        user.idRol = this.userRol; // Asumiendo que rolId puede ser un string válido en tu backend
        this.basicosService.crearUsuario(user).subscribe(
          response => {
            if (response.estado === 'Ok') {
              localStorage.setItem('identificador_emprendedor', response.idUsuario.toString());
              Swal.fire({
                title: "Usuario registrado exitosamente",
                text: "El usuario ha sido registrado exitosamente",
                icon: "success"
              }).then(() => {
                this.userForm.markAsPristine(); // Marcar el formulario como "pristine"
                this.router.navigate(['home']);
              });
            } else {
              alert('Error al registrar el usuario');
            }
          },
          error => {
            console.error('Error:', error);
            alert('Ocurrió un error interno');
          }
        );
      } else {
        // Actualizar usuario existente
        const updatedUser = {
          ...user,
          id: this.userId
        };

        this.userService.updateUser(updatedUser).subscribe(
          response => {
            if (response.estado === 'Ok') {
              Swal.fire({
                title: "Usuario editado exitosamente",
                text: "El usuario ha sido editado exitosamente",
                icon: "success"
              }).then(() => {
                this.userForm.markAsPristine(); // Marcar el formulario como "pristine"
              });
            } else {
              alert('Error al actualizar el usuario');
            }
          },
          error => {
            console.error('Error:', error);
            alert('Ocurrió un error interno');
          }
        );
      }
    } else {
      alert('Por favor completa todos los campos requeridos correctamente');
    }
  }

  public backHome() {
    this.router.navigate(['home']);
  }

  basicosRoute() {
    this.router.navigate(['basicos']);
  }
}
