import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

amount :number=1997;
dateofBirth=new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
