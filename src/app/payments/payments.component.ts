import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { createElement, Internationalization, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { EditService, PageService, EditSettingsModel, GridComponent, DialogEditEventArgs } from '@syncfusion/ej2-angular-grids';
import { AddEditPaymentComponent } from '../add-edit-payment/add-edit-payment.component';
import { RestService, Payment } from '../rest.service';
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

  public onDataEdit(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit') {
      this.activePaymentData = args.rowData as Record<string, any>;
      console.log(this.activePaymentData);
      this.restService.setActivePaymentData(this.activePaymentData);
      this.gridDialog = args.dialog as Dialog;
      this.gridDialog.header = 'Payment Details';
      const fields: Array<string> = ['id', 'patient', 'supplier', 'oxygen', 'date', 'price', 'tax', 'total'];
      fields.forEach(field => {
        let value: string;
        value = isNullOrUndefined(this.activePaymentData[field]) ? '' : this.activePaymentData[field].toString();
        (args.dialog as Dialog).element.querySelector('#' + field).innerHTML = value;
      });
      //this.gridDialog.element.querySelector('.history-row').appendChild(this.getHistoryDetails());
      const editButtonElement: HTMLElement = createElement('button', {
        className: 'edit-payment',
        id: 'edit',
        innerHTML: 'Edit',
        attrs: { type: 'button', title: 'Edit' }
      });
      editButtonElement.onclick = this.onEditPayment.bind(this);
      const deleteButtonElement: HTMLElement = createElement('button', {
        className: 'delete-payment',
        id: 'delete',
        innerHTML: 'Delete',
        attrs: { type: 'button', title: 'Delete', content: 'DELETE' }
      });
      deleteButtonElement.onclick = this.onDeletePayment.bind(this);
      this.gridDialog.element.querySelector('.e-footer-content').appendChild(deleteButtonElement);
      this.gridDialog.element.querySelector('.e-footer-content').appendChild(editButtonElement);
      const editButton: Button = new Button({ isPrimary: true });
      editButton.appendTo('#edit');
      const deleteButton: Button = new Button();
      deleteButton.appendTo('#delete');
    }
  }

  public onDeletePayment(): void {
    this.deleteConfirmationDialogObj.show();
  }

  public onDeleteClick(): void {
    this.deletePayment(this.activePaymentData.id);
    this.gridObj.closeEdit();
    this.deleteConfirmationDialogObj.hide();
  }

  public onDeleteCancelClick(): void {
    this.deleteConfirmationDialogObj.hide();
  }

  public onEditPayment(): void {
    this.gridObj.closeEdit();
    this.addEditPaymentObj.showDetails();
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

  deletePayment(id: string): void {
    this.restService.deletePayment(id)
      .subscribe(() => {
        this.paymentsData = this.paymentsData.filter((item: Record<string, any>) => item.id !== id);
        this.filteredPayments = this.paymentsData;
        }, (err) => {
          console.log(err);
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
