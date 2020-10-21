import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
  import { AngularFireAuthModule } from "@angular/fire/auth";
  import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AngularFireDatabaseModule } from '@angular/fire/database';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { PagesComponent } from './pages/pages.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { from } from 'rxjs';
import {MascotaService} from './services/mascota.service';

import {CitasService} from './services/citas.service';
import { LandingpageComponent } from './inicio/landingpage/landingpage.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    MascotaComponent,
    CitasComponent,
    ProfileComponent,
    LandingpageComponent,
  ],
  providers: [MascotaService, CitasService],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
  
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
