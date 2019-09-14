import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../../core/services/users/users.service';
import { User } from '../../../../core/models/users/viewUser.model';
import { Manager } from '../../../../core/models/users/manager.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manager-search-model',
  templateUrl: './manager-search-model.component.html',
  styleUrls: ['./manager-search-model.component.css']
})
export class ManagerSearchModelComponent implements OnInit {

  //registerForm: FormGroup;
  // @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Output() emitService = new EventEmitter();
  modalOptions: NgbModalOptions;
  Users: User[];
  managerName: string;
  manager: Manager = {
    managerId : '',
    managerName : ''
  };
  searchText: string;


  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    public activeModalService: NgbActiveModal) { }

  ngOnInit() {
    // console.log(this.user);
    // this.usersService.getAllUsers().subscribe(result => {
    //   this.Users = result['data'] as User[];
    // });
    // this.registerForm = this.formBuilder.group({
    //   managerName: [{value: '', disabled: true}, Validators.required],
    //   managerId: ['', Validators.required],
    //   searchText: ['']
    // });
  }

  // get getControls() {
  //   return this.registerForm.controls;
  // }
  passBack() {
    // this.passEntry.emit(this.user);
    this.activeModalService.close(this.manager);
    //this.emitService.next(this.manager);
  }

  close() {
    this.activeModalService.close();
  }
  search() {
    this.usersService.searchUsers(this.searchText).subscribe(result => {
      this.Users = result["data"] as User[];
    });
  }

  onChange($event) {
    this.manager.managerId = $event.target.value;
    this.manager.managerName = $event.target.options[$event.target.options.selectedIndex].text;
  }

}
