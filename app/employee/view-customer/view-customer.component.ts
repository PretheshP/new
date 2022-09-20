import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  accountDetails;
  custDetails;
  constructor(private empService:EmpService,
    private route:ActivatedRoute) { }

  ngOnInit() {
  //  this.userId = window.localStorage.getItem('userId');
  //    console.log(this.userId);
  //    this.getCustomerDetails();
  //    this.getCustomerAccountDetails();
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      console.log(id);
    });

 /* getCustomerDetails(){
    this.customerservice.customerDetails(this.userId).subscribe((val)=>{
      console.log(val);
      this.customerValue=val;
      
    })
  }
  getCustomerAccountDetails(){
    this.customerservice.customerAccountDetails(this.userId).subscribe((val)=>{
      console.log(val);
      this.customerAcc=val;
      
    })
  }   */

    let id=this.route.snapshot.params.id;
    console.log(id);
    this.custDetails = this.empService.viewCustomer(id).subscribe((val)=>{
      this.custDetails = val;
      console.log(this.custDetails);
    });

     this.accountDetails = this.empService.viewAccount(id).subscribe((val)=>{
    this.accountDetails = val;
    console.log(this.accountDetails);
  });   

  }
}
