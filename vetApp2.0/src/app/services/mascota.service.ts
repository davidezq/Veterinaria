import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map } from 'rxjs/operators';

import { MascotaModel } from '../models/mascota.model';
import { MascotaComponent } from '../pages/mascota/mascota.component';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private url ='https://proyectodps-c9199.firebaseio.com';

  constructor(private http: HttpClient) { }



  //inserta una nueva mascota

  nuevaMascota(mascota:MascotaModel){
    return this.http.post(`${this.url}/mascotas.json`, mascota)
    .pipe(
      map((resp:any)=>{
        mascota.id = resp.name;
        console.log(mascota);
        
        return mascota;
        

      })
    )
  }

  getmascotas(){
    return this.http.get(`${ this.url }/mascotas.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }


  //obtiene una sola mascota
  getMascota( id: string ) {

    return this.http.get(`${ this.url }/mascotas/${ id }.json`);

  }

  //borrar mascota

  borrarMascota( id: string ) {

    return this.http.delete(`${ this.url }/mascotas/${ id }.json`);

  }

  //actualiza la info de la mascota

  actualizarMAscota(mascota:MascotaModel, id: string){
   
    return this.http.put(`${ this.url }/mascotas/${ id }.json`,mascota);

  }


  private crearArreglo( prodObj: object ) {

    const mascotas:MascotaModel[] = [];

    Object.keys( prodObj ).forEach( key => {

      const prod: MascotaModel = prodObj[key];
      
      prod.id = key;

      mascotas.push( prod );
    });


    return mascotas;

  }

  
}
