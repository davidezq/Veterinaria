import { Component, OnInit } from '@angular/core';

import { NgForm, NgModel } from '@angular/forms';


//--------
import{CitasModel} from 'src/app/models/citas.model';
import {CitasService} from '../../services/citas.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { MascotaModel } from 'src/app/models/mascota.model';
import { element } from 'protractor';

import{MascotaService} from '../../services/mascota.service'


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  cita:CitasModel = new CitasModel();
  cargando=false;
  citas:CitasModel[]=[];

  mascotas: MascotaModel[] = [];


  constructor( public mascotaservice:MascotaService, public citaservice: CitasService,private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(){
      
    this.cargando=true;
    this.getCitas();
    this.getMascotas();
   
    

  }

  getMascotas()
  {
    this.mascotaservice.getmascotas()
    .subscribe(resp=>{
      this.mascotas = resp;
      this.cargando=false;
    })
  }

  getCitas()
  {
    this.citaservice.getcitas()
    .subscribe(resp=>{
      this.citas = resp;
      this.cargando=false;
    })
  }

  agregarCita(forma:NgForm)
  {



    if(forma.invalid){
      Swal.fire({
        title:'Fallo 👎 ',
        text: 'Requiere llenar todos los campos',
        icon: 'warning'
      });
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    //-----------------------

    if(this.cita.Id)
    {
      this.citaservice.actualizarCita(forma.value,this.cita.Id)
      .subscribe(resp =>{

        Swal.fire({
          title: 'Exito 👌🏻 ',
          text: 'Se Actualizo correctamente',
          icon: 'success'
        });
        forma.reset();
        this.cita.Id='';
        this.getCitas();

      });
    } else {
        
          //---
          this.citaservice.nuevaCita(forma.value,this.cita.idMascota)
          .subscribe(resp => {
      
            Swal.fire({
              title: 'Exito 👌🏻 ',
              text: 'Se ingreso correctamente',
              icon: 'success'
            });
            forma.reset();
            this.getCitas();
      
      
          });

    }


  }

  setdatos(idMascota)
  {
  
    let mascota = this.mascotas.find(element => element.Nombre_mascota == idMascota);

    if(mascota)
    {
     
      this.cita.Propietario = mascota.Nombre_propietario;
      this.cita.idMascota=mascota.id;

    }

  }

  setdatosC(idCita)
  {
    let cita = this.citas.find(element => element.Id === idCita);

    if(cita)
    {
      this.cita.Id=idCita;
      this.cita.Dia=cita.Dia;
      this.cita.Hora=cita.Hora;
      this.cita.Mascota=cita.Mascota;
      this.cita.Propietario=cita.Propietario;
      this.cita.idMascota=cita.idMascota;
    }
   
    

  }

  eliminar(id: string)
  {
    
    Swal.fire({
      title: 'Eliminar registro? 🙊 ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {

        this.citaservice.borrarCita(id).subscribe(resp => {


          Swal.fire(
            'Eliminado!',
            'Su registro se eliminó con éxito.',
            'success'
          )
          this.getCitas();
        }, error => {
          //SweetAlert
        });
      }
    })



  }


  aPerfil(data:any){
    this.router.navigate(['vetapp/profile',data.idMascota]);
    
  }


}
