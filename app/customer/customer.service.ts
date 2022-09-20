import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { AuthService } from '../authenticate/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private httpClient: HttpClient,
    private authService: AuthService) { }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.authService.isAuthenticated.next(false);
    this.authService.logout();
  }

  customerDetails(id:string){
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
    
    withdraw(withdrawdetails){
      let header = new HttpHeaders().set(
        "Authorization",
        localStorage.getItem("token")
    );
    console.log(withdrawdetails);
    return this.httpClient.post("https://localhost:44386/api/Transaction/withdraw",withdrawdetails,{headers:header});
  }
  
  deposit(transferdetails){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
      // console.log()
      return this.httpClient.post("https://localhost:44386/api/Transaction/deposit",transferdetails,{headers:header});
    }
    
  getAccount(accountId) {
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
    return this.httpClient.get("https://localhost:44386/api/Transaction/getTransactions/"+accountId,{headers:header}); 
  }

  transfer(out){
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
      );
    return this.httpClient.post("https://localhost:44386/api/Transaction/transfer",out,{headers:header});
  }
}
  