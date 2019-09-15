import { Component, OnInit, NgModule } from '@angular/core';
import { AddProject } from '../../../../core/models/projects/addProject.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../core/helper/must-match.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagerSearchModelComponent } from '../manager-search-model/manager-search-model.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { Manager } from '../../../../core/models/users/manager.model';
import { ProjectsService } from '../../../../core/services/projects/projects.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  manager: Manager = {
    managerId: '',
    managerName: ''
  };
  newAddProject: AddProject = {
    projectName: '',
    managerId: 0,
    managerName: '',
    setDates: false,
    startDate: null,
    endDate: null,
    isSuspended: false,
    priority: 0,
    noOfTasks: 0
  };
  tempNewAddProject: AddProject = {
    projectName: '',
    managerId: 0,
    managerName: '',
    setDates: false,
    startDate: null,
    endDate: null,
    isSuspended: false,
    priority: 0,
    noOfTasks: 0
  };

  modalOptions: NgbModalOptions;
  submitted = false;
  registerForm: FormGroup;
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
      projectName: ['', Validators.required],
      setDates: [''],
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      endDate: formatDate(new Date().setDate(new Date().getDate() + 1 ), 'yyyy-MM-dd', 'en-US'),
      priority: ['', Validators.required],
      managerName: ['', Validators.required],
      managerId: ['', Validators.required]
    });
  }

  get getControls() {
    return this.registerForm.controls;
  }

  openModal() {
    this.tempNewAddProject = this.registerForm.value as AddProject;
    const modalRef = this.modalService.open(ManagerSearchModelComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.manager = result as Manager;
        this.registerForm.patchValue({
          managerName: this.manager.managerName,
          managerId: this.manager.managerId,
          projectName: this.tempNewAddProject.projectName,
          setDates: this.tempNewAddProject.setDates,
          startDate: this.tempNewAddProject.startDate,
          endDate: this.tempNewAddProject.endDate,
          priority: this.tempNewAddProject.priority
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
      this.newAddProject = this.registerForm.value as AddProject; // : AddUser
      this.projectService.addProject(this.newAddProject).subscribe(result => {
        if (result.status === 'success') {
          this.toastrService.success('Success', 'Proejct created successfully');
          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/projects']));
        }
      });
    }

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
