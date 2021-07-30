/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from "@angular/core";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import {
  DialogComponent,
  BeforeOpenEventArgs,
} from "@syncfusion/ej2-angular-popups";
import { DropDownList } from "@syncfusion/ej2-angular-dropdowns";
import { EJ2Instance } from "@syncfusion/ej2-angular-schedule";
import { DatePicker } from "@syncfusion/ej2-angular-calendars";
import {
  FormValidator,
  MaskedTextBoxComponent,
} from "@syncfusion/ej2-angular-inputs";
import { DataService } from "../data.service";

@Component({
  selector: "app-add-edit-supplier",
  templateUrl: "./add-edit-supplier.component.html",
  styleUrls: ["./add-edit-supplier.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditSupplierComponent {
  @Output() refreshEvent = new EventEmitter<string>();
  @ViewChild("newSupplierObj")
  public newSupplierObj: DialogComponent;
  public animationSettings: Record<string, any> = { effect: "None" };
  public title = "New Supplier";
  public selectedGender = "Male";
  public dobValue: Date = new Date(1996, 0, 31);
  public dialogState: string;
  public bloodGroupData: Record<string, any>[];
  public fields: Record<string, any> = { text: "Text", value: "Value" };
  public suppliersData: Record<string, any>[];
  public activeSupplierData: Record<string, any>;
  public hospitalData: Record<string, any>[];
  public doctorsData: Record<string, any>[];

  constructor(private dataService: DataService) {
    this.bloodGroupData = this.dataService.bloodGroupData;
    this.suppliersData = this.dataService.getSuppliersData();
    this.hospitalData = this.dataService.getHospitalData();
    this.doctorsData = this.dataService.getDoctorsData();
    this.activeSupplierData = this.dataService.getActiveSupplierData();
  }

  public onAddSupplier(): void {
    this.dialogState = "new";
    this.title = "New Supplier";
    this.newSupplierObj.show();
  }

  public onCancelClick(): void {
    this.resetFormFields();
    this.newSupplierObj.hide();
  }

  public onSaveClick(): void {
    const formElementContainer: HTMLElement = document.querySelector(
      ".new-supplier-dialog #new-supplier-form"
    );
    if (
      formElementContainer &&
      formElementContainer.classList.contains("e-formvalidator") &&
      !(
        (formElementContainer as EJ2Instance).ej2_instances[0] as FormValidator
      ).validate()
    ) {
      return;
    }
    const obj: Record<string, any> =
      this.dialogState === "new" ? {} : this.activeSupplierData;
    const formElement: HTMLInputElement[] = [].slice.call(
      document.querySelectorAll(".new-supplier-dialog .e-field")
    );
    for (const curElement of formElement) {
      let columnName: string = curElement.querySelector("input").name;
      const isDropElement: boolean = curElement.classList.contains("e-ddl");
      const isDatePickElement: boolean =
        curElement.classList.contains("e-date-wrapper");
      if (
        !isNullOrUndefined(columnName) ||
        isDropElement ||
        isDatePickElement
      ) {
        if (columnName === "" && isDropElement) {
          columnName = curElement.querySelector("select").name;
          const instance: DropDownList = (
            curElement.parentElement as EJ2Instance
          ).ej2_instances[0] as DropDownList;
          obj[columnName] = instance.value;
        } else if (columnName === "DOB" && isDatePickElement) {
          const instance: DatePicker = (curElement.parentElement as EJ2Instance)
            .ej2_instances[0] as DatePicker;
          obj[columnName] = instance.value;
        } else if (columnName === "Gender") {
          obj[columnName] = this.selectedGender;
        } else {
          obj[columnName] = curElement.querySelector("input").value;
        }
      }
    }
    this.suppliersData = this.dataService.getSuppliersData();
    if (this.dialogState === "new") {
      obj.Id =
        Math.max.apply(
          Math,
          this.suppliersData.map((data: Record<string, any>) => data.Id)
        ) + 1;
      obj.NewSupplierClass = "new-supplier";
      this.suppliersData.push(obj);
    } else {
      this.activeSupplierData = obj;
      this.suppliersData.forEach((supplierData: Record<string, any>) => {
        if (supplierData.Id === obj.Id) {
          Object.assign(supplierData, obj);
        }
      });
      this.dataService.setActiveSupplierData(this.activeSupplierData);
    }
    const activityObj: Record<string, any> = {
      Name:
        this.dialogState === "new" ? "Added New Supplier" : "Updated Supplier",
      Message: `${obj.Name} for ${obj.Symptoms}`,
      Time: "10 mins ago",
      Type: "supplier",
      ActivityTime: new Date(),
    };
    this.dataService.addActivityData(activityObj);
    this.dataService.setSuppliersData(this.suppliersData);
    this.refreshEvent.emit();
    this.resetFormFields();
    this.newSupplierObj.hide();
  }

  public resetFormFields(): void {
    const formElement: HTMLInputElement[] = [].slice.call(
      document.querySelectorAll(".new-supplier-dialog .e-field")
    );
    this.dataService.destroyErrorElement(
      document.querySelector("#new-supplier-form"),
      formElement
    );
    for (const curElement of formElement) {
      let columnName: string = curElement.querySelector("input").name;
      const isDropElement: boolean = curElement.classList.contains("e-ddl");
      const isDatePickElement: boolean =
        curElement.classList.contains("e-date-wrapper");
      if (
        !isNullOrUndefined(columnName) ||
        isDropElement ||
        isDatePickElement
      ) {
        if (columnName === "" && isDropElement) {
          columnName = curElement.querySelector("select").name;
          const instance: DropDownList = (
            curElement.parentElement as EJ2Instance
          ).ej2_instances[0] as DropDownList;
          instance.value = (instance as any).dataSource[0];
        } else if (columnName === "DOB" && isDatePickElement) {
          const instance: DatePicker = (curElement.parentElement as EJ2Instance)
            .ej2_instances[0] as DatePicker;
          instance.value = new Date();
        } else if (columnName === "Gender") {
          curElement.querySelectorAll("input")[0].checked = true;
        } else {
          curElement.querySelector("input").value = "";
        }
      }
    }
  }

  public onGenderChange(args: Record<string, any>): void {
    this.selectedGender = args.target.value;
  }

  public showDetails(): void {
    this.dialogState = "edit";
    this.title = "Edit Supplier";
    this.newSupplierObj.show();
    this.activeSupplierData = this.dataService.getActiveSupplierData();
    const obj: Record<string, any> = this.activeSupplierData;
    const formElement: HTMLInputElement[] = [].slice.call(
      document.querySelectorAll(".new-supplier-dialog .e-field")
    );
    for (const curElement of formElement) {
      let columnName: string = curElement.querySelector("input").name;
      const isCustomElement: boolean = curElement.classList.contains("e-ddl");
      const isDatePickElement: boolean =
        curElement.classList.contains("e-date-wrapper");
      if (
        !isNullOrUndefined(columnName) ||
        isCustomElement ||
        isDatePickElement
      ) {
        if (columnName === "" && isCustomElement) {
          columnName = curElement.querySelector("select").name;
          const instance: DropDownList = (
            curElement.parentElement as EJ2Instance
          ).ej2_instances[0] as DropDownList;
          instance.value = obj[columnName] as string;
          instance.dataBind();
        } else if (columnName === "DOB" && isDatePickElement) {
          const instance: DatePicker = (curElement.parentElement as EJ2Instance)
            .ej2_instances[0] as DatePicker;
          instance.value = (obj[columnName] as Date) || null;
        } else if (columnName === "Gender") {
          if (obj[columnName] === "Male") {
            curElement.querySelectorAll("input")[0].checked = true;
          } else {
            curElement.querySelectorAll("input")[1].checked = true;
          }
        } else {
          curElement.querySelector("input").value = obj[columnName] as string;
        }
      }
    }
  }

  public onBeforeOpen(args: BeforeOpenEventArgs): void {
    const formElement: HTMLFormElement =
      args.element.querySelector("#new-supplier-form");
    if (formElement && formElement.ej2_instances) {
      return;
    }
    const customFn: (args: { [key: string]: HTMLElement }) => boolean = (e: {
      [key: string]: HTMLElement;
    }) => {
      const argsLength = (
        (e.element as EJ2Instance).ej2_instances[0] as MaskedTextBoxComponent
      ).value.length;
      if (argsLength !== 0) {
        return argsLength >= 10;
      } else {
        return false;
      }
    };
    const rules: Record<string, any> = {};
    rules.Name = { required: [true, "Enter valid name"] };
    rules.Mobile = { required: [customFn, "Enter valid mobile number"] };
    rules.Location = {
      required: [true, "Enter valid Location"],
    };
    this.dataService.renderFormValidator(
      formElement,
      rules,
      this.newSupplierObj.element
    );
  }
}
