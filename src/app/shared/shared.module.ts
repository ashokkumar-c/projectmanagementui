import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { EdituserComponent } from './components/users/edituser/edituser.component';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { AddprojectComponent } from './components/projects/addproject/addproject.component';
import { EditprojectComponent } from './components/projects/editproject/editproject.component';
import { TasksComponent } from './components/tasks/tasks/tasks.component';
import { AddtaskComponent } from './components/tasks/addtask/addtask.component';
import { EdittaskComponent } from './components/tasks/edittask/edittask.component';



@NgModule({
  declarations: [UsersComponent, HomeComponent, AdduserComponent, EdituserComponent, ProjectsComponent, AddprojectComponent, EditprojectComponent, TasksComponent, AddtaskComponent, EdittaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule { }
