import { Component, Input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() movie: any;
  constructor(private router: Router) {}
  goToDetail() {
    this.router.navigate(['/movie', this.movie.id], {
      state: { movie: this.movie }
    });
  }
}