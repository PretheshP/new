import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpService {
  
  customerdetails 
  
  constructor(private http: HttpClient) { }

 /* customerDetails(id:string){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
      return this.httpClient.get("https://localhost:44319/api/Customer/getCustomerDetails/"+id,{headers:header});
    }
    customerAccountDetails(id:string){
      let header = new HttpHeaders().set(
        "Authorization",
        localStorage.getItem("token")
        );
        return this.httpClient.get("https://localhost:44379/api/Account/getCustomerAccounts/"+id,{headers:header});
      }
  */
  getDetails(val: any) {
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
    return this.http.get("https://localhost:44319/api/Customer/getCustomerDetails/"+val,{headers:header});
  }

  createCustomer(cust){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
    return this.http.post("https://localhost:44319/api/Customer/createCustomer",cust,{headers: header});
  }

  viewCustomer(id){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
    return this.http.get("https://localhost:44319/api/Customer/getCustomerDetails/"+id,{headers: header});
  }

  viewAccount(id){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
    return this.http.get("https://localhost:44379/api/Account/getCustomerAccounts/"+id,{headers: header});
  }

  createAccount(value,id){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
    return this.http.post("https://localhost:44379/api/Account/createAccount",id,{headers:header});
  }

  onDeposit(val){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
    );
    return this.http.post("https://localhost:44379/api/Account/deposit",val,{headers:header});
  }

 
  onServiceCharge(val){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
    );
    return this.http.post("https://localhost:44375/api/rules/api/Rules/GetServiceCharge"+val,{headers:header});
  }

}
