import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ɵAnimationGroupPlayer } from '@angular/animations';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'; 
import { Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-usindiacharts',
  templateUrl: './usindiacharts.component.html',
  styleUrls: ['./usindiacharts.component.scss']
})
export class UsindiachartsComponent implements OnInit {

  constructor(private http:HttpClient) { }

  xRecords = ['Global','US','India'];
  deathRecords = [];
  confirmedRecords = [];
  activeRecords = [];
  recoveredRecords =[];
  newCasesRecords = [];
  newDeathsRecords = [];

  globalDeaths;
  globalConfirmed;
  globalActive;
  globalRecovered;
  globalNewCases;
  globalNewDeaths;

  usDeaths;
  usConfirmed;
  usActive;
  usRecovered;
  usNewCases;
  usNewDeaths;

  inDeaths;
  inConfirmed;
  inActive;
  inRecovered;
  inNewCases;
  inNewDeaths;

  ngOnInit() {
    this.getRecords();
    this.displayDeathChart();
    this.displayConfirmedChart();
    this.displayActiveChart();
    this.displayRecoveredChart();
    this.displayNewCasesChart();
    this.displayNewDeathsChart();
  }

  getRecords(){
    this.deathRecords.length = 0;
    this.confirmedRecords.length = 0;
    this.activeRecords.length = 0;
    this.recoveredRecords.length = 0;
    this.newCasesRecords.length = 0;
    this.newDeathsRecords.length = 0;
    
    let respg= this.http.get('https://corona-api.com/timeline');
    respg.subscribe((data)=>{
      let p = data['data'];
      this.globalDeaths = p[0].deaths;
      this.globalConfirmed = p[0].confirmed;
      this.globalActive = p[0].active;
      this.globalRecovered = p[0].recovered;
      this.globalNewCases = p[0].new_confirmed;
      this.globalNewDeaths = p[0].new_deaths;

      this.deathRecords.push(this.globalDeaths);
      this.confirmedRecords.push(this.globalConfirmed);
      this.activeRecords.push(this.globalActive);
      this.recoveredRecords.push(this.globalRecovered);
      this.newCasesRecords.push(this.globalNewCases);
      this.newDeathsRecords.push(this.globalNewDeaths);
    });

    let respus= this.http.get('https://corona-api.com/countries/US');
    respus.subscribe((data)=>{
      let q = data['data']['timeline'];
      this.usDeaths = q[0].deaths;
      this.usConfirmed = q[0].confirmed;
      this.usActive = q[0].active;
      this.usRecovered = q[0].recovered;
      this.usNewCases = q[0].new_confirmed;
      this.usNewDeaths = q[0].new_deaths;
      this.deathRecords.push(this.usDeaths);
      this.confirmedRecords.push(this.usConfirmed);
      this.activeRecords.push(this.usActive);
      this.recoveredRecords.push(this.usRecovered);
      this.newCasesRecords.push(this.usNewCases);
      this.newDeathsRecords.push(this.usNewDeaths);
    });

    let respin= this.http.get('https://corona-api.com/countries/IN');
    respin.subscribe((data)=>{
      let r = data['data']['timeline'];
      this.inDeaths = r[0].deaths;
      this.inConfirmed = r[0].confirmed;
      this.inActive = r[0].active;
      this.inRecovered = r[0].recovered;
      this.inNewCases = r[0].new_confirmed;
      this.inNewDeaths = r[0].new_deaths;
      this.deathRecords.push(this.inDeaths);
      this.confirmedRecords.push(this.inConfirmed);
      this.activeRecords.push(this.inActive);
      this.recoveredRecords.push(this.inRecovered);
      this.newCasesRecords.push(this.inNewCases);
      this.newDeathsRecords.push(this.inNewDeaths);
    });
  }

 
  refresh(){
    this.displayDeathChart();
    this.displayConfirmedChart();
    this.displayActiveChart();
    this.displayRecoveredChart();
    this.displayNewCasesChart();
    this.displayNewDeathsChart();
  }

  displayDeathChart(){
    var ctx = document.getElementById('deathChart');
    var deathChart = new Chart(ctx, {
        type: 'bar',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.xRecords,
            datasets: [{
                label: '# of Deaths',
                data: this.deathRecords,
                fill:false,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
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
    var ctx = document.getElementById('confirmedChart');
    var confirmedChart = new Chart(ctx, {
        type: 'bar',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.xRecords,
            datasets: [{
                label: '# of Confirmed Cases',
                data: this.confirmedRecords,
                fill:false,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
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
    var activeChart = new Chart(ctx, {
        type: 'bar',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.xRecords,
            datasets: [{
                label: '# of Active cases',
                data: this.activeRecords,
                fill:false,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
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

   displayRecoveredChart(){
    var ctx = document.getElementById('recoveredChart');
    var recoveredChart = new Chart(ctx, {
        type: 'bar',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.xRecords,
            datasets: [{
                label: '# of Recovered cases',
                data: this.recoveredRecords,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
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

   displayNewCasesChart(){
    var ctx = document.getElementById('newCasesChart');
    var NewCasesChart = new Chart(ctx, {
        type: 'bar',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.xRecords,
            datasets: [{
                label: '# of New cases',
                data: this.newCasesRecords,
                fill:false,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
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

   displayNewDeathsChart(){
    var ctx = document.getElementById('newDeathsChart');
    var NewDeathsChart = new Chart(ctx, {
        type: 'bar',
        backgroundColor: "#F5DEB3",
        data: {
            labels: this.xRecords,
            datasets: [{
                label: '# of New Deaths',
                data: this.newDeathsRecords,
                fill:false,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
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