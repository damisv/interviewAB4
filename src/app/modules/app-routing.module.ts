import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DetailsComponent, HomepageComponent} from '../components/';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'details/:id', component: DetailsComponent},
  { path: '**', redirectTo: '/homepage', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
