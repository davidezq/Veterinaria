import { Injectable } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import { identifierModuleUrl } from '@angular/compiler';

//-------
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import {CitasModel} from '../models/citas.model'


@Injectable({
  providedIn: 'root'
})
export class CitasService {
  
  private url='https://proyectodps-c9199.firebaseio.com';

  constructor(private http:HttpClient) { }

  //inserta una nueva cita

  nuevaCita(cita:CitasModel)
  {
    return this.http.post(`${this.url}/citas.json`, cita)
    .pipe(
    map((resp:any)=>{
      cita.Id = resp.name;
      console.log(cita);

      return cita;
    })

    )
  }

  getcitas()
  {
    return this.http.get(`${ this.url }/citas.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }

  getCita(id:string)
  {
    return this.http.get(`${ this.url }/citas/${ id }.json`);
  }

  borrarCita(id: string)
  {
    return this.http.delete(`${ this.url }/citas/${ id }.json`);
  }

  actualizarCita(cita:CitasModel,id:string)
  {
    return this.http.put(`${ this.url }/citas/${ id }.json`,cita);
  }

  private crearArreglo(prodObj:object)
  {
    const citas:CitasModel[]=[];

    Object.keys(prodObj).forEach(key =>{
  
      const prod: CitasModel = prodObj[key];

      prod.Id=key;

      citas.push(prod);

    });
  
    return citas;
  

  }

  


}
