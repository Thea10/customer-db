import { Action, createAction, props } from "@ngrx/store";

export interface Customers{
  customers: []
}
export interface Customer{
  customerId: number,
  name: string,
  age: Date,
  gender: string,
  address: {
    street: string,
    postcode: string,
    housenumber: number
  },
  orders: Order[]
}

interface Order{
  orderId: string,
  orderDate: Date,
  amount: number
}



export const getCustomers = createAction(
  "{getCustomers} Get customers"
);

export const updateCustomers = createAction(
  "{updateCustomers} Update Data in customer",
  props<{ info: Customers }>()
);

