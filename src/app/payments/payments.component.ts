import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Internationalization } from '@syncfusion/ej2-base';
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EditService, PageService, EditSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { AddEditPaymentComponent } from '../add-edit-payment/add-edit-payment.component';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {MDCRipple} from '@material/ripple';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [EditService, PageService],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent implements OnInit, OnDestroy {
  @ViewChild('gridObj') gridObj: GridComponent;
  @ViewChild('addEditPaymentObj') addEditPaymentObj: AddEditPaymentComponent;
  @ViewChild('deleteConfirmationDialogObj')
  public deleteConfirmationDialogObj: DialogComponent;
  public paymentsData: Record<string, any>;
  public filteredPayments: Record<string, any>;
  public activePaymentData: Record<string, any>;
  public intl: Internationalization = new Internationalization();
  public editSettings: EditSettingsModel;
  public gridDialog: Dialog;
  public animationSettings: Record<string, any> = { effect: 'None' };
  
  
  private subscription:Subscription;
  constructor(public restService: RestService, private router: Router) {
    this.getPayments();
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog'
    };
  }

  public ngOnInit(): void {
    this.restService.updateActiveItem('payments');
    const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onAddPayment(): void {
    this.addEditPaymentObj.onAddPayment();
  }

  getPayments(): void {
    this.subscription = this.restService.getPayments().subscribe((resp: any) => {
      this.paymentsData = this.filteredPayments = resp;
      this.activePaymentData = this.filteredPayments[0];
    });
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
        search(searchString, ['id', 'patient', 'supplier', 'oxygen', 'date', 'price', 'tax', 'total'], null, true, true)).then((e: ReturnOption) => {
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
    this.restService.getPayments();
    this.filteredPayments = this.paymentsData;
    this.gridObj.refresh();
  }
}
