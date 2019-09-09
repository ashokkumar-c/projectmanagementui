import { Component, OnInit, Input } from '@angular/core';
import { EditUser } from '../../../../core/models/users';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  @Input() childEditUserId: string;
  editUser: EditUser;

  constructor(private usersService: UsersService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {
    console.log('inside edit screen');
    this.usersService.getUser(this.childEditUserId).subscribe(result => {
      if (result['status'] === 'success') {
        this.editUser = result['data'][0] as EditUser;
      }
    });
  }

  updateuser() {
    this.usersService.updateUser(this.editUser).subscribe(result => {
      console.log(result);
      if (result['status'] === 'success') {
        this.toastrService.success('Success', 'User udpated successfully');
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/manageusers']));
      }
    });
  }

  cancelupdate() {
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/manageusers']));
  }

}
