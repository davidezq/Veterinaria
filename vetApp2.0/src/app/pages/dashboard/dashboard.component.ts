import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CitasService } from 'src/app/services/citas.service';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  vetUser:any;
  usuario:any[]=[];
  countMascotas:number;
  countCita:number;

  constructor(private authServ:AuthService,
              private petServ:MascotaService,
              private citaServ:CitasService) { }

  ngOnInit(): void {
    this.getUser();
    this.petCount();
    this.citaCount();
  }

  getUser(){
    this.authServ.getUser().subscribe(resp=>{
      this.usuario=resp;
      this.vetmostrar();


    })
  }
  vetmostrar(){
    this.vetUser=this.usuario.filter(info=>info.role===true);
    return this.vetUser;
  }

  petCount(){
    this.petServ.getmascotas().subscribe(resp=>{
      this.countMascotas=resp.length;      
    })
  }

  citaCount(){
    this.citaServ.getcitas().subscribe(resp=>{
      this.countCita=resp.length;
    })

  }



}
