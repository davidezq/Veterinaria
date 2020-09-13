
import { RouterModule, Routes } from '@angular/router';
import { PaginicioComponent } from './inicio/paginicio/paginicio.component';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { InipagesComponent } from './inicio/inipages.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


 const appRoutes: Routes = [
    {path:'index', component: InipagesComponent },
    {path:'', component: InipagesComponent },
    {path:'login', component: LoginComponent },
    {path:'register', component: RegisterComponent },
    {path:'vetapp',
         component: PagesComponent,
        children:[
            {path:'dashboard', component: DashboardComponent },

        ] 
    },
   // {path:'', redirectTo: '/inicio', pathMatch:'full'},
    {path:'**', component: NopagefoundComponent }
] ;

export const APP_ROUTES= RouterModule.forRoot(appRoutes,{useHash:true});