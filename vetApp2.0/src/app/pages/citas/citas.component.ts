import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { Citas } from 'src/app/models/citas';
import {CitasService} from '../../services/citas.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citasList: Citas[];
  Id: string;
  Dia: string;
  Hora: string; 
  Mascota: string;

  constructor(public citaservice: CitasService) { }

  ngOnInit(){
    return this.citaservice.getcitas()
      .snapshotChanges().subscribe(item => {
        this.citasList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.citasList.push(x as Citas);
        });
      });
  }

  onSubmit(){
    this.citaservice.insertdatos(this.Id,this.Dia,this.Hora,this.Mascota);
  this.resetForm();
  }
resetForm() {
  this.Id ='';
  this.Dia = '';
  this.Hora = '';
  this.Mascota = '';
  }

  onDelete($key: string) {
      this.citaservice.deleteCita($key);    
  }

  /*onUpdate(){
    this.citaservice.insertdatos(this.Id,this.Dia,this.Hora,this.Mascota);
  this.resetForm();
  }*/
}
