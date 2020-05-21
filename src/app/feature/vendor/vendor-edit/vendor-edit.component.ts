import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: '../vendor-maint-shared/vendor-maint-shared.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {
  title: string = "Vendor-Edit";
  submitBtnTitle: string = "Edit";
  vendor: Vendor = new Vendor();
  vendors: Vendor[] = [];
  vendorId: number = 0;
  request: Request = new Request();

  constructor(private vendorSvc: VendorService, private sysSvc: SystemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.vendorId = parms["id"]);
    this.vendorSvc.get(this.vendorId).subscribe(jr => {
      this.vendor = jr.data as Vendor;
    });
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
    });
  }

  save() {
    this.vendorSvc.edit(this.vendor).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/vendor/list");
      }
      else {
        console.log("*** Error editing vendor. ***", this.vendor, jr.errors);
      }
    });
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}
