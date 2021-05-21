import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/client', pathMatch: 'full'},
  {path: 'client', component: ClientListComponent},
  {path: 'client/:id', component: ClientListComponent},
  {path: 'form', component: ClientFormComponent},
  {path: 'form/:id', component: ClientFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
