import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  infoResp: any = '';

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp => {
            
        this.IngresoATablaUser(resp,this.usuario);
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/login');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });
  }

  IngresoATablaUser(res:any,user:any){

    this.auth.bdUser(user,res.localId,true)
        .subscribe(ressp=>{
          console.log('ingreso a la tabla');
          
        })
  }



  

}
