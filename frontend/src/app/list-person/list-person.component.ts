import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-list-person",
  templateUrl: "./list-person.component.html",
  styleUrls: ["./list-person.component.css"]
})
export class ListPersonComponent implements OnInit {
  name = "";
  age = 0;
  gender = "";
  id;
  feedbackname = "";
  feedbackgender = "";
  feedbackage = "";
  arrPerson;
  user;
  addPerson() {
    if (this.id) {
      this.user = { name: this.name, gender: this.gender, age: this.age };
      this.apiService.editUser(this.id, this.user).subscribe((res) => {
        this.apiService.getUsers().subscribe((data) => {
          this.arrPerson = data;
          this.id = 0;
          this.name = "";
          this.age = 0;
          this.gender = "";
        });
      });
    } else {
      if (this.gender == "" || this.name == "" || this.age == 0) {
        console.log("1");
        if (this.gender == "") {
          this.feedbackgender = "Please choose here";
        }
        if (this.name == "") {
          this.feedbackname = "Please insert here";
        }
        if (this.age == 0) {
          this.feedbackage = "Please insert here";
        }
      } else {
        //add
        this.feedbackage = "";
        this.feedbackgender = "";
        this.feedbackname = "";
        this.user = { name: this.name, gender: this.gender, age: this.age };
        console.log(this.user);
        this.apiService.addUser(this.user).subscribe((data) => {
          this.apiService.getUsers().subscribe((data) => {
            this.arrPerson = data;
          });
        });
        this.name = "";
        this.age = 0;
        this.gender = "";
      }
    }
  }
  removePersonByName(id: number) {
    this.apiService.removeUser(id).subscribe((res) => {
      this.apiService.getUsers().subscribe((data) => {
        this.arrPerson = data;
      });
    });
  }
  editPersonById(id: number) {
    this.user = { name: this.name, gender: this.gender, age: this.age };
    this.apiService.getUserById(id).subscribe((data) => {
      this.name = data[0].name;
      this.gender = data[0].gender;
      this.age = data[0].age;
      this.id = data[0].id;
    });
  }
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe((data) => {
      console.log(data);
      this.arrPerson = data;
    });
  }
}
