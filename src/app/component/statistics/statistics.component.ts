import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatisticsService } from 'src/app/service/StatisticsService';
import { Statistics } from 'src/app/model/statistics';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statistics!: Statistics;
  currentId!: string | null;
  role: string | null = localStorage.getItem('roleName');
  cookies: Cookies = new Cookies();

  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.cookies.get('access') == null) {
      localStorage.removeItem('userId')
      localStorage.removeItem('roleName')
      this.router.navigate(["/login"]);
    }
    this.currentId = localStorage.getItem("userId");
    this.statisticsService
      .get()
      .subscribe({
        next: (res) => {
          this.statistics = res;
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            alert(response.error.msg)
          }
          if (response.status >= 500) {
            alert("something happened on the server")
          }
        }
      })
  }

  logout(){
    localStorage.removeItem('userId')
    localStorage.removeItem('roleName')
    this.cookies.remove('access');
    this.cookies.remove('refresh');
    this.router.navigate(["/login"]);
  }

}
