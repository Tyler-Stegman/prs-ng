import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: '../user-maint-shared/user-maint/user-maint.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  title: string = "User-Create";
  user: User = new User();
  submitBtnTitle: string = "Create";

  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  save() {
    this.userSvc.create(this.user).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/user/list");
      }
      else {
        console.log("*** Error creating new user. ***", this.user, jr.errors);
      }
    });
  }
}
