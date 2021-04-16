import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { customerState } from "../store/reducers";
import * as storeActions from "../store/actions";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  customers: storeActions.Customers;
  customerDetails$: Observable<customerState>;
  storeSubscribe: Subscription;

  constructor(private store: Store<{ customersStore: customerState }>) {
    this.customerDetails$ = store.pipe(select("customersStore"));
  }

  getCustomers() {
    let stored_customers = localStorage.getItem("assessment_customer_details");
    if (stored_customers) {
      this.customers = JSON.parse(stored_customers);
    } else {
      localStorage.setItem(
        "assessment_customer_details",
        JSON.stringify({ customers: [] })
      );
      this.customers = { customers: [] };
    }
    // this.store.dispatch(storeActions.updateCustomers({ info: this.customers }));
    this.updateCustomers(this.customers);
  }

  updateCustomers(obj: any) {
    console.log(obj);
    this.store.dispatch(storeActions.updateCustomers({ info: obj }));
    this.store.dispatch(storeActions.getCustomers());
  }
}
