import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  infoUsers:any[]=[];
  public infomostrar:any;

  constructor(private authServ:AuthService) { }

  ngOnInit(): void {
    this.getUsers();
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
