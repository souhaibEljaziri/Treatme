import { Injectable } from "@angular/core";
import {
  patientsData, oxygenData, paymentsData, doctorsData, specializationData, activityData, hospitalData,
  bloodGroupData, waterCapacityData, oxygenCapacityData, patientsNamesData, suppliersNamesData, oxygenIdsData, waitingList, shift1BlockData, shift2BlockData, shift3BlockData
} from './datasource';
import { EventFieldsMapping } from '@syncfusion/ej2-schedule';
import { CalendarSettings } from './calendar-settings';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-angular-inputs';
import { createElement, remove, removeClass } from '@syncfusion/ej2-base';
import { DoctorsService } from './doctors/doctors.service';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: "root",
})
export class DataService {
  public patientsData: Record<string, any>[];
  public suppliersData: Record<string, any>[];
  public oxygenData: Record<string, any>[];
  public paymentsData: Record<string, any>[];
  public doctorsData: any;
  public calendarSettings: CalendarSettings;
  public selectedDate: Date;
  public eventFields: EventFieldsMapping;
  public activeDoctorData: Record<string, any>;
  public activePatientData: Record<string, any>;
  public activeOxygenData: Record<string, any>;
  public activePaymentData: Record<string, any>;
  public specialistData: Record<string, any>[];
  public activityData: Record<string, any>[];
  public hospitalData: Record<string, any>[];
  public bloodGroupData: Record<string, any>[] = bloodGroupData;
  public waterCapacityData: Record<string, any>[] = waterCapacityData;
  public oxygenCapacityData: Record<string, any>[] = oxygenCapacityData;
  public patientsNamesData: Record<string, any>[] = patientsNamesData;
  public suppliersNamesData: Record<string, any>[] = suppliersNamesData;
  public oxygenIdsData: Record<string, any>[] = oxygenIdsData;
  public waitingList: Record<string, any>[] = waitingList;
  public shift1BlockEvents: Record<string, any>[] = shift1BlockData;
  public shift2BlockEvents: Record<string, any>[] = shift2BlockData;
  public shift3BlockEvents: Record<string, any>[] = shift3BlockData;

  constructor(private doctorsService: DoctorsService,private patientService:PatientService) {
    this.patientsData = patientsData as Record<string, any>[];
    // this.suppliersData = suppliersData as Record<string, any>[];
    this.oxygenData = oxygenData as Record<string, any>[];
    this.paymentsData = paymentsData as Record<string, any>[];
    this.doctorsData = doctorsData as Record<string, any>[];
    this.calendarSettings = {
      bookingColor: "Doctors",
      calendar: {
        start: "08:00",
        end: "21:00",
      },
      currentView: "Week",
      interval: 60,
      firstDayOfWeek: 0,
    };
    this.selectedDate = new Date(2021, 7, 5);
    this.activeDoctorData = this.doctorsData[0];
    this.activePatientData = this.patientsData[0];
    // this.activeSupplierData = this.suppliersData[0];
    this.activeOxygenData = this.oxygenData[0];
    this.activePaymentData = this.paymentsData[0];
    this.specialistData = specializationData as Record<string, any>[];
    this.activityData = activityData;
    this.hospitalData = hospitalData;
  }

  public onUpdateData(
    field: string,
    value: any,
    className: string,
    activeData: any
  ): void {
    if (className.indexOf("doctor") !== -1) {
      for (const doctorData of this.doctorsData) {
        if (doctorData.Id === activeData.Id) {
          doctorData[field] = value;
        }
      }
    } else if (className.indexOf('oxygen') !== -1) {
      for (const oxygenData of this.oxygenData) {
        if (oxygenData.Id === activeData.Id) {
          oxygenData[field] = value;
        }
      }
    }
    else {
      for (const patientData of this.patientsData) {
        if (patientData.Id === activeData.Id) {
          patientData[field] = value;
        }
      }
    }
  }
 convertDataAfterGetPatient(data :  any[]) : any[]{
   let outData : any[] = []
data.forEach((element : any) => {
  outData.push({  Id: element.id,
    Name: element.patientname,
    Text: element.text,
    DOB: new Date(element.dateofbirth),
    Mobile: element.mobilephone,
    Email: element.email,
    Address: element.address,
    Disease: element.disease,
    DepartmentName: element.patientname,
    BloodGroup: element.bloodgroup,
    Gender: element.gender,
    Symptoms: element.blood_group})
});

return outData;
 }
  public getCalendarSettings(): CalendarSettings {
    return this.calendarSettings;
  }

  public setCalendarSettings(args: CalendarSettings): void {
    this.calendarSettings = args;
  }

  public setActiveDoctorData(data: Record<string, any>): void {
    this.activeDoctorData = data;
  }

  public getActiveDoctorData(): Record<string, any> {
    return this.activeDoctorData;
  }

  public setActivePatientData(data: Record<string, any>): void {
    this.activePatientData = data;
  }
  public setActiveSupplierData(data: Record<string, any>): void {
    this.activePatientData = data;
  }
  public getActivePatientData(): Record<string, any> {
    return this.activePatientData;
  }
  public getActiveSupplierData(): Record<string, any> {
    return this.activePatientData;
  }
  public setActiveOxygenData(data: Record<string, any>): void {
    this.activeOxygenData = data;
  }

  public getActiveOxygenData(): Record<string, any> {
    return this.activeOxygenData;
  }

  public getActivePaymentData(): Record<string, any> {
    return this.activePaymentData;
  }

  public setActivePaymentData(data: Record<string, any>): void {
    this.activePaymentData = data;
  }

  public setDoctorsData(data: Record<string, any>[]): void {
    this.doctorsData = data;
  }

  public async getDoctorsData() {
    this.doctorsData = (await this.doctorsService.findAll().toPromise());
    return this.convertDataAfterGet(this.doctorsData['hydra:member']);
  }
  public convertDataAfterGet(data: any[]) {
    let outData: any[] = [];
    data.forEach(element => {

      let workDaysout: any[] = [];
      if (element && element['workDays']) {
        element['workDays'].forEach((res2: any) => {
          workDaysout.push({
            Day: res2.Day,
            Index: res2.dex,
            Enable: res2.Enable,
            WorkStartHour: new Date(res2.WorkStartHour),
            WorkEndHour: new Date(res2.WorkEndHour),
            BreakStartHour: new Date(res2.BreakStartHour),
            BreakEndHour: new Date(res2.BreakEndHour),
            State: res2.state,
          })

        });

        element['workDays'] = workDaysout;
      }
      outData.push({
        Name: element.doctorname,
        Gender: element.gender,
        Text: element.text,
        Id: element.id,
        DepartmentId: element.departmentid,
        Color: element.color,
        Education: element.education,
        Specialization: element.specilaisation,
        Experience: element.experience,
        Designation: element.designation,
        DutyTiming: element.dutytiming,
        Email: element.email,
        Mobile: element.mobilephone,
        Availability: element.availibility,
        StartHour: element.StartHour,
        EndHour: element.EndHour,
        AvailableDays: element && element.AvailableDays ? element.AvailableDays.split(',') : "",
        WorkDays: element['workDays']
      })

    });
    console.log(outData);
    
    return outData;
  }
  public addHospitalData(data: Record<string, any>[]): void {
    this.hospitalData = data;
  }

  public getHospitalData(): Record<string, any>[] {
    return this.hospitalData;
  }

  public setPatientsData(data: Record<string, any>[]): void {
    this.patientsData = data;
  }
  public setSuppliersData(data: Record<string, any>[]): void {
    this.suppliersData = data;
  }

  public async getPatientsData() {
    let data = await this.patientService.findAll().toPromise();
    this.patientsData = this.convertDataAfterGetPatient(data['hydra:member']);
    return this.patientsData;
  }
  public getSuppliersData(): Record<string, any>[] {
    return this.suppliersData;
  }
  public setOxygenData(data: Record<string, any>[]): void {
    this.oxygenData = data;
  }

  public getOxygenData(): Record<string, any>[] {
    return this.oxygenData;
  }

  public setPaymentsData(data: Record<string, any>[]): void {
    this.paymentsData = data;
  }

  public getPaymentsData(): Record<string, any>[] {
    return this.paymentsData;
  }

  public addActivityData(data: Record<string, any>): void {
    this.activityData.unshift(data);
  }

  public getActivityData(): Record<string, any>[] {
    return this.activityData;
  }

  public setWaitingList(data: Record<string, any>[]): void {
    this.waitingList = data;
  }

  public getWaitingList(): Record<string, any>[] {
    return this.waitingList;
  }

  public renderFormValidator(
    formElement: HTMLFormElement,
    rules: Record<string, any>,
    parentElement: HTMLElement
  ): void {
    const model: FormValidatorModel = {
      customPlacement: (inputElement: HTMLElement, error: HTMLElement) => {
        this.errorPlacement(inputElement, error);
      },
      rules: rules as {
        [name: string]: { [rule: string]: Record<string, any> };
      },
      validationComplete: (args: Record<string, any>) => {
        this.validationComplete(args, parentElement);
      },
    };
    const obj: FormValidator = new FormValidator(formElement, model);
  }

  public validationComplete(
    args: Record<string, any>,
    parentElement: HTMLElement
  ): void {
    const elem: HTMLElement = parentElement.querySelector(
      "#" + args.inputName + "_Error"
    ) as HTMLElement;
    if (elem) {
      elem.style.display = args.status === "failure" ? "" : "none";
    }
  }

  public errorPlacement(inputElement: HTMLElement, error: HTMLElement): void {
    const id: string = error.getAttribute("for");
    const elem: Element = inputElement.parentElement.querySelector(
      "#" + id + "_Error"
    );
    if (!elem) {
      const div: HTMLElement = createElement("div", {
        className: "field-error",
        id: inputElement.getAttribute("name") + "_Error",
      });
      const content: Element = createElement("div", {
        className: "error-content",
      });
      content.appendChild(error);
      div.appendChild(content);
      inputElement.parentElement.parentElement.appendChild(div);
    }
  }

  public destroyErrorElement(
    formElement: HTMLFormElement,
    inputElements: HTMLInputElement[]
  ): void {
    if (formElement) {
      const elements: Element[] = [].slice.call(
        formElement.querySelectorAll(".field-error")
      );
      for (const elem of elements) {
        remove(elem);
      }
      for (const element of inputElements) {
        if (element.querySelector("input").classList.contains("e-error")) {
          removeClass([element.querySelector("input")], "e-error");
        }
      }
    }
  }

  public updateActiveItem(text: string): void {
    const elements: NodeListOf<Element> =
      document.querySelectorAll(".active-item");
    elements.forEach((element) => {
      if (element.classList.contains("active-item")) {
        element.classList.remove("active-item");
      }
    });
    document
      .querySelector(".sidebar-item." + text)
      .classList.add("active-item");
  }
}
