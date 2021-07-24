/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewChild, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DialogComponent, BeforeOpenEventArgs } from '@syncfusion/ej2-angular-popups';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { EJ2Instance } from '@syncfusion/ej2-angular-schedule';
import { FormValidator, MaskedTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DataService } from '../data.service';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-payment',
  templateUrl: './add-edit-payment.component.html',
  styleUrls: ['./add-edit-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditPaymentComponent {
  @Output() refreshEvent = new EventEmitter<string>();
  @ViewChild('newPaymentObj')
  public newPaymentObj: DialogComponent;
  public animationSettings: Record<string, any> = { effect: 'None' };
  public title = 'New Payment';
  public dialogState: string;
  public patientsNamesData: Record<string, any>[];
  public suppliersNamesData: Record<string, any>[];
  public oxygenIdsData: Record<string, any>[];
  public fields: Record<string, any> = { text: 'Text', value: 'Value' };
  public paymentData: Record<string, any>[];
  public activePaymentData: Record<string, any>;

  private subscription:Subscription;
  constructor(public restService: RestService, public dataService: DataService, private router: Router) {}

  getPatients(): void {
    let obj: any[] = [];
    this.subscription = this.restService.getPatients().subscribe((resp: any) => {
      resp.forEach((element: { id: any, patientName: any }) => {
        obj.push({Value: element.id, Text: element.patientName})    
      });
      this.patientsNamesData = obj;  
    });
  }

  getSuppliers(): void {
    let obj: any[] = [];
    this.subscription = this.restService.getSuppliers().subscribe((resp: any) => {
      resp.forEach((element: { id: any, supplierName: any }) => {
        obj.push({Value: element.id, Text: element.supplierName})    
      });
      this.suppliersNamesData = obj;  
    });
  }

  getOxygenBySupplier(id: string): void {
    let obj: any[] = [];
    this.subscription = this.restService.getOxygenBySupplier(id).subscribe((resp: any) => {
      resp.forEach((element: { id: any }) => {
        obj.push({Value: element.id, Text: element.id})    
      });
      this.oxygenIdsData = obj;  
    });
  }

  addPayment(payment: any): void {
    this.subscription = this.restService.addPayment(payment).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  public onAddPayment(): void {
    this.dialogState = 'new';
    this.title = 'New Payment';
    this.newPaymentObj.show();
    this.getPatients();
    this.getSuppliers();
  }

  public onCancelClick(): void {
    this.resetFormFields();
    this.newPaymentObj.hide();
    this.subscription.unsubscribe();
  }

  public onChange(args: Record<string, any>): void {
    this.getOxygenBySupplier(args.value);
  }

  public onSaveClick(): void {
    const formElementContainer: HTMLElement = document.querySelector('.new-payment-dialog #new-payment-form');
    if (formElementContainer && formElementContainer.classList.contains('e-formvalidator') &&
      !((formElementContainer as EJ2Instance).ej2_instances[0] as FormValidator).validate()) {
      return;
    }
    const obj: Record<string, any> = this.dialogState === 'new' ? {} : this.activePaymentData;
    const formElement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-payment-dialog .e-field'));
    for (const curElement of formElement) {
      let columnName: string = curElement.querySelector('input').name;
      const isDropElement: boolean = curElement.classList.contains('e-ddl');
      if (!isNullOrUndefined(columnName) || isDropElement) {
        if (columnName === '' && isDropElement) {
          columnName = curElement.querySelector('select').name;
          const instance: DropDownList = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DropDownList;
          switch (columnName) {
            case 'patientName':
                obj['patientId'] = instance.value;
                break;
            case 'supplierName':
              obj['supplierId'] = instance.value;
                break;
            default:
              obj[columnName] = instance.value;
              break;
          }
        } else if (columnName === 'price' && curElement.querySelector('input').value === '') {
          obj[columnName] = 0
        } else if (columnName === 'price' && curElement.querySelector('input').value !== '') {
          obj[columnName] = parseInt(curElement.querySelector('input').value)
        } else if (columnName === 'tax' && curElement.querySelector('input').value === '') {
          obj[columnName] = 0
        } else if (columnName === 'tax' && curElement.querySelector('input').value !== '') {
          obj[columnName] = parseInt(curElement.querySelector('input').value)
        }
         else {
          obj[columnName] = curElement.querySelector('input').value;
        }
      }
    }
    obj['total'] = (obj['price'] === '0' ?  '0' : obj['price'] + (obj['price'] * obj['tax'] / 100))
    if (this.dialogState === 'new') {
      obj.NewPaymentClass = 'new-payment';
    }
    this.addPayment(obj);
    this.refreshEvent.emit();
    this.resetFormFields();
    this.newPaymentObj.hide();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/payments']);
     });
    this.subscription.unsubscribe();
  }

  public resetFormFields(): void {
    const formElement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-payment-dialog .e-field'));
    this.dataService.destroyErrorElement(document.querySelector('#new-payment-form'), formElement);
    for (const curElement of formElement) {
      let columnName: string = curElement.querySelector('input').name;
      const isDropElement: boolean = curElement.classList.contains('e-ddl');
      const isDatePickElement: boolean = curElement.classList.contains('e-date-wrapper');
      if (!isNullOrUndefined(columnName) || isDropElement || isDatePickElement) {
        if (columnName === '' && isDropElement) {
          columnName = curElement.querySelector('select').name;
          const instance: DropDownList = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DropDownList;
          instance.value = (instance as any).dataSource[0];
        } else {
          curElement.querySelector('input').value = '';
        }
      }
    }
  }

  public showDetails(): void {
    this.dialogState = 'edit';
    this.title = 'Edit Payment';
    this.newPaymentObj.show();
    this.activePaymentData = this.dataService.getActivePaymentData();
    const obj: Record<string, any> = this.activePaymentData;
    const formElement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-payment-dialog .e-field'));
    for (const curElement of formElement) {
      let columnName: string = curElement.querySelector('input').name;
      const isCustomElement: boolean = curElement.classList.contains('e-ddl');
      const isDatePickElement: boolean = curElement.classList.contains('e-date-wrapper');
      if (!isNullOrUndefined(columnName) || isCustomElement || isDatePickElement) {
        if (columnName === '' && isCustomElement) {
          columnName = curElement.querySelector('select').name;
          const instance: DropDownList = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DropDownList;
          instance.value = obj[columnName] as string;
          instance.dataBind();
        } else if (columnName === 'Price' && obj[columnName] === 'Free') {
           obj[columnName] = 0;
        } else {
           curElement.querySelector('input').value = obj[columnName] as string;
        }
      }
    }
  }

  public onBeforeOpen(args: BeforeOpenEventArgs): void {
    const formElement: HTMLFormElement = args.element.querySelector('#new-payment-form');
    if (formElement && formElement.ej2_instances) {
      return;
    }
    const customFn: (args: { [key: string]: HTMLElement }) => boolean = (e: { [key: string]: HTMLElement }) => {
      const argsLength = ((e.element as EJ2Instance).ej2_instances[0] as MaskedTextBoxComponent).value.length;
      if (argsLength !== 0) {
        return argsLength >= 10;
      } else {
        return false;
      }
    };
    const rules: Record<string, any> = {};
    rules.patientName = { required: [true, 'Select valid patient name'] };
    rules.supplierName = { required: [true, 'Select valid supplier name'] };
    rules.oxygenId = { required: [true, 'Select valid oxygen id'] };
    this.dataService.renderFormValidator(formElement, rules, this.newPaymentObj.element);
  }
}
