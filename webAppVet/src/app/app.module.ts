import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PaginicioComponent } from './inicio/paginicio/paginicio.component';
import { HeaderComponent } from './inicio/header/header.component';

import { FooterComponent } from './inicio/footer/footer.component';
import { APP_ROUTES } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { InipagesComponent } from './inicio/inipages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderDashboardComponent } from './shared/header-dashboard/header-dashboard.component';



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
    DashboardComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    RegisterComponent,
    HeaderDashboardComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
