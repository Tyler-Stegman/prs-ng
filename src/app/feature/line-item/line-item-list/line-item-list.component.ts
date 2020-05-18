import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { LineitemService } from 'src/app/service/lineitem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';

@Component({
  selector: 'app-line-item-list',
  templateUrl: './line-item-list.component.html',
  styleUrls: ['./line-item-list.component.css']
})
export class LineItemListComponent implements OnInit {
  title1: string = "Purchase Request Line-Items";
  title2: string = "Lines";
  request: Request = null;
  requestId: number = 0;
  lineItems: LineItem[] = [];
  lineTotal: number = 0;

  constructor(private requestSvc: RequestService, private liSvc: LineitemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });
    this.liSvc.list(this.requestId).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
    });
  }
}
