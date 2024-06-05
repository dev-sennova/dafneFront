import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { FormsModule } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-precioventa',
  templateUrl: './precioventa.component.html',
  styleUrls: ['./precioventa.component.css']
})
export class PrecioventaComponent {

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idUsuarioCargado: any;
  options: any[]=[];
  optionsP: any[]=[];
  empleado: any;
  produccion: any;
  idRiesgo: any;
  idPerfil: any;
  isProduccion: string='1';
  maquinaria: any;
  valor: any;
  vidaUtil: any;
  depreciacion: any;
  costo: number=0;
  margen: any;
  venta: any;
  consolidadoHoja: any;
  impuesto: any;
  valorimpuesto: any;
  optionsImpuestos: any[]=[];
  iterador: any;
  isVerificadoIva: string='1';
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.cargarImpuestos();
    this.cargarPrecioventa(this.idUsuarioCargado);
  }

  cargarPrecioventa(idUsuario:any){
    this.utilsService.lecturaPrecioventa(idUsuario).subscribe(
      (data) => {
        console.log("Data: " + JSON.stringify(data));

        let localOrdinal = 0; // Variable local para manejar la posición en el array

        for (let dato of data.precio_venta) {
          this.options[localOrdinal] = {
            idPrecioventa: dato.id,
            costo: dato.costo,
            margen: dato.margen,
            venta: dato.venta,
            impuesto: dato.impuesto,
            valorimpuesto: dato.valorimpuesto
          };

          localOrdinal = localOrdinal + 1;
        }

        console.log("Array salida: " + JSON.stringify(this.options));
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarImpuestos(){
    this.utilsService.lecturaImpuestos().subscribe(
      (data) => {
        console.log("Data Impuestos: " + JSON.stringify(data));

        this.optionsImpuestos=data.impuesto;

        console.log("Array salida: " + JSON.stringify(this.optionsImpuestos));
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarCosto(idUsuario:any){
    this.utilsService.consolidadoHojaCostosUnidad(idUsuario).subscribe(
      (data) => {
        console.log("Data: " + JSON.stringify(data));

        this.consolidadoHoja=data.consolidado;

        if(this.consolidadoHoja>0){
          this.costo=this.consolidadoHoja;
        }

      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  regresarRoute(){
    this.router.navigate(['simulacionfinanciera']);
  }

  guardarRoute(){

    console.log("Valor impuesto enviado: "+this.valorimpuesto);

    const varMensaje = {costo:this.costo, margen:this.margen, venta:this.venta, impuesto:this.valorimpuesto, idUsuario:parseInt(this.idUsuarioCargado)};

    console.log("Valor varMensaje: "+JSON.stringify(varMensaje));

    this.utilsService.crearPrecioventa(varMensaje).subscribe((data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Precio venta empresa creado correctamente',
          footer: data.message
        }
      ).then(() => {
        //
        window.location.reload();
        //this.router.navigate(['matrizdofa']);
      });
    }, (err) => {
      //debugger
      console.log(err);
      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Por favor verifique los datos e intente nuevamente',
          footer: 'No se ha podido completar el registro'
        }
      )
    });
  }
}
