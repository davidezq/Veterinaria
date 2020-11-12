import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;
  public userData: any;

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyC1Dyo0xN25vOte-GAg-lG5FQXkYaZlraI';
  private bd ='https://proyectodps-c9199.firebaseio.com';

  constructor(private http: HttpClient,public afAuth: AngularFireAuth) { 
    this.leerToken();

    
  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
 
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
  }

  
  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }


  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }

  //ingresar usuario a la  base de datos
  bdUser(user:UsuarioModel,id:any,admin:boolean){

    user.id=id;
    user.role=admin;

    return this.http.post(`${this.bd}/usuario.json`, user)
    .pipe(
      map((resp:any)=>{
        id.id = resp.localId;
        return user;

      })
    )
  }
  
  private crearArreglo( prodObj: object ) {

    const usuario:UsuarioModel[] = [];

    Object.keys( prodObj ).forEach( key => {

      const prod: UsuarioModel = prodObj[key];
      
      prod.id = key;

      usuario.push( prod );
    });


    return usuario;

  }

  //trae los usuario de la tabla 
  getUser(){
    return this.http.get(`${ this.bd }/usuario.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }




}
