## Implementacion-vista-edicion-datos-Basicos
27/5/2024
Se implementa una vista para que el usuario pueda editar y consultar los datos basicos que ingreso en su registro como emprendedor. Se implementa tambien el campo "departamento" tanto en la vista de registro como de edición, el cual permite un filtrado de las ciudades mas sencillo y eficiente, ahora al escoger un departamento, se desplegara la lista de ciudades y municipios asociados a este mismo. 

## Implementacion-Vistas-Recuperacion-Y-Cambio-Contraseña
17/05/2024
Se implementan las vistas para la recuperacion y el cambio de contraseña de los usuarios. Ahora, para restablecer la contraseña, se envia al usuario un correo con las instrucciones necesarias. El usuario ademas, despues de logueado podra cambiar su contraseña.

¡IMPORTANTE! Al momento de implementar esto a produccion hay que cambiar la apiURL o la urlBase, definida en el archivo global-constans, ya que de esto depende el correcto direccionamiento hacia el cambio de contraseña. 

## Implementacion_Vistas_Verificacion_Correo
03/05/2024
Se implementan las vistas para la verificacion de correo de los nuevos usuarios. Ahora, cuando el administrador registra un usuario, se envia automaticamente un correo al email registrado. el usuario al intentar ingresar por primera vez al sistema, tendra que digitar el codigo que se le envio, aparte de su correo y contraseña. Si el usuario ingresa el codigo correcto, iniciará sesion automaticamente.

# Modificacion_archivo_readme

03/05/2024 Se realiza primer acercamiento a la nueva estructura de manejo de cambios.

# Emprendimientofront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Needed
