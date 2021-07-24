/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DialogComponent, BeforeOpenEventArgs } from '@syncfusion/ej2-angular-popups';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { EJ2Instance } from '@syncfusion/ej2-angular-schedule';
import { DatePicker } from '@syncfusion/ej2-angular-calendars';
import { FormValidator, MaskedTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-edit-oxygen',
  templateUrl: './add-edit-oxygen.component.html',
  styleUrls: ['./add-edit-oxygen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditOxygenComponent {
  @Output() refreshEvent = new EventEmitter<string>();
  @ViewChild('newOxygenObj')
  public newOxygenObj: DialogComponent;
  public animationSettings: Record<string, any> = { effect: 'None' };
  public title = 'New Oxygen';
  public dialogState: string;
  public waterCapacityData: Record<string, any>[];
  public oxygenCapacityData: Record<string, any>[];
  public fields: Record<string, any> = { text: 'Text', value: 'Value' };
  public oxygenData: Record<string, any>[];
  public activeOxygenData: Record<string, any>;
  public hospitalData: Record<string, any>[];
  public doctorsData: Record<string, any>[];

  constructor(private dataService: DataService) {
    this.waterCapacityData = this.dataService.waterCapacityData;
    this.oxygenCapacityData = this.dataService.oxygenCapacityData;
    this.oxygenData = this.dataService.getOxygenData();
    this.hospitalData = this.dataService.getHospitalData();
    this.doctorsData = this.dataService.getDoctorsData();
    this.activeOxygenData = this.dataService.getActiveOxygenData();
  }

  public onAddOxygen(): void {
    this.dialogState = 'new';
    this.title = 'New Oxygen';
    this.newOxygenObj.show();
  }

  public onCancelClick(): void {
    this.resetFormFields();
    this.newOxygenObj.hide();
  }

  public onSaveClick(): void {
    const formElementContainer: HTMLElement = document.querySelector('.new-oxygen-dialog #new-oxygen-form');
    if (formElementContainer && formElementContainer.classList.contains('e-formvalidator') &&
      !((formElementContainer as EJ2Instance).ej2_instances[0] as FormValidator).validate()) {
      return;
    }
    const obj: Record<string, any> = this.dialogState === 'new' ? {} : this.activeOxygenData;
    const formElement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-oxygen-dialog .e-field'));
    for (const curElement of formElement) {
      let columnName: string = curElement.querySelector('input').name;
      const isDropElement: boolean = curElement.classList.contains('e-ddl');
      const isDatePickElement: boolean = curElement.classList.contains('e-date-wrapper');
      if (!isNullOrUndefined(columnName) || isDropElement || isDatePickElement) {
        if (columnName === '' && isDropElement) {
          columnName = curElement.querySelector('select').name;
          const instance: DropDownList = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DropDownList;
          obj[columnName] = instance.value;
        }
         else {
          obj[columnName] = curElement.querySelector('input').value;

        }
      }
    }
    this.oxygenData = this.dataService.getOxygenData();
    if (this.dialogState === 'new') {
      obj.Id = Math.max.apply(Math, this.oxygenData.map((data: Record<string, any>) => data.Id)) + 1;
      obj.NewOxygenClass = 'new-oxygen';
      obj['Status'] = 'Available'
      this.oxygenData.push(obj);
    } else {
      this.activeOxygenData = obj;
      this.oxygenData.forEach((oxygenData: Record<string, any>) => {
        if (oxygenData.Id === obj.Id) {
          Object.assign(oxygenData, obj);
        }
      });
      this.dataService.setActiveOxygenData(this.activeOxygenData);
    }
    const activityObj: Record<string, any> = {
      Name: this.dialogState === 'new' ? 'Added New Oxygen' : 'Updated Oxygen',
      Message: `${obj.Name} for ${obj.Symptoms}`,
      Time: '10 mins ago',
      Type: 'oxygen',
      ActivityTime: new Date()
    };
    this.dataService.addActivityData(activityObj);
    this.dataService.setOxygenData(this.oxygenData);
    this.refreshEvent.emit();
    this.resetFormFields();
    this.newOxygenObj.hide();
  }

  public resetFormFields(): void {
    const formElement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-oxygen-dialog .e-field'));
    this.dataService.destroyErrorElement(document.querySelector('#new-oxygen-form'), formElement);
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
    this.title = 'Edit Oxygen';
    this.newOxygenObj.show();
    this.activeOxygenData = this.dataService.getActiveOxygenData();
    const obj: Record<string, any> = this.activeOxygenData;
    const formElement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-oxygen-dialog .e-field'));
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
           obj[columnName] = '';
        } else {
           curElement.querySelector('input').value = obj[columnName] as string;
        }
      }
    }
  }

  public onBeforeOpen(args: BeforeOpenEventArgs): void {
    const formElement: HTMLFormElement = args.element.querySelector('#new-oxygen-form');
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
    rules.Name = { required: [true, 'Enter valid supplier name'] };
    this.dataService.renderFormValidator(formElement, rules, this.newOxygenObj.element);
  }
}
