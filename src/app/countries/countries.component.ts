import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ɵAnimationGroupPlayer } from '@angular/animations';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'; 
import { Chart } from 'node_modules/chart.js'
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  
  constructor(private http:HttpClient) { }
  countries;
  country;
  
  deathRecords = [];
  ydeathRecords = [];
  activeRecords = [];
  yactiveRecords = [];
  recoveredRecords = [];
  yrecoveredRecords = [];

  confirmedRecord = [];
  yconfirmedRecord = [];
  newRecord = [];
  ynewRecord = [];
  newDeathRecord = [];
  ynewDeathRecord = [];

  deathChart;
  activeChart;
  recoveredChart;

  confirmedChart;
  newCaseChart;
  newDeathChart;
  
  ngOnInit() {
    this.getCountries();
  }

  getCountries(){
    let resp= this.http.get('https://corona-api.com/countries');
    resp.subscribe((data)=>{
      this.countries = data['data'];
     });
  }

  getCountry(event){
    let resp= this.http.get('https://corona-api.com/countries/'+this.country);
    resp.subscribe((data)=>{
      let p = data['data']['timeline'];
      this.getDeathRecords(p);
      this.getActiveRecords(p);
      this.getRecoveredRecords(p);
      this.getConfirmedRecords(p);
      this.getNewRecords(p);
      this.getNewDeathRecords(p);
     });
  }

  getDeathRecords(data){
    this.deathRecords.length = 0;
    this.ydeathRecords.length = 0;
    data.forEach(element => {
      this.deathRecords.push(element.deaths);
      this.ydeathRecords.push(element.date);
     });
    this.ydeathRecords = this.ydeathRecords.reverse();
    this.deathRecords = this.deathRecords.reverse();
  }

  getActiveRecords(data){
    this.activeRecords.length = 0;
    this.yactiveRecords.length = 0;
    data.forEach(element => {
    this.activeRecords.push(element.active);
    this.yactiveRecords.push(element.date);
     });
    this.yactiveRecords = this.yactiveRecords.reverse();
    this.activeRecords = this.activeRecords.reverse();
  }

  getRecoveredRecords(data){
    this.recoveredRecords.length = 0;
    this.yrecoveredRecords.length = 0;
    data.forEach(element => {
    this.recoveredRecords.push(element.recovered);
    this.yrecoveredRecords.push(element.date);
     });
    this.yrecoveredRecords = this.yrecoveredRecords.reverse();
    this.recoveredRecords = this.recoveredRecords.reverse();
  }

  getConfirmedRecords(data){
    this.confirmedRecord.length = 0;
    this.yconfirmedRecord.length = 0;
    data.forEach(element => {
      this.confirmedRecord.push(element.confirmed);
      this.yconfirmedRecord.push(element.date);
    });
    this.yconfirmedRecord = this.yconfirmedRecord.reverse();
    this.confirmedRecord = this.confirmedRecord.reverse();
  }

  getNewRecords(data){
    this.newRecord.length = 0;
    this.ynewRecord.length = 0;
    data.forEach(element => {
      this.newRecord.push(element.new_confirmed);
      this.ynewRecord.push(element.date);
    });
    this.ynewRecord = this.ynewRecord.reverse();
    this.newRecord = this.newRecord.reverse();
  }

  getNewDeathRecords(data){
    this.newDeathRecord.length = 0;
    this.ynewDeathRecord.length = 0;
    data.forEach(element => {
      this.newDeathRecord.push(element.new_deaths);
      this.ynewDeathRecord.push(element.date);
    });
    this.ynewDeathRecord = this.ynewDeathRecord.reverse();
    this.newDeathRecord = this.newDeathRecord.reverse();
  }

  refresh(){
    this.displayDeathChart();
    this.displayActiveChart();
    this.displayRecoverChart();
    this.displayConfirmedChart();
    this.displayNewCaseChart();
    this.displayNewDeathChart();
  }

  displayDeathChart(){
    var ctx = document.getElementById('deathChart');
    this.deathChart = new Chart(ctx, {
        type: 'line',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.ydeathRecords,
            datasets: [{
                label: '# of Deaths',
                data: this.deathRecords,
                fill:false,
                backgroundColor:"#42d621",
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

   displayActiveChart(){
    var ctx = document.getElementById('activeChart');
    this.activeChart = new Chart(ctx, {
        type: 'line',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.yactiveRecords,
            datasets: [{
                label: '# of Active Records',
                data: this.activeRecords,
                fill:false,
                backgroundColor:"#42d621",
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

   displayRecoverChart(){
    var ctx = document.getElementById('recoverChart');
    this.recoveredChart = new Chart(ctx, {
        type: 'line',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.yrecoveredRecords,
            datasets: [{
                label: '# of Recovered Records',
                data: this.recoveredRecords,
                fill:false,
                backgroundColor:"#42d621",
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

   displayConfirmedChart(){
    var ctx = document.getElementById('deathConfirmedChart');
    this.confirmedChart = new Chart(ctx, {
        type: 'line',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.yconfirmedRecord,
            datasets: [{
                label: '# of Confirmed Records',
                data: this.confirmedRecord,
                fill:false,
                backgroundColor:"#42d621",
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

   displayNewCaseChart(){
    var ctx = document.getElementById('newCaseChart');
    this.newCaseChart = new Chart(ctx, {
        type: 'line',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.ynewRecord,
            datasets: [{
                label: '# of new cases',
                data: this.newRecord,
                fill:false,
                backgroundColor:"#42d621",
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

   displayNewDeathChart(){
    var ctx = document.getElementById('newDeath');
    this.newDeathChart = new Chart(ctx, {
        type: 'line',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.ynewDeathRecord,
            datasets: [{
                label: '# of new Deaths',
                data: this.newDeathRecord,
                fill:false,
                backgroundColor:"#42d621",
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