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
import { DatePipe, formatDate } from '@angular/common';



@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  projectId: string;
  tempNewAddTask: AddTask = {
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
  newTask: AddTask = {
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
    this.registerForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectId: [''],
      taskName: ['', Validators.required],
      isParentTask: [false],
      priority: [''],
      parentTaskId: [''],
      parentTaskName: [''],
      startDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required],
      endDate: [formatDate(new Date().setDate(new Date().getDate() + 1 ), 'yyyy-MM-dd', 'en-US'), Validators.required],
      userName: [''],
      userId: ['']
    }, {validator: this.dateLessThan('startDate', 'endDate')});

    this.onFormChanges();
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
    this.tempNewAddTask = this.registerForm.value as AddTask;
    const modalRef = this.modalService.open(UserSearchModelComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.taskUser = result as TaskUser;
        this.registerForm.patchValue({
          projectName: this.tempNewAddTask.projectName,
          projectId: this.tempNewAddTask.projectId,
          taskName: this.tempNewAddTask.taskName,
          isParentTask: this.tempNewAddTask.isParentTask,
          priority: this.tempNewAddTask.priority,
          parentTaskId: this.tempNewAddTask.parentTaskId,
          parentTaskName: this.tempNewAddTask.parentTaskName,
          startDate: this.tempNewAddTask.startDate,
          endDate: this.tempNewAddTask.endDate,
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
    this.tempNewAddTask = this.registerForm.value as AddTask;
    const modalRef = this.modalService.open(ProjectSearchModelComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.taskProject = result as TaskProject;
        this.registerForm.patchValue({
          projectName: this.taskProject.taskProjectName,
          projectId: this.taskProject.taskProjectId,
          taskName: this.tempNewAddTask.taskName,
          isParentTask: this.tempNewAddTask.isParentTask,
          priority: this.tempNewAddTask.priority,
          parentTaskId: this.tempNewAddTask.parentTaskId,
          parentTaskName: this.tempNewAddTask.parentTaskName,
          startDate: this.tempNewAddTask.startDate,
          endDate: this.tempNewAddTask.endDate,
          userName: this.tempNewAddTask.userName,
          userId: this.tempNewAddTask.userName
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
    this.tempNewAddTask = this.registerForm.value as AddTask;
    const modalRef = this.modalService.open(TaskSearchModelComponent);    
    modalRef.componentInstance.projectId = this.taskProject.taskProjectId;
    modalRef.result.then((result) => {
      if (result) {
        this.parentTask = result as ParentTask;
        this.registerForm.patchValue({
          projectName: this.tempNewAddTask.projectName,
          projectId: this.tempNewAddTask.projectId,
          taskName: this.tempNewAddTask.taskName,
          isParentTask: this.tempNewAddTask.isParentTask,
          priority: this.tempNewAddTask.priority,
          parentTaskId: this.parentTask.parentTaskId,
          parentTaskName: this.parentTask.parentTaskName,
          startDate: this.tempNewAddTask.startDate,
          endDate: this.tempNewAddTask.endDate,
          userName: this.tempNewAddTask.userName,
          userId: this.tempNewAddTask.userName
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
      this.newTask = this.registerForm.value as AddTask; // : AddTask
      this.tasksService.addTask(this.newTask).subscribe(result => {
        if (result.status === 'success') {
          this.toastrService.success('Success', 'Task created successfully');
          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/tasks/add']));
        }
      });
    }

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const f = group.controls[from];
      const t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: 'Date from should be less than Date to'
        };
      }
      return {};
    };
  }
}
