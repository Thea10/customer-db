import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ModalDirective } from "ng-uikit-pro-standard";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { customerState } from "./store/reducers";
import * as storeActions from "./store/actions";
import { select, Store } from "@ngrx/store";
import { CustomerService } from "./services/customer-service.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("addCustomerModal", { static: false })
  addCustomerModal: ModalDirective;
  customerList$: Observable<customerState>;
  storeSubscribe: Subscription;
  customerList: Array<any> = [];
  name: string;
  age: any;
  gender: string;
  address: {
    street: string;
    postcode: string;
    housenumber: string;
  };

  constructor(
    private store: Store<{ customers: customerState }>,
    private details: CustomerService
  ) {
    this.customerList$ = store.pipe(select("customers"));
    console.log(this.customerList$);
  }

  ngOnInit(): void {
    this.address = {
      street: null,
      postcode: null,
      housenumber: null,
    };
    console.log("hello");
    this.getCustomers();
    this.storeSubscribe = this.customerList$
      .pipe(
        map((x) => {
          // console.log(x);
          this.customerList = x.customerItems.customers;
          console.log(this.customerList);
        })
      )
      .subscribe();
    this.store.dispatch(storeActions.getCustomers());
  }

  getCustomers() {
    this.details.getCustomers();
  }

  saveCustomers() {
    this.customerList.push({
      customerId: this.customerList.length + 1,
      name: this.name,
      age: this.age,
      gender: this.gender,
      address: {
        street: this.address.street,
        postcode: this.address.postcode,
        housenumber: this.address.housenumber
      },
    });
    this.updateCustomers(this.customerList);

    setTimeout(() => {
      this.addCustomerModal.hide();
    }, 3000);
  }

  updateCustomers(obj: any) {
    console.log(obj);
    this.details.updateCustomers(obj);
  }

  updateCustomer(event: any) {
    let { items } = event;
    this.updateCustomers(items);
  }

  deleteCustomer(event: any) {
    let { id } = event;

    console.log(id);

    this.customerList = this.customerList.filter(
      (item) => item.customerId !== id
    );

    this.updateCustomers(this.customerList);
  }

  ngOnDestroy() {
    if (this.storeSubscribe) {
      this.storeSubscribe.unsubscribe();
    }
  }
}
