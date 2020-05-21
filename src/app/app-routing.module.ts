import { DownladsComponent } from './downlads/downlads.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CountriesComponent } from './countries/countries.component';
import { GlobalComponent } from './global/global.component';
import { UsindiachartsComponent } from './usindiacharts/usindiacharts.component';
import { VideosComponent } from './videos/videos.component';
import { IndiaComponent } from './india/india.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'india', component: IndiaComponent },
  { path: 'global', component: GlobalComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'usindiacharts', component: UsindiachartsComponent },
  { path: 'downloads', component: DownladsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
