import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Rating } from '../model/Rating';
@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  ratings: Rating[] = [];

  constructor(private ratingService: ApiService) {}

  ngOnInit() {
    this.fetchRatings();
  }

  fetchRatings() {
    this.ratingService.getRatings().subscribe((data) => {
      this.ratings = data;
    });
  }
}