import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'] // Fixed typo: should be 'styleUrls' not 'styleUrl'
})
export class AppComponent {
  constructor(private router: Router) {}

 

  
}
