import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatisticsService } from 'src/app/service/StatisticsService';
import { Statistics } from 'src/app/model/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statistics!: Statistics;
  currentId!: string | null;
  role: string | null = localStorage.getItem('roleName');

  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("userId");
    this.statisticsService
      .get()
      .subscribe({
        next: (res) => {
          this.statistics = res;
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            Object.values(response.error.errors).map((message) => {
              alert(message);
            });
          }
          if (response.status >= 500) {
            alert("something happened on the server")
          }
        }
      })
  }

}
