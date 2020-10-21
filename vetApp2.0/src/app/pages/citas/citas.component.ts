import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import {CitasService} from '../../services/citas.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {


  constructor(public citaservice: CitasService) { }

  ngOnInit(){
    
  }

 


}
