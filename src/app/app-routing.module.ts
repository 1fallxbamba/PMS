import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AddprojectComponent } from './pages/addproject/addproject.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectComponent } from './pages/project/project.component';
import { EditprojectComponent } from './pages/editproject/editproject.component';
import { AddclientComponent } from './pages/addclient/addclient.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EditclientComponent } from './pages/editclient/editclient.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { UsersComponent } from './pages/users/users.component';
import { EdituserComponent } from './pages/edituser/edituser.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path: 'project/new', component: AddprojectComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'project/:id', component: ProjectComponent},
  {path: 'project/edit/:id', component: EditprojectComponent},
  {path: 'client/new', component: AddclientComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'client/edit/:id', component: EditclientComponent},
  {path: 'user/new', component: AdduserComponent},
  {path: 'users', component: UsersComponent},
  {path: 'user/edit', component: EdituserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
