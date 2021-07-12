import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  @ViewChild('sideBar')
  public sideBar: SidebarComponent;
  public showBackdrop = false;
  public closeOnDocumentClick = false;
  url: any;
  show: any = true;

  constructor(protected router: Router) {
    this.url = this.router;
    document.body.classList.add('main-page');
    if (Browser.isDevice) {
      this.showBackdrop = true;
      this.closeOnDocumentClick = true;
    }
  }

  public ngAfterViewInit(): void {
    
    // this.url = this.router.url;
    if (Browser.isDevice) {
      document.querySelector('.planner-header').classList.add('device-header');
      document.querySelector('.planner-wrapper').classList.add('device-wrapper');
    }
  }
  logout(){
    this.router.navigateByUrl('/login');
  }
  controlSideBar(){
   if(this.show){
    this.sideBar.hide();
   }
   else 
   this.sideBar.show();
   this.show =!this.show;
  }
  public btnClick(): void {
    if ((!(document.URL).includes('login')))
      this.sideBar.show();
    else
      this.sideBar.hide();
  }

  public onItemClick(args: any): void {
    if (Browser.isDevice) {
      this.sideBar.hide();
    }
    const elements: HTMLElement[] = args.currentTarget.parentElement.querySelectorAll('.active-item');
    elements.forEach(element => {
      if (element.classList.contains('active-item')) { element.classList.remove('active-item'); }
    });
    args.currentTarget.classList.add('active-item');
  }
}
