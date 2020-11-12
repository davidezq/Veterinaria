import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { ConsultaModel } from '../models/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url ='https://proyectodps-c9199.firebaseio.com';

  constructor(private http: HttpClient) { }

  //consulta
  nuevaConsulta(consulta:any){
    return this.http.post(`${this.url}/consulta.json`, consulta)
    .pipe(
      map((resp:any)=>{
        consulta.id = resp.name;
        
        
        return consulta;
        

      })
    )
  }

  //obtiene todas las consultas
  getConsultas(){
    return this.http.get(`${ this.url }/consulta.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }
  
  private crearArreglo( prodObj: object ) {

    const consulta:ConsultaModel[] = [];

    Object.keys( prodObj ).forEach( key => {

      const prod: ConsultaModel = prodObj[key];
      
      prod.id = key;

      consulta.push( prod );
    });


    return consulta;

  }

  
}
