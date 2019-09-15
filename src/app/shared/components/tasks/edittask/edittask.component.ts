import { Component, OnInit } from '@angular/core';
import { AddTask, EditTask, Task, TaskProject, TaskUser, ParentTask } from '../../../../core/models/tasks';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { TasksService } from '../../../../core/services/tasks/tasks.service';
import { ProjectSearchModelComponent } from '../project-search-model/project-search-model.component';
import { TaskSearchModelComponent } from '../task-search-model/task-search-model.component';
import { UserSearchModelComponent } from '../user-search-model/user-search-model.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

  projectId: string;
  tempEditTask: EditTask = {
    taskId: null,
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
    userName: ''

  };
  editTask: EditTask = {
    taskId: null,
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
    userName: ''
  };
  modalOptions: NgbModalOptions;
  submitted = false;
  registerForm: FormGroup;

  taskUser: TaskUser = {
    taskUserId: '',
    taskUserName: ''
  };

  parentTask: ParentTask = {
    parentTaskId: '',
    parentTaskName: ''
  };

  taskProject: TaskProject = {
    taskProjectId: '',
    taskProjectName: ''
  };

  disableControl = false;
  datePipe = new DatePipe('en-US');
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private tasksService: TasksService,
    private activatedRoute: ActivatedRoute) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      taskId: ['', Validators.required],
      projectName: ['', Validators.required],
      projectId: [''],
      taskName: ['', Validators.required],
      isParentTask: [false],
      priority: [''],
      parentTaskId: [''],
      parentTaskName: [''],
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      endDate: formatDate(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd', 'en-US'),
      userName: [''],
      userId: ['']
    });

    this.tasksService.getTask(this.activatedRoute.snapshot.params['id']).subscribe(result => {
      if (result['status'] === 'success') {
        this.editTask = result['data'][0] as EditTask;
        console.log(this.editTask);
        this.registerForm.setValue({
          taskId: this.editTask.taskId,
          taskName: this.editTask.taskName,
          projectId: this.editTask.projectId,
          projectName: this.editTask.projectName,
          isParentTask: this.editTask.isParentTask,
          priority: this.editTask.priority,
          parentTaskId: this.editTask.parentTaskId,
          parentTaskName: this.editTask.parentTaskName,
          startDate: this.datePipe.transform(this.editTask.startDate, 'yyyy-MM-dd'),
          endDate: this.datePipe.transform(this.editTask.endDate, 'yyyy-MM-dd'),
          userId: this.editTask.userId,
          userName: this.editTask.userName
        });
        if (this.registerForm.get('isParentTask').value === true) {
          this.registerForm.get('isParentTask').disable();
        }
      }
    });

    this.onFormChanges();
    if (this.editTask.isParentTask) {
      this.disableControl = true;
    }
  }

  onFormChanges() {
    this.registerForm.get('isParentTask').valueChanges
      .subscribe(checked => {
        if (checked === true) {
          this.registerForm.get('priority').disable();
          this.registerForm.get('startDate').disable();
          this.registerForm.get('endDate').disable();
        } else {
          this.registerForm.get('priority').enable();
          this.registerForm.get('startDate').enable();
          this.registerForm.get('endDate').enable();
        }
      });
  }

  get getControls() {
    return this.registerForm.controls;
  }

  onChange($event) {
    if ($event.target.checked) {
      this.disableControl = true;
    } else {
      this.disableControl = false;
    }
  }

  openTaskUserModal() {
    this.tempEditTask = this.registerForm.value as EditTask;
    const modalRef = this.modalService.open(UserSearchModelComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.taskUser = result as TaskUser;
        this.registerForm.patchValue({
          taskId: this.tempEditTask.taskId,
          projectName: this.tempEditTask.projectName,
          projectId: this.tempEditTask.projectId,
          taskName: this.tempEditTask.taskName,
          isParentTask: this.tempEditTask.isParentTask,
          priority: this.tempEditTask.priority,
          parentTaskId: this.tempEditTask.parentTaskId,
          parentTaskName: this.tempEditTask.parentTaskName,
          startDate: this.tempEditTask.startDate,
          endDate: this.tempEditTask.endDate,
          userName: this.taskUser.taskUserName,
          userId: this.taskUser.taskUserId
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

  openTaskProjectModal() {
    this.tempEditTask = this.registerForm.value as EditTask;
    const modalRef = this.modalService.open(ProjectSearchModelComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.taskProject = result as TaskProject;
        this.registerForm.patchValue({
          taskId: this.tempEditTask.taskId,
          projectName: this.taskProject.taskProjectName,
          projectId: this.taskProject.taskProjectId,
          taskName: this.tempEditTask.taskName,
          isParentTask: this.tempEditTask.isParentTask,
          priority: this.tempEditTask.priority,
          parentTaskId: this.tempEditTask.parentTaskId,
          parentTaskName: this.tempEditTask.parentTaskName,
          startDate: this.tempEditTask.startDate,
          endDate: this.tempEditTask.endDate,
          userName: this.tempEditTask.userName,
          userId: this.tempEditTask.userName
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

  openParentTaskModal() {
    this.tempEditTask = this.registerForm.value as EditTask;
    const modalRef = this.modalService.open(TaskSearchModelComponent);
    console.log(this.taskProject.taskProjectId);
    modalRef.componentInstance.projectId = this.taskProject.taskProjectId;
    modalRef.result.then((result) => {
      if (result) {
        this.parentTask = result as ParentTask;
        this.registerForm.patchValue({
          taskId: this.tempEditTask.taskId,
          projectName: this.tempEditTask.projectName,
          projectId: this.tempEditTask.projectId,
          taskName: this.tempEditTask.taskName,
          isParentTask: this.tempEditTask.isParentTask,
          priority: this.tempEditTask.priority,
          parentTaskId: this.parentTask.parentTaskId,
          parentTaskName: this.parentTask.parentTaskName,
          startDate: this.tempEditTask.startDate,
          endDate: this.tempEditTask.endDate,
          userName: this.tempEditTask.userName,
          userId: this.tempEditTask.userName
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

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.editTask = this.registerForm.value as EditTask; // : AddTask
      console.log(this.registerForm.value);
      console.log(this.editTask);
      this.tasksService.updateTask(this.editTask).subscribe(result => {
        if (result.status === 'success') {
          this.toastrService.success('Success', 'Task created successfully');
          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/tasks']));
        }
      });
    }

  }

  onReset() {
    this.submitted = false;
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/tasks']));
  }

}
