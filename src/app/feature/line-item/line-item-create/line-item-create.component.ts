import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineitemService } from 'src/app/service/lineitem.service';
import { SystemService } from 'src/app/service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = "Line-Item-Create";
  request: Request = null;
  requestId: number = 0;
  products: Product[] = [];
  lineItem: LineItem = new LineItem();
  submitBtnTitle: string = "Create";

  constructor(private liSvc: LineitemService, private productSvc: ProductService, private requestSvc: RequestService, private sysSvc: SystemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
    //get the request id from the URL
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      this.lineItem.request = this.request;
    });
  }
  create() {
    this.liSvc.create(this.lineItem).subscribe(jr => {
      if(jr.errors == null){
        console.log(jr.data);
        this.ngOnInit();
        //this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("*** Error creating line-item. ***", this.lineItem, jr.errors)
        alert("Error creating Line Item.  Please try again.");
      }
    });
  }
}
