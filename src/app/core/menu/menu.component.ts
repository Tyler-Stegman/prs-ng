import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem("Users", "/user/list", "User List"),
      new MenuItem("Vendors", "/vendor/list","Vendor List"),
      new MenuItem("Products", "/product/list", "Product List"),
    ];
  }

}
