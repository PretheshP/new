import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:boolean=false;
  errorMessage="";
  
  href="";
  role="";
  customer: boolean;
  employee: boolean;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.href=this.router.url;
    console.log(this.href);
    if(this.router.url=='/loginCustomer'){
      this.customer = true;
      this.role="Customer Login";
      this.employee=false;
    }
    else{
      this.role="Employee Login";
      this.customer=false;
      this.employee=true;
    }
  }

  onSubmit(f){
    console.log(f);
    if(this.href==='/loginCustomer'){
      let user={
        "userId": parseInt(f.value.Id),
        "password": f.value.password,
        "role": "Customer"
      };
      console.log(user);
      this.authService.loginuser(user).subscribe((val:{userId:number,authToken:string,role:string})=>{
        console.log(user);
        window.localStorage.setItem("token",val.authToken);
        window.localStorage.setItem('userId',JSON.stringify(user.userId));
        this.authService.isAuthenticated.next(true);
        this.router.navigate(['/customerdashboard']); 
      },err=>{
        this.error=true;
        this.authService.isAuthenticated.next(false);
        this.errorMessage="Username/Password is incorrect... Please check";
      });
    }
    else{
      if(this.href==='/loginEmployee'){
        let user={
          "userId": parseInt(f.value.Id),
          "password": f.value.password,
          "role": "Employee"
        };
        console.log(user);
        this.authService.loginuser(user).subscribe((val:{userid:number,authToken:string,role:string})=>{
          console.log(user);
          window.localStorage.setItem("token",val.authToken);
          window.localStorage.setItem('userId',JSON.stringify(user.userId));
          this.authService.isAuthenticated.next(true);
          this.router.navigate(['/employeedashboard']);  
        },(error)=>{
          this.error=true;
          this.authService.isAuthenticated.next(false);
          this.errorMessage="Username/Password is incorrect... Please check";
        });
      }
    }
  }

}