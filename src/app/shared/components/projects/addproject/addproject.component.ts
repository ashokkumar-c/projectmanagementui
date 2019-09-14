import { Component, OnInit, NgModule  } from '@angular/core';
import { AddUser } from '../../../../core/models/users/addUser.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../core/helper/must-match.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagerSearchModelComponent } from '../manager-search-model/manager-search-model.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  closeResult: string;
  modalOptions: NgbModalOptions;

  public user = {
    name: 'ashok',
    id: '21'
  };
  registerForm: FormGroup;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      project: ['', Validators.required],
      setDates: [''],
      startDate: [''],
      endDate: [''],
      priority: ['', Validators.required],
      managerName: ['', Validators.required],
      managerId: ['', Validators.required]
    });
  }

  get getControls() {
    return this.registerForm.controls;
  }
  openModal() {
    const modalRef = this.modalService.open(ManagerSearchModelComponent);
    modalRef.componentInstance.user = this.user;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
      console.log('inside emitted value');
      console.log(emmitedValue);
  });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
    });

  }

  open() {
    const modalRef = this.modalService.open(ManagerSearchModelComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
    modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
      console.log('inside emitted value');
      console.log(emmitedValue);
  });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {

  }
}
