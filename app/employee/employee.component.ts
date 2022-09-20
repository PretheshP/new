import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authenticate/auth.service';
import { EmpService } from './emp.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  depositmsg: string;
  servicemsg: string;
  deletemsg: string;
  viewCustomer: string;
  Accounterror: string;
  AccountType:any;

  constructor(private empService: EmpService,
    private router: Router,
    private authService:AuthService) { }

  ngOnInit() {
  }

  createAccount(id){
    let val=id.value;
    console.log(id);
    this.empService.getDetails(val).subscribe((out)=>{
      this.router.navigate(['/createAccount',val]);
    },error=>{
      this.Accounterror="Invalid CustomerID";
      id.resetForm();
    });
  }

  onDisplay(id){
    let val=id.value;
    this.empService.viewCustomer(val).subscribe((out)=>{
      console.log(out);
      this.router.navigate(['/viewCustomer',val]);
    },error=>{
      this.viewCustomer="Customer UserId DOES NOT EXISTS";
    });

  }

  

  onDeposit(f){
    console.log(f.value);
    let data={
      accountId:f.value.dId,
      amount:f.value.amount
    };

    this.empService.onDeposit(data)
    .subscribe((val)=>{
      console.log(val);
      this.depositmsg="Deposit Successfully Done..";
      this.router.navigate(['/employeedashboard']);
     // f.resetForm();
    },error=>{
      this.depositmsg="Deposit Failed..!";
    });
  }

  onServiceCharge(){
    var val=this.AccountType;
    this.empService.onServiceCharge(val).subscribe((val)=>{
      console.log(val);
      this.servicemsg="Service Charge Deducted";
    },error=>{
      this.servicemsg="Error in Service Charge Deduction";
      console.log(error);
    });
  }

}
