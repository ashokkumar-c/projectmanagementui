import { Component, OnInit, Input, OnChanges } from '@angular/core';
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

  @Input() childEditUser: EditUser;

  constructor(private usersService: UsersService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {
    console.log('inside edit screen');
    console.log(this.childEditUser);
    console.log(this.childEditUser._id);
  }

  updateuser() {
    console.log(this.childEditUser);
    this.usersService.updateUser(this.childEditUser).subscribe(result => {
      console.log(result);
      if (result['status'] === 'success') {
        this.toastrService.success('Success', 'User udpated successfully');
        this.router.navigate(['/home']);
      }
    });
  }

}
