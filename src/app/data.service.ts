import { Injectable } from "@angular/core";
import {
  patientsData,
  oxygenData,
  doctorsData,
  specializationData,
  activityData,
  hospitalData,
  bloodGroupData,
  waitingList,
  shift1BlockData,
  shift2BlockData,
  shift3BlockData,
  suppliersData,
} from "./datasource";
import { EventFieldsMapping } from "@syncfusion/ej2-schedule";
import { CalendarSettings } from "./calendar-settings";
import {
  FormValidator,
  FormValidatorModel,
} from "@syncfusion/ej2-angular-inputs";
import { createElement, remove, removeClass } from "@syncfusion/ej2-base";

@Injectable({
  providedIn: "root",
})
export class DataService {
  public patientsData: Record<string, any>[];
  public suppliersData: Record<string, any>[];
  public oxygenData: Record<string, any>[];
  public doctorsData: Record<string, any>[];
  public calendarSettings: CalendarSettings;
  public selectedDate: Date;
  public eventFields: EventFieldsMapping;
  public activeDoctorData: Record<string, any>;
  public activePatientData: Record<string, any>;
  public activeOxygenData: Record<string, any>;
  public activeSupplierData: Record<string, any>;
  public specialistData: Record<string, any>[];
  public activityData: Record<string, any>[];
  public hospitalData: Record<string, any>[];
  public bloodGroupData: Record<string, any>[] = bloodGroupData;
  public waitingList: Record<string, any>[] = waitingList;
  public shift1BlockEvents: Record<string, any>[] = shift1BlockData;
  public shift2BlockEvents: Record<string, any>[] = shift2BlockData;
  public shift3BlockEvents: Record<string, any>[] = shift3BlockData;

  constructor() {
    this.patientsData = patientsData as Record<string, any>[];
    this.suppliersData = suppliersData as Record<string, any>[];
    this.oxygenData = oxygenData as Record<string, any>[];
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
    this.activeSupplierData = this.suppliersData[0];
    this.activeOxygenData = this.oxygenData[0];
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
    }
    if (className.indexOf("supplier") !== -1) {
      for (const supplierData of this.suppliersData) {
        if (supplierData.Id === activeData.Id) {
          supplierData[field] = value;
        }
      }
    } else {
      for (const patientData of this.patientsData) {
        if (patientData.Id === activeData.Id) {
          patientData[field] = value;
        }
      }
    }
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

  public setDoctorsData(data: Record<string, any>[]): void {
    this.doctorsData = data;
  }

  public getDoctorsData(): Record<string, any>[] {
    return this.doctorsData;
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

  public getPatientsData(): Record<string, any>[] {
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
