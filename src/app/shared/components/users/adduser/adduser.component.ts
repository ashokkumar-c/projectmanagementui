import { Component, OnInit } from '@angular/core';
import { AddUser } from '../../../../core/models/users/addUser.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users/users.service';


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
  constructor(private toastrService: ToastrService,
              private usersService: UsersService,
              private router: Router, ) { }

  ngOnInit() {
  }

  resetvalues() {
    this.newAddUser.firstName = '';
    this.newAddUser.lastName = '';
    this.newAddUser.employeeId = '';
    this.toastrService.success('Success', 'All fields cleared successfully');
  }

  adduser() {
    this.usersService.addUser(this.newAddUser).subscribe(result => {
      if (result.status === 'success') {
        this.toastrService.success('Success', 'User created successfully');
        //this.router.navigate(['/home']);
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/manageusers']));
      }
    });
  }

}
