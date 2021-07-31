import { Component, ViewEncapsulation, ViewChild, OnInit } from "@angular/core";
import {
  createElement,
  Internationalization,
  isNullOrUndefined,
} from "@syncfusion/ej2-base";
import { DataManager, Query, ReturnOption } from "@syncfusion/ej2-data";
import { Dialog, DialogComponent } from "@syncfusion/ej2-angular-popups";
import { Button } from "@syncfusion/ej2-angular-buttons";
import {
  EditService,
  PageService,
  EditSettingsModel,
  GridComponent,
  DialogEditEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { AddEditSupplierComponent } from "../add-edit-supplier/add-edit-supplier.component";
import { DataService } from "../data.service";

@Component({
  selector: "app-suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
  providers: [EditService, PageService],
  encapsulation: ViewEncapsulation.None,
})
export class SuppliersComponent implements OnInit {
  @ViewChild("gridObj") gridObj: GridComponent;
  @ViewChild("addEditSupplierObj") addEditSupplierObj: AddEditSupplierComponent;
  @ViewChild("deleteConfirmationDialogObj")
  public deleteConfirmationDialogObj: DialogComponent;
  public suppliersData: Record<string, any>[];
  public filteredSuppliers: Record<string, any>[];
  public activeSupplierData: Record<string, any>;
  public hospitalData: Record<string, any>[];
  public doctorsData: Record<string, any>[];
  public intl: Internationalization = new Internationalization();
  public editSettings: EditSettingsModel;
  public gridDialog: Dialog;
  public animationSettings: Record<string, any> = { effect: "None" };

  constructor(public dataService: DataService) {
    this.suppliersData = this.filteredSuppliers =
      this.dataService.getSuppliersData();
    this.hospitalData = this.dataService.getHospitalData();
    this.doctorsData = this.dataService.getDoctorsData();
    this.activeSupplierData = this.filteredSuppliers[0];
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Dialog",
    };
  }

  public ngOnInit(): void {
    this.dataService.updateActiveItem("suppliers");
  }

  public onSupplierClick(args: MouseEvent): void {
    const rowIndex: string = (
      args.currentTarget as HTMLElement
    ).parentElement.getAttribute("index");
    setTimeout(() => {
      this.gridObj.selectRow(parseInt(rowIndex, 10));
      this.gridObj.startEdit();
    });
  }

  public onDataEdit(args: DialogEditEventArgs): void {
    if (args.requestType === "beginEdit") {
      this.activeSupplierData = args.rowData as Record<string, any>;
      this.dataService.setActiveSupplierData(this.activeSupplierData);
      this.gridDialog = args.dialog as Dialog;
      this.gridDialog.header = "Supplier Details";
      const fields: Array<string> = ["Id", "Name", "Contact", "Location"];
      fields.forEach((field) => {
        let value: string;
        if (
          field === "DOB" &&
          !isNullOrUndefined(this.activeSupplierData[field])
        ) {
          value = this.intl
            .formatDate(this.activeSupplierData[field] as Date, {
              skeleton: "yMd",
            })
            .toString();
        } else {
          value = isNullOrUndefined(this.activeSupplierData[field])
            ? ""
            : this.activeSupplierData[field].toString();
        }
      
      });
      //this.gridDialog.element.querySelector('.history-row').appendChild(this.getHistoryDetails());
      const editButtonElement: HTMLElement = createElement("button", {
        className: "edit-supplier",
        id: "edit",
        innerHTML: "Edit",
        attrs: { type: "button", title: "Edit" },
      });
      editButtonElement.onclick = this.onEditSupplier.bind(this);
      const deleteButtonElement: HTMLElement = createElement("button", {
        className: "delete-supplier",
        id: "delete",
        innerHTML: "Delete",
        attrs: { type: "button", title: "Delete", content: "DELETE" },
      });
      deleteButtonElement.onclick = this.onDeleteSupplier.bind(this);
      this.gridDialog.element
        .querySelector(".e-footer-content")
        .appendChild(deleteButtonElement);
      this.gridDialog.element
        .querySelector(".e-footer-content")
        .appendChild(editButtonElement);
      const editButton: Button = new Button({ isPrimary: true });
      editButton.appendTo("#edit");
      const deleteButton: Button = new Button();
      deleteButton.appendTo("#delete");
    }
  }

  public onDeleteSupplier(): void {
    this.deleteConfirmationDialogObj.show();
  }

  public onDeleteClick(): void {
    this.suppliersData = this.suppliersData.filter(
      (item: Record<string, any>) => item.Id !== this.activeSupplierData.Id
    );
    this.filteredSuppliers = this.suppliersData;
    this.dataService.setSuppliersData(this.suppliersData);
    this.gridObj.closeEdit();
    this.deleteConfirmationDialogObj.hide();
  }

  public onDeleteCancelClick(): void {
    this.deleteConfirmationDialogObj.hide();
  }

  public onAddSupplier(): void {
    this.addEditSupplierObj.onAddSupplier();
  }

  public onEditSupplier(): void {
    this.gridObj.closeEdit();
    this.addEditSupplierObj.showDetails();
  }

  public getHistoryDetails(): HTMLElement {
    const filteredData: Record<string, any>[] = this.hospitalData.filter(
      (item: Record<string, any>) =>
        item.SupplierId === this.activeSupplierData.Id
    );
    const historyElement: HTMLElement = createElement("div", {
      id: "history-wrapper",
    });
    if (filteredData.length > 0) {
      filteredData.map((item: Record<string, any>) => {
        const element: Element = createElement("div", {
          className: "history-content",
        });
        // eslint-disable-next-line max-len
        element.textContent = `${this.intl.formatDate(item.StartTime, {
          skeleton: "MMMd",
        })} - ${this.intl.formatDate(item.StartTime, {
          skeleton: "hm",
        })} - ${this.intl.formatDate(item.EndTime, {
          skeleton: "hm",
        })} Appointment with Dr.${this.getDoctorName(item.DoctorId)}`;
        historyElement.appendChild(element);
      });
    } else {
      const element: Element = createElement("div", {
        className: "empty-container",
      });
      element.textContent = "No Events!";
      historyElement.appendChild(element);
    }
    return historyElement;
  }
  public getDoctorName(id: number): string {
    const activeDoctor: Record<string, any>[] = this.doctorsData.filter(
      (item: Record<string, any>) => item.Id === id
    );
    return activeDoctor[0].Name;
  }

  public supplierSearch(args: KeyboardEvent): void {
    const searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== "") {
      new DataManager(this.suppliersData)
        .executeQuery(
          new Query().search(
            searchString,
            ["Id", "Name", "Gender", "BloodGroup", "Mobile"],
            null,
            true,
            true
          )
        )
        .then((e: ReturnOption) => {
          if ((e.result as any).length > 0) {
            this.filteredSuppliers = e.result as Record<string, any>[];
          } else {
            this.filteredSuppliers = [];
          }
        });
    } else {
      this.supplierSearchCleared(args as any);
    }
  }

  public supplierSearchCleared(args: MouseEvent): void {
    this.filteredSuppliers = this.suppliersData;
    if ((args.target as HTMLElement).previousElementSibling) {
      (
        (args.target as HTMLElement).previousElementSibling as HTMLInputElement
      ).value = "";
    }
  }

  public gridRefresh(): void {
    this.suppliersData = this.dataService.getSuppliersData();
    this.filteredSuppliers = this.suppliersData;
    this.gridObj.refresh();
  }
}
