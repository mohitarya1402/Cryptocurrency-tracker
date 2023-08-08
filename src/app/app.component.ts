import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chartPractice';
  constructor(private commonServ:CommonService){}
  selectedValue: any = 'INR';
  
  sendCurrency(e:string)
  {
    console.log("from app ",e)
    this.commonServ.setCurrency(e);
  }
  ngOnInit(): void {}
}
