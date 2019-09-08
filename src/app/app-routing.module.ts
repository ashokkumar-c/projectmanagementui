import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './shared/components/home/home.component';
import {ProjectsComponent} from './shared/components/projects/projects/projects.component';
import {TasksComponent} from './shared/components/tasks/tasks/tasks.component';
import {UsersComponent} from './shared/components/users/users/users.component';


const routes: Routes = [
  {path:  '', pathMatch:  'full', redirectTo:  'home'},
  {path: 'home', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'manageusers', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
