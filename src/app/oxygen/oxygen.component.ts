import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { createElement, Internationalization, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { EditService, PageService, EditSettingsModel, GridComponent, DialogEditEventArgs } from '@syncfusion/ej2-angular-grids';
import { AddEditOxygenComponent } from '../add-edit-oxygen/add-edit-oxygen.component';
import { RestService, Oxygen } from '../rest.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-oxygen',
  templateUrl: './oxygen.component.html',
  styleUrls: ['./oxygen.component.scss'],
  providers: [EditService, PageService],
  encapsulation: ViewEncapsulation.None
})
export class OxygenComponent implements OnInit, OnDestroy {
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

  private subscription:Subscription;
  constructor(public restService: RestService, private router: Router) {
    this.getOxygen();
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog'
    };
  }

  public ngOnInit(): void {
    this.restService.updateActiveItem('oxygen');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onDataEdit(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit') {
      let data = args.rowData as Record<string, any>;
      this.activeOxygenData = data;
      console.log(this.activeOxygenData)
      this.getOxygenById(data.id);
      console.log(data);
      this.gridDialog = args.dialog as Dialog;
      this.gridDialog.header = 'Oxygen Details';
      const fields: Array<string> = ['id', 'supplier', 'waterCapacity', 'oxygenCapacity', 'status', 'price'];
      fields.forEach(field => {
        let value: string;
          value = isNullOrUndefined(this.activeOxygenData[field]) ? '' : this.activeOxygenData[field].toString();
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
    this.deleteOxygen(this.activeOxygenData.id);
    this.gridObj.closeEdit();
    this.deleteConfirmationDialogObj.hide();
  }

  public onDeleteCancelClick(): void {
    this.deleteConfirmationDialogObj.hide();
  }

  public onEditOxygen(): void {
    this.gridObj.closeEdit();
    this.addEditOxygenObj.showDetails();
  }

  public onAddOxygen(): void {
    this.addEditOxygenObj.onAddOxygen();
  }

  getOxygen(): void {
    this.subscription = this.restService.getOxygen().subscribe((resp: any) => {
      this.oxygenData = this.filteredOxygen = resp;
      this.activeOxygenData = this.filteredOxygen[0];
    });
  }

  getOxygenById(id: string): void {
    this.subscription = this.restService.getOxygenById(id).subscribe((resp: any) => {
      this.restService.setActiveOxygenData(resp);
    });
  }

  deleteOxygen(id: string): void {
    this.restService.deleteOxygen(id)
      .subscribe(() => {
        this.oxygenData = this.oxygenData.filter((item: Record<string, any>) => item.id !== id);
        this.filteredOxygen = this.oxygenData;
        }, (err) => {
          console.log(err);
        });
  }

  public oxygenSearch(args: KeyboardEvent): void {
    const searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== '') {
      new DataManager(this.oxygenData).executeQuery(new Query().
        search(searchString, ['id', 'supplier', 'waterCapacity', 'oxygenCapacity', 'status', 'price'], null, true, true)).then((e: ReturnOption) => {
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
    this.restService.getOxygen();
    this.filteredOxygen = this.oxygenData;
    this.gridObj.refresh();
  }
}
