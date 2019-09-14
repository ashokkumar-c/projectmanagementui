import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manager-search-model',
  templateUrl: './manager-search-model.component.html',
  styleUrls: ['./manager-search-model.component.css']
})
export class ManagerSearchModelComponent implements OnInit {

  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public my_modal_title;
  @Input() public my_modal_content;
  @Output() emitService = new EventEmitter();
  closeResult: string;
  modalOptions: NgbModalOptions;
  constructor(
              public activeModalService: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.user);
  }

  passBack() {
    this.passEntry.emit(this.user);
    this.activeModalService.close(this.user);
    this.emitService.next(this.user);
  }

}
