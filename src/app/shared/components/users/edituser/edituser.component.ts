import { Component, OnInit, Input } from '@angular/core';
import { EditUser } from '../../../../core/models/users';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  @Input() childEditUserId: string;
  editUser: EditUser = {
    _id: '',
    userId: '',
    firstName: '',
    lastName: '',
    employeeId: ''
  };
  registerForm: FormGroup;
  submitted = false;

  constructor(private usersService: UsersService,
              private toastrService: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required],
      userId: [''],
      _id: ['']
    });
    this.usersService.getUser(this.childEditUserId).subscribe(result => {
      if (result['status'] === 'success') {
        this.editUser = result['data'][0] as EditUser;
        this.registerForm.setValue({
          firstName: this.editUser.firstName,
          lastName: this.editUser.lastName,
          employeeId: this.editUser.employeeId,
          userId: this.editUser.userId,
          _id: this.editUser._id
        });      }
    });

  }

  get getControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.editUser = this.registerForm.value as EditUser;
      this.usersService.updateUser(this.editUser).subscribe(result => {
        console.log(result);
        if (result['status'] === 'success') {
          this.toastrService.success('Success', 'User udpated successfully');
          this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/manageusers']));
        }
      });
    }
  }

  cancelupdate() {
    this.submitted = false;
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/manageusers']));
  }

}
