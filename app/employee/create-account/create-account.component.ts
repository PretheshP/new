import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  id: string;
  accId:string;
  createmsg: string;
  errormsg: string;
  constructor(private route:ActivatedRoute,
    private empService:EmpService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      this.id=params.get('id');
    })
  }

  createAccount(f){
    let account={
      "customerId":parseInt(this.id),
      "accountId":parseInt(this.accId),
      "balance":parseInt(f.value.Amount),
      "minBalance":1000,
      "accountType":f.value.accountType,
     
    };
    this.empService.createAccount(account,this.id).subscribe((val)=>{
      console.log(val);
      this.createmsg="Created Account";
    },error=>{
      console.log(error);
      this.errormsg="Error in Account Creation"
    })
  }

}
