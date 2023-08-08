import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration,ChartType } from 'chart.js';
import {BaseChartDirective} from 'ng2-charts'
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css']
})
export class CoinDetailsComponent implements  OnInit{
  constructor(private activatedRoute :ActivatedRoute,private api :ApiService,private commonServ :CommonService) { }
  coinData:any;
  coinId!:string;
  days:number =1;
  currency:string = "INR";
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(val=>{
      this.coinId = val['id'];
      console.log(this.coinId,"sdas")
    })

    this.getCurrencyById();
    this.getGraphData(this.days)
    this.getCurrency()
  }
  getCurrencyById()
  {
    this.api.getCurrencyById(this.coinId).subscribe(val=>{
      console.log("helo",val)
      this.coinData = val;
      if(this.currency=="USD")
      {
        this.coinData.market_data.current_price.inr = this.coinData?.market_data.current_price.usd;
        this.coinData.market_data.market_cap.inr = this.coinData?.market_data.market_cap.usd;
      }
    })
  }

   public lineChartData: ChartConfiguration['data'] = {
     datasets: [
       {
         data: [],
         label: `Price Trends`,
         backgroundColor: 'rgba(148,159,177,0.2)',
         borderColor: '#009688',
         pointBackgroundColor: '#009688',
         pointBorderColor: '#009688',
         pointHoverBackgroundColor: '#009688',
         pointHoverBorderColor: '#009688',
 
       }
     ],
     labels: []
   };
   public lineChartOptions: ChartConfiguration['options'] = {
     elements: {
       point: {
         radius: 1
       }
     },
 
     plugins: {
       legend: { display: true },
     }
   };
   @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;
   public lineChartType: ChartType = 'line';
   getGraphData(days:number)
   {
    this.days = days;
    console.log("linechart configuraqtion ",this.lineChartData)
     this.api.getGrpahicalCurrencyData(this.coinId,this.currency,this.days).subscribe(data=>{
        setTimeout(()=>{
          this.myLineChart.chart?.update();
        },200);
         this.lineChartData.datasets[0].data = data.prices.map((a:any)=>{ //y-axis data price data
          return a[1];
         });
         this.lineChartData.labels  = data.prices.map((a:any)=>{//x axis data time data
         let date  = new Date(a[0])
         let time = date.getHours()>12 ? 
         `${date.getHours()-12}:${date.getMinutes()} pm`:
         `${date.getHours()-12}:${date.getMinutes()} am`;
         return this.days == 1  ? time : date.toLocaleDateString();
         })
        //  console.log("lables data ",this.lineChartData.labels )
     })
  
   }
   getCurrency()
   {
    this.commonServ.getCurrency().subscribe(e=>{
      console.log("got currency ",e)
      this.currency = e;
      this.getCurrencyById();
      this.getGraphData(this.days);
    })
   }

}


