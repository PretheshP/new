import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  depositdrawmsg:string;
  customerValue=null;
  customerAcc=null;
  transfermsg:string;
  withdrawmsg:string;
  userId:string;
  display=false;
  selectedValue:string;
  transactions;

  constructor(
    private customerservice:CustomerService,
    private router:Router
    ) { }

    ngOnInit() {
      this.userId = window.localStorage.getItem('userId');
      console.log(this.userId);
      this.getCustomerDetails();
      this.getCustomerAccountDetails();
    }

    onSelectedChange(val){
      console.log(val);
      this.selectedValue = val;
    }
//this.userId
    onDisplay(){
     // var id=f.value;
    // {{debugger}}
      this.customerservice.getAccount(this.userId).subscribe((val)=>{
        this.transactions = val;
        console.log(this .transactions);
        this.display=true;
      },error=>{
        console.log("Error Occured");
      })
    }


  getCustomerDetails(){
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
  }

  onTransfer(out){
    console.log(out.value);
  let transactionInput={
    Source_AccountId: out.value.SourceAccount,
    Target_AccountId: out.value.targetAccount,
    amount: out.value.amount
  };
  console.log(transactionInput);
    this.customerservice.transfer(transactionInput).subscribe((val)=>{
      console.log(val);
      this.getCustomerDetails();
      this.transfermsg="Successfull Transaction...";
      window.location.reload();
    },error=>{
      this.transfermsg="Transaction Failed..";
      
    })
    this.getCustomerDetails();
  }

 
  onDeposit(detail){
    console.log(detail.value);

    let value={

      AccountId:detail.value.dId,

      amount:detail.value.amount

    };

    this.customerservice.deposit(value).subscribe((out)=>{

      this.depositdrawmsg="Amount Successfully Deposited to Account";

      this.router.navigate(['/customerdashboard']);

      window.location.reload();

    },error=>{

      this.depositdrawmsg=" Deposit failed..!";

    });

  }
  onWithdraw(details){
    {{debugger}}
    console.log(details.value);
    let values={
      AccountId:details.value.aId,
      amount:details.value.amount
    };
    this.customerservice.withdraw(values).subscribe((out)=>{
      this.withdrawmsg="Amount Successfully Withdrawn from Account";
      this.router.navigate(['/customerdashboard']);
      window.location.reload();
    },error=>{
      this.withdrawmsg="Please maintain minimum balance..";
    });
  }

}
