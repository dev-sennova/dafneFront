import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { IdeasService } from 'src/app/services/ideas.service';
import Swal from 'sweetalert2';
import { ApigptService } from 'src/app/services/apigpt.service';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent {

  ideas: string | undefined;
  valorImportancia: string | undefined;
  otros: boolean=false;
  checkedCount: number = 0;
  arrayOpciones:any=[];
  arrayIdeas:any=[];
  idIdeaGeneral: any;
  idIdeaPropio: any;
  ideaGeneral: any;
  ideaPropio: any;
  elementos: any[] = [];
  @ViewChildren('checkboxes') checkboxesRef!: QueryList<ElementRef>;
  idIdea: any;
  idUsuario: any;
  countIdeas: number=0;
  ideanuevo: any;
  botonBloqueado = false;


  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=1;
  nombreSeccion:string="ideas";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  valorModeracion: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private ideasService:IdeasService, private apiGptService:ApigptService) {
  }

  ngOnInit(): void {
      this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
      //
      console.log("Usuario cargado: "+this.idUsuarioCargado);

      this.verAvance(this.idUsuarioCargado,this.idModulo);
  }

//Inicio funciones nuevas para validar bitacora. ***
  //*******************************************//
  verAvance(idUsuario:any, idModulo:any){
    this.loginService.verAvance(idUsuario, idModulo).subscribe(
      (data) => {
        console.log("Seccion: "+JSON.stringify(data));

        if (data.seccion !== null) {
          this.variableSeccion = String(data.seccion.seccion);
        } else {
          this.variableSeccion = this.nombreSeccion; // O cualquier valor predeterminado que desees
        }

        console.log("VALOR VARIABLESECCION IN: "+this.variableSeccion);
        this.luegoDeObtenerVariableSeccion(this.variableSeccion);
      },
      (err) => {
        this.luegoDeObtenerVariableSeccion(this.nombreSeccion);
        console.log("SEC ERR: "+err); // Manejo de errores
      }
    );
  }

  luegoDeObtenerVariableSeccion(variableSeccion:any) {
    console.log("VALOR VARIABLESECCION OUT: " + variableSeccion);
    this.identificadorSeccion=variableSeccion;
    // Coloca aquí cualquier lógica que dependa de this.variableSeccion
    console.log("Identificador Seccion: "+this.identificadorSeccion);
    console.log("nombre Seccion: "+this.nombreSeccion);

    if(this.identificadorSeccion===this.nombreSeccion){
      //this.llamarAPI();
      this.obtenerIdeasGeneral();
      this.contarIdeasPropio(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  obtenerIdeasGeneral(){
    this.ideasService.lecturaIdeasGeneral().subscribe(
      (data) => {
        //
        console.log("Data Propio:"+JSON.stringify(data));
        console.log("Len Data Propio:"+data.ideas.length);
        for (let dato in data.ideas){
          this.idIdeaGeneral=data.ideas[dato].id;
          this.ideaGeneral=data.ideas[dato].idea;
          this.valorModeracion=data.ideas[dato].moderacion;
          this.arrayOpciones.push({idIdea:this.idIdeaGeneral, idea: this.ideaGeneral, valorModeracion: this.valorModeracion});
        }
        this.obtenerIdeasPropios();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  contarIdeasPropio(id:any){
    this.ideasService.countIdeasPropio(id).subscribe(
      (data) => {
        //console.log("Data Gen:"+data);
        this.countIdeas=data.message;
        //console.log("Data Mess:"+this.countSuenos);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  obtenerIdeasPropios(){
    this.ideasService.lecturaIdeasPropio(this.idUsuarioCargado).subscribe(
      (data) => {
        //console.log("Data Prop:"+data);
        if(data.ideas.length>0){
          this.botonBloqueado=true;
          for (let dato in data.ideas){
            this.idIdeaPropio=data.ideas[dato].id;
            this.ideaPropio=data.ideas[dato].idea;
            this.valorModeracion=data.ideas[dato].moderacion;
            this.arrayOpciones.push({idIdea:this.idIdeaPropio, idea:this.ideaPropio, valorModeracion: this.valorModeracion});
          }
        }else{
          this.botonBloqueado=false;
        }
        for (let dato in this.arrayOpciones){
          //console.log("Array Opciones orden: "+dato+ "idSuenos: " + this.arrayOpciones[dato].idSuenos+ "hobbie: " + this.arrayOpciones[dato].suenos);
        }
        //console.log("Array Opciones length: "+this.arrayOpciones.length);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  onCheckboxChange(event: any, elemento: any) {
    elemento.seleccionado = event.target.checked;
    this.checkedCount = this.arrayOpciones.filter((e: any) => e.seleccionado).length;
  }

  ideaSave(ideanuevo:string){
    const varNuevoIdea = {idUsuario:this.idUsuarioCargado, idea:ideanuevo};
    if(this.countIdeas<4){
      this.ideasService.crearIdeas(varNuevoIdea).subscribe( (data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Nueva idea registrada correctamente',
            footer: data.message
          }
        ).then(() => {
          //this.router.navigateByUrl('suenos');
          //
          window.location.reload();
        });
      }, (err) => {
        //debugger
        Swal.fire(
          {
            icon: 'error',
            title: 'Error al crear',
            html: 'Por favor verifique los datos e intente nuevamente',
            footer: 'No se ha podido completar el registro'
          }
        )
      });
    }else{
      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Llegaste al máximo de ideas propias creados',
          footer: 'No se ha podido completar el registro'
        }
      )
    }
  }

  agregarElemento(nombre: string) {
    this.elementos.push({ nombre, seleccionado: false });
  }

  validateIdeas() {
    const elementosSeleccionados = this.arrayOpciones
      .filter((elemento: any) => elemento.seleccionado)
      .map((elemento: any) => {
        return { idIdea: elemento.idIdea, idea: elemento.idea };
      });
    if(this.checkedCount<4){
      //console.log(elementosSeleccionados);
      for (let dato in elementosSeleccionados){
        this.idIdea=elementosSeleccionados[dato].idIdea;
        this.idUsuario=this.idUsuarioCargado;
        //
        console.log("ID HOBBY LOOP: "+this.idIdea);
        //
        console.log("ID USER LOOP: "+this.idUsuario);
        const varUsuario = {idUsuario:this.idUsuario, idIdea:this.idIdea};
        this.ideasService.cerrarRelacionIdeas(varUsuario).subscribe( (data)=>{
          console.log("Ok");
        }, (err) => {
          //debugger
          console.log("Error");
        });
      }
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Ideas registradas correctamente',
          footer: 'Ideas guardadas'
        }
      ).then(() => {
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        const bitacora = {avance:1, idSeccion:8, idUsuario:parseInt(this.idUsuarioCargado)};
        this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
          console.log("Bitacora registrada");
          this.router.navigate(['criterios']);
        }, (err) => {
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
      });
    } else{
      console.log("Excede la cantidad de ideas");
    }
    // Realiza cualquier otra lógica que necesites con los elementos seleccionados
  }

  evaluacionRoute(){
    this.router.navigate(['evaluacion']);
  }

  public llamarAPI(): void {
    this.apiGptService.sendChatRequest().subscribe(
      (response) => {
        console.log(response); // Maneja la respuesta de la API aquí
      },
      (error) => {
        console.error(error); // Maneja los errores aquí
      }
    );
  }

  openPopup() {
    Swal.fire({
      title: 'Ingresa tu idea personalizada:',
      html:
        '<input type="text" id="ideanuevo" class="swal2-input" placeholder="Nombre de la idea">',
      showCancelButton: true,
      confirmButtonText: 'Guardar Nueva',
      preConfirm: () => {
        // Obtener el valor del input
        const ideanuevo = (document.getElementById('ideanuevo') as HTMLInputElement).value;
        // Realizar aquí las acciones necesarias con el valor ingresado
        this.ideaSave(ideanuevo);
      }
    })
  }
//Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}


