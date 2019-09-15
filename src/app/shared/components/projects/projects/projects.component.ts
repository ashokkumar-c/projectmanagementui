import { Component, OnInit, Input } from '@angular/core';
import { Project, AddProject, EditProject, SuspendProject } from '../../../../core/models/projects';
import { ToastrService } from 'ngx-toastr';
import { ProjectsService } from '../../../../core/services/projects/projects.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  editFlag: boolean;
  Projects: Project[];
  sortedProjects: Project[];
  selectedProjectId: string;
  searchProjectRequest: string;
  sortedUsers: Project[];
  public editProject: EditProject = {
    projectId: null,
    projectName: '',
    setDates: false,
    startDate: null,
    endDate: null,
    priority: 0,
    managerId: null,
    managerName: ''
  };
  constructor(private projectsService: ProjectsService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {

    this.projectsService.getAllProjects().subscribe(result => {
      this.Projects = result['data'] as Project[];     
    });
    this.editFlag = false;
  }

  search() {
      this.projectsService.searchProjects(this.searchProjectRequest).subscribe(result => {
      this.Projects = result['data'] as Project[];
    });
      this.editFlag = false;
      this.searchProjectRequest = '';
  }

  editSelectedProject(id: string) {
    this.selectedProjectId = id;
    this.projectsService.getProject(this.selectedProjectId).subscribe(result => {
      console.log(result);
      if (result['status'] === 'success') {
        this.editProject = result['data'][0] as EditProject;
      }
    });
    this.editFlag = true;

  }

  deleteProject(id: string) {

    const suspendProject: SuspendProject = {
      isSuspended: true,
      projectId: id,
      endDate: new Date()
    };
    console.log(suspendProject);
    this.projectsService.updateProject(suspendProject).subscribe(result => {
      if (result['status'] === 'success') {
        this.ngOnInit();
      }
    });
  }

  sortBy(value: string) {
    this.sortedProjects = this.Projects;
    if (value === 'startDate') {
      this.Projects = this.sortedProjects.sort(this.sortStartDate);
    } else if (value === 'endDate') {
      this.Projects = this.sortedProjects.sort(this.sortEndDate);
    } else if (value === 'Priority') {
      this.Projects = this.sortedProjects.sort(this.sortPriority);
    } else if (value === 'isSuspended') {
      this.Projects = this.sortedProjects.sort(this.sortStatus);
    }
  }
  sortStatus(p1: Project, p2: Project) {
    if (p1.isSuspended < p2.isSuspended) {
      return -1;
    }
    if (p1.isSuspended > p2.isSuspended) {
      return 1;
    }
    return 0;
  }
  sortPriority(p1: Project, p2: Project) {
    return p1.priority - p2.priority;
  }
  sortStartDate(p1: Project, p2: Project) {
    if (p1.startDate < p2.startDate) {
      return -1;
    }
    if (p1.startDate > p2.startDate) {
      return 1;
    }
    return 0;
  }
  sortEndDate(p1: Project, p2: Project) {
    if (p1.endDate < p2.endDate) {
      return -1;
    }
    if (p1.endDate > p2.endDate) {
      return 1;
    }
    return 0;
  }


}
