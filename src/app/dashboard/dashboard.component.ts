import { Component, OnInit } from '@angular/core';
import {HeroService} from "../hero.service";
import {Hero} from "../hero";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private heroList: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.loadHeroes();
  }

  private loadHeroes() {
    this.heroService.heroes
      .subscribe(res => this.heroList = res.slice(1, 5));
  }

  get heroes(): Hero[] {
    return this.heroList;
  }

}
