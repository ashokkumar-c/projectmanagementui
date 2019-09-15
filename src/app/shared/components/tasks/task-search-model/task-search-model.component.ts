import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TasksService } from '../../../../core/services/tasks/tasks.service';
import { Task, ParentTask } from '../../../../core/models/tasks';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-search-model',
  templateUrl: './task-search-model.component.html',
  styleUrls: ['./task-search-model.component.css']
})
export class TaskSearchModelComponent implements OnInit {
  @Input() projectId: string;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Output() emitService = new EventEmitter();

  Tasks: Task[];
  parentTaskName: string;
  parentTask: ParentTask = {
    parentTaskId: '',
    parentTaskName: ''
  };
  searchText: string;
  constructor(
    private tasksService: TasksService,
    private formBuilder: FormBuilder,
    public activeModalService: NgbActiveModal) { }

  ngOnInit() {
  }

  passBack() {
    // this.passEntry.emit(this.user);
    this.activeModalService.close(this.parentTask);
    // this.emitService.next(this.manager);
  }

  close() {
    this.activeModalService.close(this.parentTask);
  }

  search() {
    this.tasksService.getParentTasksByProjectId(this.projectId, this.searchText).subscribe(result => {
      console.log(result);
      this.Tasks = result['data'] as Task[];
    });
  }
  onChange($event) {
    this.parentTask.parentTaskId = $event.target.value;
    this.parentTask.parentTaskName = $event.target.options[$event.target.options.selectedIndex].text;
  }
}
