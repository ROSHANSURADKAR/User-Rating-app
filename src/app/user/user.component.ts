import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  ratings: any[] = [];
  userName: string = '';
  rating: number | null = null;
  comments: string = '';
  isEditMode: boolean = false;
  editId: number | null = null;

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
    const ratingData = {
      user_name: this.userName,
      rating: this.rating,
      comments: this.comments,
    };

    if (this.isEditMode && this.editId !== null) {
      // Update existing rating
      this.apiService.updateRating(this.editId, ratingData).subscribe(() => {
        this.fetchRatings();
        this.resetForm();
      });
    } else {
      // Add new rating
      this.apiService.submitRating(ratingData).subscribe(() => {
        this.fetchRatings();
        this.resetForm();
      });
    }
  }

  editRating(rating: any): void {
    this.isEditMode = true;
    this.editId = rating.id; // Make sure your backend sends rating ID
    this.userName = rating.user_name;
    this.rating = rating.rating;
    this.comments = rating.comments;
  }

  cancel(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.userName = '';
    this.rating = null;
    this.comments = '';
    this.isEditMode = false;
    this.editId = null;
  }
}
