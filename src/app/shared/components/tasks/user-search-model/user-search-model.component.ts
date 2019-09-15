import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../../core/services/users/users.service';
import { User } from '../../../../core/models/users/viewUser.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TaskUser} from '../../../../core/models/tasks';

@Component({
  selector: 'app-user-search-model',
  templateUrl: './user-search-model.component.html',
  styleUrls: ['./user-search-model.component.css']
})
export class UserSearchModelComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Output() emitService = new EventEmitter();
  Users: User[];
  taskUserName: string;
  taskUser: TaskUser = {
    taskUserId : '',
    taskUserName : ''
  };
  searchText: string;
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    public activeModalService: NgbActiveModal) { }

  ngOnInit() {
  }

  passBack() {
    // this.passEntry.emit(this.user);
    this.activeModalService.close(this.taskUser);
    // this.emitService.next(this.manager);
  }

  close() {
    this.activeModalService.close();
  }

  search() {
    this.usersService.searchUsers(this.searchText).subscribe(result => {
      this.Users = result['data'] as User[];
    });
  }
  onChange($event) {
    this.taskUser.taskUserId = $event.target.value;
    this.taskUser.taskUserName = $event.target.options[$event.target.options.selectedIndex].text;
  }
}
