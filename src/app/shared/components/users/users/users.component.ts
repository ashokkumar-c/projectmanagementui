import { Component, OnInit, Input } from '@angular/core';
import { User, AddUser, EditUser } from '../../../../core/models/users';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  editFlag: boolean;
  Users: User[];
  selectedUsers: User[];
  public editUser: EditUser = {
    _id: '',
    firstName: '',
    lastName: '',
    employeeId: '',
    userId: ''
  };
  constructor(private usersService: UsersService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(result => {
      this.Users = result['data'] as User[];
      this.selectedUsers = this.Users;
    });
    this.editFlag = false;
  }

  editSelectedUser(id: string) {
    this.usersService.getUser(id).subscribe(result => {
      console.log(result);
      if (result['status'] === 'success') {
        this.editUser = result['data'] as EditUser;
        console.log('inside result');
        console.log(this.editUser);
      }
    });
    this.editFlag = true;
  }
  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe(result => {
      console.log(result);
      if (result.status === 'success') {
        this.toastrService.success('Success', 'User deleted successfully.');
        this.ngOnInit();
      }
    });
  }


}
