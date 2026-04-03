import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apiservice } from '../../services/apiservice';

type CastMember = {
  id?: number;
  name?: string;
  character?: string;
  profile_path?: string;
};

type MovieDetails = {
  id?: string;
  backdrop_path?: string;
  original_title?: string;
  vote_average?: number;
  vote_count?: number;
  original_language?: string;
  popularity?: number;
  adult?: boolean;
  poster_path?: string;
  release_date?: string;
  overview?: string;
  casts?: CastMember[];
};

@Component({
  selector: 'app-moviedetails',
  imports: [],
  templateUrl: './moviedetails.html',
  styleUrl: './moviedetails.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Moviedetails {
  movie: MovieDetails | null = null;

  private readonly fallbackCastImage =
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2272%22 height=%2272%22 viewBox=%220 0 72 72%22%3E%3Crect width=%2272%22 height=%2272%22 fill=%22%23222634%22/%3E%3Ccircle cx=%2236%22 cy=%2227%22 r=%2212%22 fill=%22%23586777%22/%3E%3Crect x=%2220%22 y=%2244%22 width=%2232%22 height=%2216%22 rx=%228%22 fill=%22%23586777%22/%3E%3C/svg%3E';

  constructor(
    private route: ActivatedRoute,
    private apiService: Apiservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Try to get from navigation state first
    this.movie = (history.state?.movie as MovieDetails | undefined) ?? null;

    // If no movie in state, fetch from API (page was refreshed)
    if (!this.movie) {
      console.log('No movie in navigation state, fetching from API...');
      this.route.paramMap.subscribe(paramMap => {
        const movieId = paramMap.get('id');
        console.log('Extracted movieId from route:', movieId);
        if (movieId) { 
        this.apiService.getMovies().subscribe((reponse :any) => {
                //console.log('API response received:', reponse);
                this.movie = reponse.data.find((m :any) => m.id === movieId) ?? null;
                if(!this.movie){
                  console.warn(`Movie with id ${movieId} not found in API response. Using first movie as fallback.`);
                  this.movie=reponse.data[0];
                  //console.log('Fallback movie:', this.movie);
                  }
            this.cdr.markForCheck();
        });
        }
      });
    }
  }

  get visibleCasts(): CastMember[] {
    return this.movie?.casts?.slice(0, 24) ?? [];
  }

  onCastImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) {
      return;
    }

    img.onerror = null;
    img.src = this.fallbackCastImage;
  }
}