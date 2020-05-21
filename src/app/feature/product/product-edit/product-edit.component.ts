import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: '../product-maint-shared/product-maint-shared.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "Product-Edit";
  vendors: Vendor[] = [];
  submitBtnTitle: string = "Edit";
  product: Product = new Product();
  productId: number = 0;
  request: Request = new Request();

  constructor(private sysSvc: SystemService, private productSvc: ProductService, private vendorSvc: VendorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(jr => {
      this.product = jr.data as Product;
    });
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
    });
  }

  save() {
    this.productSvc.edit(this.product).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/product/list");
      }
      else {
        console.log("*** Error editing product. ***", this.product, jr.errors);
      }
    });
  }

  compVendor(a: Vendor, b: Vendor): boolean{
    return a && b && a.id === b.id;
  }
}
