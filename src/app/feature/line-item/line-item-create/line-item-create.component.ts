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
  requests: Request[] = [];
  products: Product[] = [];
  lineItem: LineItem = new LineItem();
  submitBtnTitle: string = "Create";

  constructor(private liSvc: LineitemService, private productSvc: ProductService, private requestSvc: RequestService, private sysSvc: SystemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];
    });
  }
  create() {
    this.liSvc.create(this.lineItem).subscribe(jr => {
      if(jr.errors == null){
        this.router.navigateByUrl("/line-item/line-item-list");
      }
      else {
        console.log("*** Error creating line-item. ***", this.lineItem, jr.errors)
        alert("Error creating Line Item.  Please try again.");
      }
    });
  }
}
