import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  infoUsers:any[]=[];
  public infomostrar:any;
  constructor(public authServ: AuthService,
  private router: Router) { }

  ngOnInit(): void {
  this.getUsers();
 
    
  }
  salir() {

    this.authServ.logout();
    this.router.navigateByUrl('/login');
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
