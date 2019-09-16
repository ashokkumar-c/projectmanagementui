import { Injectable } from '@angular/core';
import { AddTask, EditTask, Task } from '../../models/tasks';
import { AppConstants } from '../../AppConstants';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  newAddTask: AddTask = {
    taskName: '',
    projectId: null,
    projectName: '',
    isParentTask: false,
    priority: null,
    parentTaskId: null,
    parentTaskName: '',
    startDate: null,
    endDate: null,
    userId: null,
    userName: '',
    isCompleted: false
  };
  constructor(private httpClient: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

   // get all users
   getAllTasks() {
    return this.httpClient.get(AppConstants.baseURL + '/tasks');
  }

  getTask(id: string) {
    return this.httpClient.get(AppConstants.baseURL + '/tasks/' + id);
  }

  getTasksByProjectId(projectId: string) {
    return this.httpClient.get(AppConstants.baseURL + '/tasks/' + projectId + '/tasks'  );
  }

  getParentTasksByProjectId(projectId: string, searchText: string) {
    return this.httpClient.get(AppConstants.baseURL + '/tasks/' + projectId + '/parenttasks',
                                { params: new HttpParams().set('q', searchText) } );
  }

  searchTasks(searchTaskRequest: string) {
    return this.httpClient.get(AppConstants.baseURL + '/tasks/search', { params: new HttpParams().set('q', searchTaskRequest) });
  }


  addTask(task: AddTask): Observable<any> {
    return this.httpClient.post<any>(AppConstants.baseURL + '/tasks', task, this.httpOptions);
  }

  updateTask(task: any): Observable<any> {
    return this.httpClient.patch<any>(AppConstants.baseURL + '/tasks/' + task.taskId, task, this.httpOptions);
  }

  deleteTask(id: any): Observable<any> {
    return this.httpClient.delete<any>(AppConstants.baseURL + '/tasks/' + id, this.httpOptions);
  }
}
