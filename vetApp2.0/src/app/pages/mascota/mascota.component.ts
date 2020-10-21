import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MascotaModel } from 'src/app/models/mascota.model';
import {MascotaService} from '../../services/mascota.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {
  
  mascota:MascotaModel= new MascotaModel();
  cargando=false;
  mascotas:MascotaModel[]=[];

  constructor( public mascotaservice: MascotaService,private route: ActivatedRoute,
    private router: Router  ) { }

  ngOnInit(){
    this.cargando=true;
    this.getMascotas();
  }

  getMascotas(){
    this.mascotaservice.getmascotas()
    .subscribe(resp=>{
      this.mascotas = resp;
      this.cargando=false;

      //console.log(this.mascotas);

    })
  }

agregarMascota(forma: NgForm){
 
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

  let peticion: Observable<any>;

  if(forma.valid){
    peticion = this.mascotaservice.nuevaMascota(forma.value);
  }
  

  
  peticion.subscribe( resp => {

    Swal.fire({
      title:'Exito 👌🏻 ',
      text: 'Se ingreso correctamente',
      icon: 'success'
    });
   

    console.log('guardado'+ resp);
    

  });


}


}
