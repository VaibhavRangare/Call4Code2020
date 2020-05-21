import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ɵAnimationGroupPlayer } from '@angular/animations';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'; 

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {
  g_records;
  i_records;
  u_records;
  world_date = new Date();
  world_date_string;
  india_date = new Date();
  india_date_string;
  us_date = new Date();
  us_date_string;
  InoData = false;
  UnoData = false;
  GnoData = false;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.InoData = false;
    this.UnoData = false;
    this.GnoData = false;
    let i_resp = this.http.get('https://corona-api.com/countries/IN');
    let g_resp = this.http.get('https://corona-api.com/timeline');
    let u_resp = this.http.get('https://corona-api.com/countries/US');
    let x = moment(this.world_date).format('yyyy-MM-DD');
    this.world_date_string = x;
     x = moment(this.india_date).format('yyyy-MM-DD');
    this.india_date_string = x;
    x = moment(this.us_date).format('yyyy-MM-DD');
    this.us_date_string = x;
    i_resp.subscribe((data)=>{
      this.i_records = data['data'];
     });
    g_resp.subscribe((data)=>{
      this.g_records = data['data'];
    });
    u_resp.subscribe((data)=>{
      this.u_records = data['data'];
    });
  }

  updateGlobal(event){ 
    let g_resp = this.http.get('https://corona-api.com/timeline');
    let x = moment(this.world_date).format('yyyy-MM-DD');
    this.world_date_string = x;
    let date1;
    g_resp.subscribe((data)=>{
      this.g_records = data['data'];
      date1 = new Date(this.g_records[0].date);
      if(this.world_date > date1){
        this.GnoData = true;
      }else {
        this.GnoData = false;
      }
    });
  }

  updateUs(event){
    let u_resp = this.http.get('https://corona-api.com/countries/US');
    let x = moment(this.us_date).format('yyyy-MM-DD');
    this.us_date_string = x;
    let date1;
    u_resp.subscribe((data)=>{
      this.u_records = data['data'];
      date1 = new Date(this.u_records.timeline[0].date);
      if(this.us_date > date1){
        this.UnoData = true;
      }else {
        this.UnoData = false;
      }
    });
  }

  updateIndia(event){
    let i_resp = this.http.get('https://corona-api.com/countries/IN');
    let x = moment(this.india_date).format('yyyy-MM-DD');
    this.india_date_string = x;
    let date1;
    i_resp.subscribe((data)=>{
      this.i_records = data['data'];
      date1 = new Date(this.i_records.timeline[0].date);
      if(this.india_date > date1){
        this.InoData = true;
      }else {
        this.InoData = false;
      }
    });
  }

}