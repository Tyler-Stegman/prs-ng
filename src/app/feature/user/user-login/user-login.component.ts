import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  message: string = '';
  user: User = new User();

  constructor(private userSvc: UserService,
              protected sysSvc: SystemService,
              private router: Router) {
  }

  ngOnInit() {
    this.user.userName = 'tstegman';
    this.user.password = 'irish';

    this.sysSvc.loggedInUser = null;
  }

  login() {
    console.log("login called for user:", this.user);
    this.userSvc.login(this.user).subscribe(jr => {
      console.log("jr:", jr);
      if (jr.errors == null) {
        if (jr.data == null) {
          this.message = "Invalid Username/Password combination.  Please retry";
        }
        else {
          this.user = jr.data as User;
          this.sysSvc.loggedInUser = this.user;
          console.log("setting user in sysSvc...", this.sysSvc.loggedInUser);
          this.router.navigateByUrl('/home');
        }
      }
      else {
        this.message = "Invalid Username/Password combination.  Please retry";
      }
    });
  }

}


