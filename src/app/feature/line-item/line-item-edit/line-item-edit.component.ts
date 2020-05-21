import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineitemService } from 'src/app/service/lineitem.service';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {
  title: string = "Line-Item-Edit";
  lineItem: LineItem = new LineItem();
  lineItemId: number = 0;
  products: Product[] = [];
  submitBtnTitle: String = "Save";
  requestId: number = 0;
  request: Request = new Request();

  constructor(private liSvc: LineitemService, private productSvc: ProductService, private sysSvc: SystemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.lineItemId = parms["id"]);
    this.liSvc.get(this.lineItemId).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
    });
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  save() {
    this.liSvc.edit(this.lineItem).subscribe(jr => {
      if(jr.errors == null){
        this.router.navigateByUrl("/request/request-lines/" + this.lineItem.request.id);
      }
      else {
        console.log("*** Error editing line item. ***", this.lineItem, jr.errors);
        alert("Error editing Line Item.  Please try again.");
      }
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }
}
