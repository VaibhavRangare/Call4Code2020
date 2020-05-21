import { map, reduce } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ɵAnimationGroupPlayer } from '@angular/animations';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'; 
import { Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})
export class IndiaComponent implements OnInit {

  noData = false;
  india_date = new Date();
  india_date_string;
  todaysDate = new Date();
  todaysDate_date_string;
  i_records;
  x_records = [];
  y_records=[];
  myChart;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.noData = false;
    let i_resp = this.http.get('https://corona-api.com/countries/IN');
    let x = moment(this.india_date).format('yyyy-MM-DD');
    this.india_date_string = x;
   let p = moment(this.todaysDate).format('yyyy-MM-DD');
    this.todaysDate_date_string = p;
    i_resp.subscribe((data)=>{this.i_records = data['data'];});
    this.getData();
    this.displayChart();
  }

  getData(){
    let resp = this.http.get('https://corona-api.com/countries/IN');
    resp.subscribe((data)=>{
      let p = data['data']['timeline'];
      p.forEach(element => {
        this.x_records.push(element.deaths);
        this.y_records.push(element.date);
      }
      );
      this.y_records = this.y_records.reverse();
      this.x_records = this.x_records.reverse();
     });
  }

  refresh(){
    this.myChart.update();
  }
  
  updateIndiaRecords(event){
    let i_resp = this.http.get('https://corona-api.com/countries/IN');
    let x = moment(this.india_date).format('yyyy-MM-DD');
    this.india_date_string = x;
    let date1;
    i_resp.subscribe((data)=>{
      this.i_records = data['data'];
      date1 = new Date(this.i_records.timeline[0].date);
      if(this.india_date > date1){
        this.noData = true;
      }else {
        this.noData = false;
      }
    });
  }
  
  displayChart(){
    var ctx = document.getElementById('myChart');
    this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.y_records,
            datasets: [{
                label: '# of Deaths',
                data: this.x_records,
                fill:false,
                pointBackgroundColor: "#c8161e",
            }]
        },
        options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
      }
    });
  }

}

