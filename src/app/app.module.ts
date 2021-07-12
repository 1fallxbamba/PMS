import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SidemenuComponent } from './pages/shared/sidemenu/sidemenu.component';
import { HomemaincontentComponent } from './pages/shared/homemaincontent/homemaincontent.component';
import { AddprojectComponent } from './pages/addproject/addproject.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { EditprojectComponent } from './pages/editproject/editproject.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { ProjectComponent } from './pages/project/project.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { AddclientComponent } from './pages/addclient/addclient.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EditclientComponent } from './pages/editclient/editclient.component';
import { UsersComponent } from './pages/users/users.component';
import { EdituserComponent } from './pages/edituser/edituser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidemenuComponent,
    HomemaincontentComponent,
    AddprojectComponent,
    ProjectsComponent,
    EditprojectComponent,
    NavbarComponent,
    ProjectComponent,
    AdduserComponent,
    AddclientComponent,
    ClientsComponent,
    EditclientComponent,
    UsersComponent,
    EdituserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
