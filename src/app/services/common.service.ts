import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private selectedCurrency$ : BehaviorSubject<string> = new BehaviorSubject<string>("INR");

  getCurrency(){
    return this.selectedCurrency$.asObservable();
  }
  setCurrency(currency : string){
    this.selectedCurrency$.next(currency);
  } 
}
