import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservice } from '../../services/apiservice';
import { RouterLink } from "@angular/router";

declare var bootstrap: any;

@Component({
  selector: 'app-carousel',
  imports: [RouterLink, CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  movies: any[] = [];
  moviescarousel: any[] = [];
  loading= true;

  constructor(private api: Apiservice, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getMovies().subscribe((res: any) => {
      this.movies = res.data;
      this.loading=false;
      this.moviescarousel = this.movies.slice(0, 5);

      this.cdr.detectChanges();
      setTimeout(() => {
        const el = document.getElementById('movieHeroCarousel');
        if (el) {
          new bootstrap.Carousel(el, { ride: 'carousel', interval: 3000 });
        }
      }, 0);
    });
  }
}