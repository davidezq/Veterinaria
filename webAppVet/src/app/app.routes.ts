
import { RouterModule, Routes } from '@angular/router';
import { PaginicioComponent } from './inicio/paginicio/paginicio.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { InipagesComponent } from './inicio/inipages.component';
import { PagesComponent } from './pages/pages.component';


 const appRoutes: Routes = [
    {path:'', component: InipagesComponent },
    {path:'login', component: LoginComponent },
    {path:'register', component: PaginicioComponent },
    {path:'vetapp', component: PagesComponent },
   // {path:'', redirectTo: '/inicio', pathMatch:'full'},
    {path:'**', component: NopagefoundComponent }
] ;

export const APP_ROUTES= RouterModule.forRoot(appRoutes,{useHash:true});