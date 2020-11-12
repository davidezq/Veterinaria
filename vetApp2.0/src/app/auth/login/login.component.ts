import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  infoUsers:any[]=[];
  public infomostrar:any;
  
  constructor(private authServ: AuthService,
    private router: Router ) { }

  ngOnInit(): void {
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
    this.getUsers();
  }

  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();


    this.authServ.login( this.usuario )
      .subscribe( resp => {
        localStorage.setItem('correo', this.usuario.email);

        Swal.close();

        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.getUsers();
      
        if (this.infomostrar[0].role===false) {
          this.router.navigateByUrl(`/vetapp/profile/${this.infomostrar[0].mascota}`);
        }else{
          this.router.navigateByUrl('/vetapp');
        }

      }, (err) => {

        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });

  }

  getUsers(){
    this.authServ.getUser().subscribe(resp=>{

        this.infoUsers=resp;
        
        this.infoMostrar(localStorage.getItem('correo'));
      }
    )
  }

  infoMostrar(correo:string){
    this.infomostrar= this.infoUsers.filter(info => info.email === correo);
  
    return this.infomostrar;

  }

}
