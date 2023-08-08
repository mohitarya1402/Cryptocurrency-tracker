import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent {

  constructor(private api:ApiService,private rout :Router,private commonServ :CommonService) { }
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  trendingCurrency:any =[];
  currencyData:any = [];
  currency:string = "INR";
  displayedColumns:any = ['symbol','current_price','price_change_percentage_24h','market_cap']
  ngOnInit(): void {
    this.getAlldata()
    this.getTrendingData()
    this.getCurrency()
  }
getAlldata()
{
  this.api.getCurrency(this.currency).subscribe((data)=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

getTrendingData()
{
  this.api.getTrendingCurrency(this.currency).subscribe((data)=>{
    this.trendingCurrency = data;
  })
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

goToDetails(row:any)
{
  //console.log(row)
   this.rout.navigate(['coin-details',row.id])
}
getCurrency()
{
 this.commonServ.getCurrency().subscribe(e=>{
   console.log("got currency ",e)
   this.currency = e;
   this.getAlldata()
   this.getTrendingData()
 })
}
}
