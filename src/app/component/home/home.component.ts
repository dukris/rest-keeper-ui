import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let id = localStorage.getItem('userId');
    if(id!=null){
      this.router.navigate([`/profile/${id}`]);
    }else{
      this.router.navigate([`/login`]);
    }
  }
  
}
