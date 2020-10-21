import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MascotaModel } from 'src/app/models/mascota.model';
import { MascotaService } from '../../services/mascota.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {

  mascota: MascotaModel = new MascotaModel();
  cargando = false;
  mascotas: MascotaModel[] = [];

  constructor(public mascotaservice: MascotaService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.cargando = true;
    this.getMascotas();
  }

  getMascotas() {
    this.mascotaservice.getmascotas()
      .subscribe(resp => {
        this.mascotas = resp;
        this.cargando = false;

      })
  }

  agregarMascota(forma: NgForm) {

    if (forma.invalid) {
      Swal.fire({
        title: 'Fallo 👎 ',
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

   
    

    if (this.mascota.id) {

       this.mascotaservice.actualizarMAscota(forma.value, this.mascota.id)
       .subscribe(resp => {

        Swal.fire({
          title: 'Exito 👌🏻 ',
          text: 'Se Actualizo correctamente',
          icon: 'success'
        });
        forma.reset();
        this.getMascotas();


      });
        

    } else {
      this.mascotaservice.nuevaMascota(forma.value)
    .subscribe(resp => {

      Swal.fire({
        title: 'Exito 👌🏻 ',
        text: 'Se ingreso correctamente',
        icon: 'success'
      });
      forma.reset();
      this.getMascotas();


    });

    }


  }

  setdatos(idmascota) {


    let mascota = this.mascotas.find(element => element.id === idmascota);

    if (mascota) {
      this.mascota.id=idmascota;
      this.mascota.Nombre_mascota = mascota.Nombre_mascota;
      this.mascota.Fecha_nacimiento = mascota.Fecha_nacimiento;
      this.mascota.Especie = mascota.Especie;
      this.mascota.Raza = mascota.Raza;
      this.mascota.Color = mascota.Color;
      this.mascota.Nombre_propietario = mascota.Nombre_propietario;
      this.mascota.Color = mascota.Color;
      this.mascota.Telefono = mascota.Telefono;
      this.mascota.Direccion = mascota.Direccion;
      this.mascota.Correo = mascota.Correo;
      this.mascota.Password = mascota.Password;

    }
  }


  eliminar(id: string) {

    Swal.fire({
      title: 'Eliminar registro? 🙊 ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {

        this.mascotaservice.borrarMascota(id).subscribe(resp => {


          Swal.fire(
            'Eliminado!',
            'Su registro se eliminó con éxito.',
            'success'
          )
          this.getMascotas();
        }, error => {
          //SweetAlert
        });
      }
    })


  }


}
