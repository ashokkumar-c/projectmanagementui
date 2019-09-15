import { Component, OnInit, NgModuleRef } from '@angular/core';
import { ProjectSearchModelComponent } from '../project-search-model/project-search-model.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { Task, TaskProject, EndTask } from '../../../../core/models/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  modalOptions: NgbModalOptions;
  searchProjectRequest: string;
  submitted = false;
  taskProject: TaskProject = {
    taskProjectId: '',
    taskProjectName: ''
  };
  Tasks: Task[];
  sortedTasks: Task[];
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private tasksService: TasksService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit() {
  }

  openTaskProjectModal() {
    const modalRef = this.modalService.open(ProjectSearchModelComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.taskProject = result as TaskProject;
        this.searchProjectRequest = this.taskProject.taskProjectName;
        this.tasksService.getTasksByProjectId(this.taskProject.taskProjectId).subscribe(objResult => {
          this.Tasks = objResult['data'] as Task[];
        });
      }
    });
    modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
      console.log(emmitedValue);
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
    });
  }

  sortBy(value: string) {
    this.sortedTasks = this.Tasks;
    if (value === 'isCompleted') {
      this.Tasks = this.sortedTasks.sort(this.sortStatus);
    } else if (value === 'Priority') {
      this.Tasks = this.sortedTasks.sort(this.sortPriority);
    } else if (value === 'startDate') {
      this.Tasks = this.sortedTasks.sort(this.sortStartDate);
    } else if (value === 'endDate') {
      this.Tasks = this.sortedTasks.sort(this.sortEndDate);
    }
  }
  sortStatus(t1: Task, t2: Task) {
    return Number(t2.isCompleted) - Number(t1.isCompleted);
  }
  sortPriority(t1: Task, t2: Task) {
    return t1.priority - t2.priority;
  }
  sortStartDate(t1: Task, t2: Task) {
    if (t1.startDate < t2.startDate) {
      return -1;
    }
    if (t1.startDate > t2.startDate) {
      return 1;
    }
    return 0;
  }
  sortEndDate(t1: Task, t2: Task) {
    if (t1.endDate < t2.endDate) {
      return -1;
    }
    if (t1.endDate > t2.endDate) {
      return 1;
    }
    return 0;
  }

  endTask(id: string) {
    const compelteTask: EndTask = {
      endDate: new Date(),
      isCompleted: true,
      taskId: id
    };
    this.tasksService.updateTask(compelteTask).subscribe(result => {
      if (result['status'] === 'success') {
        this.tasksService.getTasksByProjectId(id).subscribe(objResult => {
          this.Tasks = objResult['data'] as Task[];
        });
      }
    });
  }

}
