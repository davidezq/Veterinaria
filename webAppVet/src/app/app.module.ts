import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PaginicioComponent } from './inicio/paginicio/paginicio.component';
import { HeaderComponent } from './inicio/header/header.component';

import { FooterComponent } from './inicio/footer/footer.component';
import { APP_ROUTES } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { InipagesComponent } from './inicio/inipages.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    PaginicioComponent,
    HeaderComponent,
    FooterComponent,
    PagesComponent,
    InipagesComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
