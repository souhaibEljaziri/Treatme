import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { createElement, Internationalization, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { EditService, PageService, EditSettingsModel, GridComponent, DialogEditEventArgs } from '@syncfusion/ej2-angular-grids';
import { AddEditOxygenComponent } from '../add-edit-oxygen/add-edit-oxygen.component';
//import { RequestOxygenComponent } from '../request-oxygen/request-oxygen.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-oxygen',
  templateUrl: './oxygen.component.html',
  styleUrls: ['./oxygen.component.scss'],
  providers: [EditService, PageService],
  encapsulation: ViewEncapsulation.None
})
export class OxygenComponent implements OnInit {
  @ViewChild('gridObj') gridObj: GridComponent;
  @ViewChild('addEditOxygenObj') addEditOxygenObj: AddEditOxygenComponent;
  //@ViewChild('onRequestOxygenObj') onRequestOxygenObj: RequestOxygenComponent;
  @ViewChild('deleteConfirmationDialogObj')
  public deleteConfirmationDialogObj: DialogComponent;
  public oxygenData: Record<string, any>[];
  public filteredOxygen: Record<string, any>[];
  public activeOxygenData: Record<string, any>;
  public hospitalData: Record<string, any>[];
  public doctorsData: Record<string, any>[];
  public intl: Internationalization = new Internationalization();
  public editSettings: EditSettingsModel;
  public gridDialog: Dialog;
  public animationSettings: Record<string, any> = { effect: 'None' };

  constructor(public dataService: DataService) {
    this.oxygenData = this.filteredOxygen = this.dataService.getOxygenData();
    this.hospitalData = this.dataService.getHospitalData();
   this.fn();
    this.activeOxygenData = this.filteredOxygen[0];
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog'
    };
  }
  async fn(){
    this.doctorsData =await this.dataService.getDoctorsData();
  }
  public ngOnInit(): void {
    this.dataService.updateActiveItem('oxygen');
  }

  public onOxygenClick(args: MouseEvent): void {
    const rowIndex: string = (args.currentTarget as HTMLElement).parentElement.getAttribute('index');
    setTimeout(() => {
      this.gridObj.selectRow(parseInt(rowIndex, 10));
      this.gridObj.startEdit();
    });
  }

  public onDataEdit(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit') {
      this.activeOxygenData = args.rowData as Record<string, any>;
      this.dataService.setActiveOxygenData(this.activeOxygenData);
      this.gridDialog = args.dialog as Dialog;
      this.gridDialog.header = 'Oxygen Details';
      const fields: Array<string> = ['Id', 'Name', 'WaterCapacity', 'OxygenCapacity', 'Status', 'Price'];
      fields.forEach(field => {
        let value: string;
        if (field === 'DOB' && !isNullOrUndefined(this.activeOxygenData[field])) {
          value = this.intl.formatDate(this.activeOxygenData[field] as Date, { skeleton: 'yMd' }).toString();
        } else {
          value = isNullOrUndefined(this.activeOxygenData[field]) ? '' : this.activeOxygenData[field].toString();
        }
        (args.dialog as Dialog).element.querySelector('#' + field).innerHTML = value;
      });
      const editButtonElement: HTMLElement = createElement('button', {
        className: 'edit-oxygen',
        id: 'edit',
        innerHTML: 'Edit',
        attrs: { type: 'button', title: 'Edit' }
      });
      editButtonElement.onclick = this.onEditOxygen.bind(this);
      const deleteButtonElement: HTMLElement = createElement('button', {
        className: 'delete-oxygen',
        id: 'delete',
        innerHTML: 'Delete',
        attrs: { type: 'button', title: 'Delete', content: 'DELETE' }
      });
      deleteButtonElement.onclick = this.onDeleteOxygen.bind(this);
      this.gridDialog.element.querySelector('.e-footer-content').appendChild(deleteButtonElement);
      this.gridDialog.element.querySelector('.e-footer-content').appendChild(editButtonElement);
      const editButton: Button = new Button({ isPrimary: true });
      editButton.appendTo('#edit');
      const deleteButton: Button = new Button();
      deleteButton.appendTo('#delete');
    }
  }

  public onDeleteOxygen(): void {
    this.deleteConfirmationDialogObj.show();
  }

  public onDeleteClick(): void {
    this.oxygenData = this.oxygenData.filter((item: Record<string, any>) => item.Id !== this.activeOxygenData.Id);
    this.filteredOxygen = this.oxygenData;
    this.dataService.setOxygenData(this.oxygenData);
    this.gridObj.closeEdit();
    this.deleteConfirmationDialogObj.hide();
  }

  public onDeleteCancelClick(): void {
    this.deleteConfirmationDialogObj.hide();
  }

  public onAddOxygen(): void {
    this.addEditOxygenObj.onAddOxygen();
  }

  public onRequestOxygen(): void {
    //this.onRequestOxygenObj.onRequestOxygen();
    this.addEditOxygenObj.onAddOxygen();
  }

  public onEditOxygen(): void {
    this.gridObj.closeEdit();
    this.addEditOxygenObj.showDetails();
  }

  public getDoctorName(id: number): string {
    const activeDoctor: Record<string, any>[] = this.doctorsData.filter((item: Record<string, any>) => item.Id === id);
    return activeDoctor[0].Name;
  }

  public oxygenSearch(args: KeyboardEvent): void {
    const searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== '') {
      new DataManager(this.oxygenData).executeQuery(new Query().
        search(searchString, ['Id', 'Name', 'WaterCapacity', 'OxygenCapacity', 'Status', 'Price'], null, true, true)).then((e: ReturnOption) => {
          if ((e.result as any).length > 0) {
            this.filteredOxygen = e.result as Record<string, any>[];
          } else {
            this.filteredOxygen = [];
          }
        });
    } else {
      this.oxygenSearchCleared(args as any);
    }
  }

  public oxygenSearchCleared(args: MouseEvent): void {
    this.filteredOxygen = this.oxygenData;
    if ((args.target as HTMLElement).previousElementSibling) {
      ((args.target as HTMLElement).previousElementSibling as HTMLInputElement).value = '';
    }
  }

  public gridRefresh(): void {
    this.oxygenData = this.dataService.getOxygenData();
    this.filteredOxygen = this.oxygenData;
    this.gridObj.refresh();
  }
}
