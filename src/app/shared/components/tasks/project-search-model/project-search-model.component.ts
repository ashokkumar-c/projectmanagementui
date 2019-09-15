import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from '../../../../core/services/projects/projects.service';
import { Project } from '../../../../core/models/projects/viewProject.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskProject} from '../../../../core/models/tasks';

@Component({
  selector: 'app-project-search-model',
  templateUrl: './project-search-model.component.html',
  styleUrls: ['./project-search-model.component.css']
})
export class ProjectSearchModelComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Output() emitService = new EventEmitter();
  Projects: Project[];
  taskProjectName: string;
  taskProject: TaskProject = {
    taskProjectId : '',
    taskProjectName : ''
  };
  searchText: string;
  constructor(
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    public activeModalService: NgbActiveModal) { }

  ngOnInit() {
  }

  passBack() {
    // this.passEntry.emit(this.user);
    this.activeModalService.close(this.taskProject);
    // this.emitService.next(this.manager);
  }

  close() {
    this.activeModalService.close();
  }

  search() {
    this.projectsService.searchProjects(this.searchText).subscribe(result => {
      this.Projects = result['data'] as Project[];
    });
  }
  onChange($event) {
    this.taskProject.taskProjectId = $event.target.value;
    this.taskProject.taskProjectName = $event.target.options[$event.target.options.selectedIndex].text;
  }

}
