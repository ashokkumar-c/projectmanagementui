import { Component, OnInit, NgModule, Input } from '@angular/core';
import { EditProject } from '../../../../core/models/projects';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../core/helper/must-match.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagerSearchModelComponent } from '../manager-search-model/manager-search-model.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { Manager } from '../../../../core/models/users/manager.model';
import { ProjectsService } from '../../../../core/services/projects/projects.service';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {

  @Input() childEditProjectId: string;
  manager: Manager = {
    managerId: '',
    managerName: ''
  };
  editProject: EditProject = {
    projectId: null,
    projectName : '',
    managerId : 0,
    managerName: '',
    setDates: false,
    startDate: null,
    endDate: null,
    priority: 0
  };
  tempEditProject: EditProject = {
    projectId: null,
    projectName : '',
    managerId : 0,
    managerName: '',
    setDates: false,
    startDate: null,
    endDate: null,
    priority: 0
  };

  modalOptions: NgbModalOptions;
  submitted = false;
  registerForm: FormGroup;
  datePipe = new DatePipe('en-US');
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private projectService: ProjectsService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      projectId: [''],
      projectName: ['', Validators.required],
      setDates: [''],
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      endDate: formatDate(new Date().setDate(new Date().getDate() + 1 ), 'yyyy-MM-dd', 'en-US'),
      priority: ['', Validators.required],
      managerName: ['', Validators.required],
      managerId: ['', Validators.required]
    });

    this.projectService.getProject(this.childEditProjectId).subscribe(result => {
      if (result['status'] === 'success') {
        this.editProject = result['data'][0] as EditProject;
        this.registerForm.setValue({
          projectId: this.editProject.projectId,
          projectName: this.editProject.projectName,
          setDates: this.editProject.setDates,
          startDate: this.datePipe.transform(this.editProject.startDate, 'yyyy-MM-dd'),
          endDate: this.datePipe.transform(this.editProject.endDate, 'yyyy-MM-dd'),
          managerId: this.editProject.managerId,
          managerName: this.editProject.managerName,
          priority: this.editProject.priority
        });
      }
    });
  }

  get getControls() {
    return this.registerForm.controls;
  }

  openModal() {
    const modalRef = this.modalService.open(ManagerSearchModelComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.manager = result as Manager;
        this.tempEditProject = this.registerForm.value as EditProject;
        this.registerForm.patchValue({
          managerName: this.manager.managerName,
          managerId: this.manager.managerId,
          projectId: this.tempEditProject.projectId,
          projectName: this.tempEditProject.projectName,
          setDate: this.tempEditProject.setDates,
          startDate: this.tempEditProject.startDate,
          endDate: this.tempEditProject.endDate,
          priority: this.tempEditProject.priority
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
      this.editProject = this.registerForm.value as EditProject; // : edit project
      this.projectService.updateProject(this.editProject).subscribe(result => {
        if (result.status === 'success') {
            this.toastrService.success('Success', 'Project udpated successfully');
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/projects']));
        }
      });
    }

  }

  cancelupdate() {
    this.submitted = false;
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/projects']));
  }

}
