import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title: string = "Request-Review";
  requests: Request[] = [];
  user: User = new User;

  constructor(private requestSvc: RequestService, private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    this.requestSvc.listRequestsForReview(this.user.id).subscribe(jr => {
      this.requests = jr.data as Request[];
      console.log("List of Requests", this.requests);
    });
  }
}
