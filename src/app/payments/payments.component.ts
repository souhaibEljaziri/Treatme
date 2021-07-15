import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { createElement, Internationalization, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { EditService, PageService, EditSettingsModel, GridComponent, DialogEditEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataService } from '../data.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [EditService, PageService],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent implements OnInit {
  @ViewChild('gridObj') gridObj: GridComponent;
  @ViewChild('deleteConfirmationDialogObj')
  public deleteConfirmationDialogObj: DialogComponent;
  public paymentsData: Record<string, any>[];
  public filteredPayments: Record<string, any>[];
  public activePaymentData: Record<string, any>;
  public intl: Internationalization = new Internationalization();
  public editSettings: EditSettingsModel;
  public gridDialog: Dialog;
  public animationSettings: Record<string, any> = { effect: 'None' };

  constructor(public dataService: DataService) {
    this.paymentsData = this.filteredPayments = this.dataService.getPaymentsData();
    this.activePaymentData = this.filteredPayments[0];
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog'
    };
  }

  public ngOnInit(): void {
    this.dataService.updateActiveItem('payments');
  }

  public onPaymentClick(args: MouseEvent): void {
    const rowIndex: string = (args.currentTarget as HTMLElement).parentElement.getAttribute('index');
    setTimeout(() => {
      this.gridObj.selectRow(parseInt(rowIndex, 10));
      this.gridObj.startEdit();
    });
  }

  public paymentSearch(args: KeyboardEvent): void {
    const searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== '') {
      new DataManager(this.paymentsData).executeQuery(new Query().
        search(searchString, ['BillNo', 'OxygenID', 'PatientName', 'SupplierName', 'Date', 'Price', 'Tax', 'Total'], null, true, true)).then((e: ReturnOption) => {
          if ((e.result as any).length > 0) {
            this.filteredPayments = e.result as Record<string, any>[];
          } else {
            this.filteredPayments = [];
          }
        });
    } else {
      this.paymentSearchCleared(args as any);
    }
  }

  public paymentSearchCleared(args: MouseEvent): void {
    this.filteredPayments = this.paymentsData;
    if ((args.target as HTMLElement).previousElementSibling) {
      ((args.target as HTMLElement).previousElementSibling as HTMLInputElement).value = '';
    }
  }

  public gridRefresh(): void {
    this.paymentsData = this.dataService.getPaymentsData();
    this.filteredPayments = this.paymentsData;
    this.gridObj.refresh();
  }
}
