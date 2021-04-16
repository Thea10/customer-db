import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import {
  MDBSpinningPreloader,
  ToastModule,
  MDBBootstrapModulesPro,
} from "ng-uikit-pro-standard";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule } from "@angular/common/http";
import {reducer} from './store/reducers';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';

@NgModule({
  declarations: [AppComponent, CustomerlistComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({customers: reducer}),
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "your key here",
    }),
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
