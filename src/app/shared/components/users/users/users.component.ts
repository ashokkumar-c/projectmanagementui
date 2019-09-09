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
  selectedUserId: string;
  searchValue: string;
  sortedUsers: User[];
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
      this.selectedUsers = this.Users.sort();
    });
    this.editFlag = false;
  }

  editSelectedUser(id: string) {
    this.selectedUserId = id;
    this.usersService.getUser(this.selectedUserId).subscribe(result => {
      console.log(result);
      if (result['status'] === 'success') {
        this.editUser = result['data'][0] as EditUser;
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

  // Sorting functions
  sortBy(value: string) {
    this.sortedUsers = this.selectedUsers;
    if (value === 'firstName') {
      this.selectedUsers = this.sortedUsers.sort(this.sortFirstName);
    } else if (value === 'lastName') {
      this.selectedUsers = this.sortedUsers.sort(this.sortLastName);
    } else if (value === 'employeeId') {
      this.selectedUsers = this.sortedUsers.sort(this.sortEmpId);
    }
  }
  sortEmpId(u1: User, u2: User) {
    if (u1.employeeId < u2.employeeId) {
      return -1;
    }
    if (u1.employeeId > u2.employeeId) {
      return 1;
    }
    return 0;
  }
  sortFirstName(u1: User, u2: User) {
    if (u1.firstName < u2.firstName) {
      return -1;
    }
    if (u1.firstName > u2.firstName) {
      return 1;
    }
    return 0;
  }
  sortLastName(u1: User, u2: User) {
    if (u1.lastName < u2.lastName) {
      return -1;
    }
    if (u1.lastName > u2.lastName) {
      return 1;
    }
    return 0;
  }


}
