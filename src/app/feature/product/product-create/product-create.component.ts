import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title: string = "Product-Create";
  products: Product[] = [];
  vendors: Vendor[] = [];
  product: Product = new Product();
  submitBtnTitle: string = "Create";
  request: Request = new Request();

  constructor(private productSvc: ProductService, private sysSvc: SystemService, private vendorSvc: VendorService, private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
    });
  }

  create() {
    this.productSvc.create(this.product).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/product/list");
      }
      else {
        console.log("*** Error creating new product. ***", this.product, jr.errors)
        alert("Error creating Credit.  Please try again.");
      }
    });
  }
}
