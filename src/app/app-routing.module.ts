import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './shared/components/home/home.component';
import {ProjectsComponent} from './shared/components/projects/projects/projects.component';
import {TasksComponent} from './shared/components/tasks/tasks/tasks.component';
import {UsersComponent} from './shared/components/users/users/users.component';
import { AddtaskComponent } from './shared/components/tasks/addtask/addtask.component';
import { EdittaskComponent } from './shared/components/tasks/edittask/edittask.component';


const routes: Routes = [
  {path:  '', pathMatch:  'full', redirectTo:  'home'},
  {path: 'home', component: HomeComponent},
  {path: 'manageusers', component: UsersComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'tasks/add', component: AddtaskComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'tasks/edit/:id', component: EdittaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
