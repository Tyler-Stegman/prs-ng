import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineitemService } from 'src/app/service/lineitem.service';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  title: string = "Request"
  title2: string = "Line-Items"
  lineItemId: number = 0;
  request: Request = new Request();
  lineItems: LineItem[] = [];
  requestId: number = 0;

  constructor(private requestSvc: RequestService, private liSvc: LineitemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request found", this.request);
    });
    this.route.params.subscribe(parms => this.lineItemId = parms['id']);
    this.liSvc.list(this.lineItemId).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
    });
  }

}
