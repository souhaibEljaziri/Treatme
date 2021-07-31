/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DialogComponent, BeforeOpenEventArgs } from '@syncfusion/ej2-angular-popups';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { EJ2Instance } from '@syncfusion/ej2-angular-schedule';
import { FormValidator, MaskedTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DataService } from '../data.service';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

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
  public suppliersNamesData: Record<string, any>[];
  public waterCapacityData: Record<string, any>[];
  public oxygenCapacityData: Record<string, any>[];
  public change: boolean = false;
  public fields: Record<string, any> = { text: 'Text', value: 'Value' };
  public oxygenData: Record<string, any>[];
  public activeOxygenData: Record<string, any>;
  selectedFile: ImageSnippet;
  fileToUpload: File = null;

  private subscription:Subscription;
  constructor(public restService: RestService, public dataService: DataService, private router: Router) {
    this.waterCapacityData = this.dataService.waterCapacityData;
    this.oxygenCapacityData = this.dataService.oxygenCapacityData;
    this.getSuppliers();
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    this.fileToUpload = file;
  }

  uploadFile(file: File, id: string) {

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.restService.uploadImage(this.selectedFile.file, id).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
        
        })
    });

    reader.readAsDataURL(file);
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

  addOxygen(oxygen: any): void {
    console.log("adding...");
    this.subscription = this.restService.addOxygen(oxygen).subscribe((resp: any) => {
      console.log(resp.id);
      if (this.fileToUpload !== null) {
         this.uploadFile(this.fileToUpload, resp.id);
      }
      this.refreshEvent.emit();
      this.resetFormFields();
      this.newOxygenObj.hide();
      setTimeout( () => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/oxygen']);
      }); }, 3000 );
      this.change = false;
      this.fileToUpload = null;
    }, (err) => {
      console.log(err);
    });
  }

  updateOxygen(id: string, oxygen: any): void {
    console.log("editing...");
    this.subscription = this.restService.updateOxygen(id, oxygen).subscribe((result: any) => {
      console.log(result);
      if (this.fileToUpload !== null) {
         this.uploadFile(this.fileToUpload, id);
      }
      this.refreshEvent.emit();
      this.resetFormFields();
      this.newOxygenObj.hide();
      setTimeout( () => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/oxygen']);
      }); }, 3000 );
      this.change = false;
      this.fileToUpload = null;
    }, (err) => {
      console.log(err);
    });
  }

  public onAddOxygen(): void {
    this.dialogState = 'new';
    this.title = 'New Oxygen';
    this.newOxygenObj.show();
    this.change = true;
  }

  public onCancelClick(): void {
    this.resetFormFields();
    this.newOxygenObj.hide();
    this.subscription.unsubscribe();
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
      if (!isNullOrUndefined(columnName) || isDropElement) {
        if (columnName === '' && isDropElement) {
          columnName = curElement.querySelector('select').name;
          const instance: DropDownList = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DropDownList;
          if (columnName === "supplierName") 
          obj['supplierId'] = instance.value;
          else
            obj[columnName] = instance.value;
        } else if (columnName === 'price' && curElement.querySelector('input').value === '') {
          obj[columnName] = 0
        } else if (columnName === 'price' && curElement.querySelector('input').value !== '') {
          obj[columnName] = parseInt(curElement.querySelector('input').value)
        }
         else {
          obj[columnName] = curElement.querySelector('input').value;

        }
      }
    }
    this.oxygenData = this.dataService.getOxygenData();
    if (this.dialogState === 'new') {
      obj.NewOxygenClass = 'new-oxygen';
      this.addOxygen(obj);
    } else {
      console.log(obj);
      this.updateOxygen(obj['id'], obj);
    }
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
    this.activeOxygenData = this.restService.getActiveOxygenData();
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
          if (columnName === "supplierName" && instance.element.id === "supplierName") {
            columnName = "supplier";
            instance.value = obj[columnName] as string;
            instance.dataBind();
          } else {
          instance.value = obj[columnName] as string;
          instance.dataBind();
          }
        } else if (columnName === 'price' && obj[columnName] === '') {
           obj[columnName] = 0;
        } else {
           curElement.querySelector('input').value = obj[columnName] as string;
        }
      }
    }
    console.log(obj)
    this.change = true;
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
    rules.supplierName = { required: [true, 'Enter valid supplier name'] };
    this.dataService.renderFormValidator(formElement, rules, this.newOxygenObj.element);
  }
}
