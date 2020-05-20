import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: '../vendor-maint-shared/vendor-maint-shared.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
  title: string = "Vendor-Create";
  vendor: Vendor = new Vendor();
  submitBtnTitle: string = "Create";
  request: Request = new Request();

  constructor(private vendorSvc: VendorService, private sysSvc: SystemService, private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
  }

  save() {
    this.vendorSvc.create(this.vendor).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/vendor/list");
      }
      else {
        console.log("*** Error creating new vendor. ***", this.vendor, jr.errors);
      }
    });
  }
}
