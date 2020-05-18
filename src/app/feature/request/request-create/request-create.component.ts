import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request-Edit";
  requests: Request[] = [];
  users: User[] = [];
  request: Request = new Request();
  submitBtnTitle: string = "Create";

  constructor(private requestSvc: RequestService, private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
    });
  }

  create() {
    this.requestSvc.create(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("*** Error creating new request. ***", this.request, jr.errors)
        alert("Error creating Request.  Please try again.");
      }
    });
  }
}
