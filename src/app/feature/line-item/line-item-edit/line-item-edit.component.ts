import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineitemService } from 'src/app/service/lineitem.service';
import { Product } from 'src/app/model/product.class';
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

  constructor(private liSvc: LineitemService, private productSvc: ProductService, private sysSvc: SystemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
    this.route.params.subscribe(parms => this.lineItemId = parms["id"]);
    this.liSvc.get(this.lineItemId).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
    });
  }

  save() {
    this.liSvc.edit(this.lineItem).subscribe(jr => {
      if(jr.errors == null){
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("*** Error editing line item. ***", this.lineItem, jr.errors);
      }
    });
  }
}
