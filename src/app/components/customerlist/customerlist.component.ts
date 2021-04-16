import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ChangeDetectorRef,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ModalDirective } from "ng-uikit-pro-standard";
import {
  MdbTablePaginationComponent,
  MdbTableDirective,
} from "ng-uikit-pro-standard";

@Component({
  selector: "app-customerlist",
  templateUrl: "./customerlist.component.html",
  styleUrls: ["./customerlist.component.scss"],
})
export class CustomerlistComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @Input() listItems: any;

  @Output("updateCustomer")
  update_customer: EventEmitter<any> = new EventEmitter();
  @Output("deleteCustomer")
  delete_customer: EventEmitter<any> = new EventEmitter();

  persons: any = [];
  previous: any = [];
  elements: any = [];
  maxVisibleItems: number = 5;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setTableData();
    this.cdRef.detectChanges();
  }
  ngAfterViewInit(): void {
    this.setTableData();
    this.cdRef.detectChanges();
  }

  setTableData() {
    this.persons = this.listItems;
    this.mdbTable.setDataSource(this.listItems);
    this.persons = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    this.setMaxVisibleItems();
  }

  setMaxVisibleItems() {
    this.persons.length > this.maxVisibleItems
      ? this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems)
      : this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.persons.length);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
  }

  changeMaxVisibleItems(value) {
    this.maxVisibleItems = value;
    this.setMaxVisibleItems();
    this.cdRef.detectChanges();
  }

  saveCustomers() {
    this.update_customer.emit({ items: this.listItems });
    
  }
  deleteCustomer(id: number) {
    console.log(id);
    this.delete_customer.emit({ id: id });
  }
}
