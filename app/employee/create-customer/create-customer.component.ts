import { Component, ElementRef, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { timeout } from 'rxjs/operators';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  createmsg: string;
  errormsg: string;

  constructor(private elementRef:ElementRef,
    private empService: EmpService
    ) { }

  ngOnInit() {
  }

  onSubmit(f){
    let cust={
      "customerId":parseInt(f.value.Id),
      "name":f.value.username,
      "password":f.value.password,
      "dob":new Date(f.value.dob),
      "paNno":f.value.pan,
      "address":f.value.address
    };
    console.log(cust);
    this.empService.createCustomer(cust).subscribe((val)=>{
      console.log(val);
      this.createmsg="Customer Created Successfully";
      f.resetForm();
    },error=>{
      console.log(error);
      this.errormsg="Customer Not Created... Error Creating.."
    })
  }
}
