import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor() { }
  public id=['qDuKsiwS5xw','qj_AZ_FkPtQ','qDuKsiwS5xw'];
  ids = [
    {'id':'RusMz-PbB9Y','title':'Coronavirus vaccine update: ','description':'How far along is the research? | COVID-19 Special'},
    {'id':'TKbED2v1_7k','title':'NIAID B-roll: ','description':'Novel Coronavirus Vaccine Research'},
    {'id':'BzC3QNyiymk','title':'How scientists are confronting coronavirus: ','description':'Scripps Research COVID-19 updates'},
    {'id':'zNJsihYhdBA','title':'Coronavirus research: ','description':'When can a vaccine be expected? | DW News'}
  ];
  ngOnInit() {
    
  }

}
