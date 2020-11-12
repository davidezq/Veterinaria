import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LandingpageComponent } from './inicio/landingpage/landingpage.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { 
    path: 'vetapp', 
    component: PagesComponent,
    canActivateChild:[AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data:{breadcrumb:"Dashboard"} },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'mascota', component: MascotaComponent , data:{breadcrumb:"Mascotas"} },
      { path: 'profile/:id', component: ProfileComponent , data:{breadcrumb:"Perfil"}},
      { path: 'citas', component: CitasComponent , data:{breadcrumb:"Citas"}},
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '', component: LandingpageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NopagefoundComponent  },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
