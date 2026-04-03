import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservice } from '../../services/apiservice';
import { Router, RouterLink } from "@angular/router";

declare var bootstrap: any;

@Component({
  selector: 'app-carousel',
  imports: [ CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnDestroy {
  movies: any[] = [];
  moviescarousel: any[] = [];
  loading= true;
  private carouselInstance: any | null = null;
  private carouselInitTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private api: Apiservice, private cdr: ChangeDetectorRef, private router:Router) {}

  ngOnInit() {
    this.api.getMovies().subscribe((res: any) => {
      this.movies = res.data;
      this.loading=false;
      this.moviescarousel = this.movies.slice(0, 5);

      this.cdr.detectChanges();
      this.carouselInitTimeoutId = setTimeout(() => {
        const el = document.getElementById('movieHeroCarousel');
        if (el) {
          this.carouselInstance = bootstrap.Carousel.getOrCreateInstance(el, {
            ride: 'carousel',
            interval: 3000,
          });
        }
      }, 0);
    });
  }

  ngOnDestroy() {
    if (this.carouselInitTimeoutId) {
      clearTimeout(this.carouselInitTimeoutId);
      this.carouselInitTimeoutId = null;
    }

    if (this.carouselInstance) {
      this.carouselInstance.dispose();
      this.carouselInstance = null;
    }
  }

  goToDetail(movie:any) {
    this.router.navigate(['/movie', movie.id], {
      state: { movie: movie }
    });
  }


}