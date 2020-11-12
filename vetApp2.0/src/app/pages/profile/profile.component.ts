import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { strict } from 'assert';
import { element } from 'protractor';
import { ConsultaModel } from 'src/app/models/consulta.model';
import { MascotaModel } from 'src/app/models/mascota.model';
import { AuthService } from 'src/app/services/auth.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Id:string;
  mascota: MascotaModel = new MascotaModel();
  doctor:any;
  infoUsers:any[]=[];
  infoConsulta:any[]=[];
  public infomostrar:any;
  consulta: ConsultaModel = new ConsultaModel();
  consultaMostrar:any;



  constructor(private router:ActivatedRoute,
              private mascotaServ:MascotaService,
              private authServ:AuthService,
              private consultServ:ProfileService ) { }
 
  ngOnInit(): void {
    this.obtenerId();
    this.InfoMascota();
    this.getUsers();
    this.getConsulta();
  
  }

  obtenerId(){
    this.router.params
    .subscribe((id:any)=>{
     this.Id=id.id;

    })
  }

  InfoMascota(){
    this.mascotaServ.getMascota(this.Id)
    .subscribe((resp:any)=>{
      this.mascota=resp;
      console.log(this.mascota);       
    })
  }


  agregarConsulta(forma: NgForm){
    
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
    let diagnostico=forma.value.Diagnostico;
    let dia = forma.value.Dia;
    this.setDatos(this.mascota,diagnostico,dia);
    this.consulta.Diagnostico='';
  
  }

  setDatos(mascota:MascotaModel,diagnostico:string,dia:any){

    this.consulta.Id=this.Id;
    this.consulta.Propietario=mascota.Nombre_propietario;
    this.consulta.Mascota=mascota.Nombre_mascota
    this.consulta.Diagnostico=diagnostico;
    this.consulta.Dia=dia;

    this.consultServ.nuevaConsulta(this.consulta).subscribe(resp=>{
      console.log(resp);
      Swal.fire({
        title: 'Exito 👌🏻 ',
        text: 'Se ingreso correctamente',
        icon: 'success'
      });
      this.getConsulta();

    })  

  }

  getUsers(){
    this.authServ.getUser().subscribe(resp=>{

        this.infoUsers=resp;
        
        this.infoMostrar(localStorage.getItem('correo'));
        this.consulta.Doctor=this.infomostrar[0].nombre;

      }
    )
  }

  getConsulta(){

    this.consultServ.getConsultas().subscribe(resp=>{
      this.infoConsulta=resp;
      this.consultasMostrar(this.Id);
     
      
      
    })
  }

  infoMostrar(correo:string){
    this.infomostrar= this.infoUsers.filter(info => info.email === correo);
    return this.infomostrar;
  }

  consultasMostrar(id:string){
    this.consultaMostrar= this.infoConsulta.filter(info => info.Id === id);
    console.log(this.consultaMostrar);

    return this.consultaMostrar;



  }

}
