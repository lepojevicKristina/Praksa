import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  description = "Greek: (n.)The delusion of things being more beautiful than they really are.";

  constructor() { }

  ngOnInit() {
  }

}
