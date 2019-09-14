import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, retry, catchError, tap } from 'rxjs/operators';
import { AddProject, EditProject, Project } from '../../models/projects';
import { AppConstants } from '../../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  Projects: Project[];
  newProject: AddProject = {
    projectName: '',
    setDates: false,
    startDate: null,
    endDate: null,
    priority: null,
    isSuspended: false,
    managerId: null,
    managerName: '',
    noOfTasks: 0
  };

  constructor(private httpClient: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // get all users
  getAllProjects() {
    return this.httpClient.get(AppConstants.baseURL + '/projects');
  }

  getProject(id: string) {
    return this.httpClient.get(AppConstants.baseURL + '/projects/' + id);
  }

  searchProjects(searchProjectRequest: string) {
    return this.httpClient.get(AppConstants.baseURL + '/projects/search', { params: new HttpParams().set('q', searchProjectRequest) });
  }


  addProject(project: AddProject): Observable<any> {
    return this.httpClient.post<any>(AppConstants.baseURL + '/projects', project, this.httpOptions);
  }

  updateProject(project: any): Observable<any> {
    return this.httpClient.patch<any>(AppConstants.baseURL + '/projects/' + project.projectId, project, this.httpOptions);
  }

  deleteProject(id: any): Observable<any> {
    return this.httpClient.delete<any>(AppConstants.baseURL + '/projects/' + id, this.httpOptions);
  }


}
