import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  ratings: any[] = [];
  userName: string = '';
  rating: number | null = null;
  comments: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchRatings();
  }

  fetchRatings(): void {
    this.apiService.getRatings().subscribe((data) => {
      this.ratings = data;
    });
  }

  submitRating(): void {
    const newRating = {
      user_name: this.userName,
      rating: this.rating,
      comments: this.comments,
    };

    this.apiService.submitRating(newRating).subscribe(() => {
      this.fetchRatings(); // Refresh the list
      this.userName = '';
      this.rating = null;
      this.comments = '';
    });
  }cancel(): void {
  this.userName = '';
  this.rating = null;
  this.comments = '';
}

}