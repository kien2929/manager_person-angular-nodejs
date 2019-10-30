import { ApiService } from './../api.service';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.css"]
})
export class PersonComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() gender: string;
  @Input() age: number;
  @Output() removePerson = new EventEmitter<number>();
  @Output() editPerson = new EventEmitter<number>();
  removeByClick() {
    this.removePerson.emit(this.id);
    this.apiService.getUsers()
  }
  editByClick() {
    this.editPerson.emit(this.id);
  }
  constructor(private apiService:ApiService) {}

  ngOnInit() {}
}
