import { Action, createReducer, on } from "@ngrx/store";
import * as customerActions from "./actions";

export interface customerState {
  customerItems: customerActions.Customers;
}
export const initialState: customerState = {
  customerItems: {
customers: []
  }
};

const customerDetailReducer = createReducer(
  initialState,
  on(customerActions.getCustomers, (state) => state),
  on(customerActions.updateCustomers, (state: customerState, { info }) => {
  
    console.log({ ...state.customerItems, info });
    return { ...state, customerItems: {  customers: info, ...info } };
  })
);

export function reducer(state: customerState | undefined, action: Action) {
  return customerDetailReducer(state, action);
}

export const customerDetailKey = "customerDetails";
