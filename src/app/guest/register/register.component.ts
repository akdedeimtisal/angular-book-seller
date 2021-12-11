import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  faUser = faUserCircle; //icon
  errorMessage: string = "";



  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(this.authenticationService.currentUserValue?.id) { // ID of currentUserValue is not undefined
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      if(err?.status === 409) {
        this.errorMessage = 'Username is already exist.';

      }
      else {
        this.errorMessage = 'Unexpected error';
        console.log(err);
      }
    } )
  }

}
