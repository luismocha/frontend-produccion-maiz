import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar-principal',
  templateUrl: './topbar-principal.component.html',
  styleUrls: ['./topbar-principal.component.scss']
})
export class TopbarPrincipalComponent implements OnInit {
  
  login: boolean = true

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.router.url == '/principal' || '/'){
      this.login = true
    }if(this.router.url === '/auth/login'){
      this.login = false;
    }
    }
  }