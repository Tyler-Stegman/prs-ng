import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem("Home", "/home", "Home Page"),
      //new MenuItem("Welcome", "/welcome", "Welcome Page"),
      new MenuItem("Users", "/user/list", "User List"),
      new MenuItem("Vendors", "/vendor/list","Vendor List"),
      new MenuItem("Products", "/product/list", "Product List"),
      new MenuItem("Requests", "/request/list", "Request List")];
     // new MenuItem("Review", "/request/review", "Request Review List"),
     // new MenuItem("Login", "/user/login", "Login")];
     if (this.sysSvc.isReviewer()) {
       this.menuItems.push(new MenuItem("Review", "/request/review", "Request Review List"));
     }
     this.menuItems.push(new MenuItem("Login", "/user/login", "Login"));
  }

}
