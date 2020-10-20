import { Injectable } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Citas } from '../models/citas';
import { identifierModuleUrl } from '@angular/compiler';
//import {Citas } from '../models/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  citasList: AngularFireList<any>;
  //selectedCita: Citas = new Citas();

  constructor(private firebase:AngularFireDatabase) { }

  getcitas() { 
    return this.citasList = this.firebase.list('citas');
   }

   insertdatos(id: string, dia: string, hora: string, mascota: string) {
    // agregar un dato al final de la lista
    //this.mascotaList = this.firebase.list('mascotas');
    this.citasList.push({
      Id: id,
      Dia: dia, 
      Hora: hora,
      Mascota: mascota
       });
      }

/*     updateCita(id: string, dia: string, hora: string, mascota: string) {
      this.citasList.push({
        Id: id,
        Dia: dia, 
        Hora: hora,
        Mascota: mascota
           });
          }
*/

      deleteCita($key: string) {
        this.citasList.remove($key);
      }
}
