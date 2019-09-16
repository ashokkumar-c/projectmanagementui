import { Component, OnInit } from '@angular/core';
import { AddUser } from '../../../../core/models/users/addUser.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users/users.service';
import { MustMatch } from '../../../../core/helper/must-match.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  newAddUser: AddUser = {
    firstName: '',
    lastName: '',
    employeeId: '',
  };
  registerForm: FormGroup;
  submitted = false;
  constructor(private toastrService: ToastrService,
              private usersService: UsersService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
  }

  get getControls() {
    return this.registerForm.controls;
  }

  resetvalues() {
    this.newAddUser.firstName = '';
    this.newAddUser.lastName = '';
    this.newAddUser.employeeId = '';
    this.toastrService.success('Success', 'All fields cleared successfully');
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.newAddUser = this.registerForm.value as AddUser; // : AddUser
      this.usersService.addUser(this.newAddUser).subscribe(result => {
        if (result.status === 'success') {
            this.toastrService.success('Success', 'User created successfully');
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/manageusers']));
        }
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
