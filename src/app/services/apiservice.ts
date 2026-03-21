import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {
  constructor(private http: HttpClient){
  }
  getMovies(){
    return this.http.get('https://jsonfakery.com/movies/paginated');
  }
   getListMovies(){
    return this.http.get('https://jsonfakery.com/movies/paginated');
  }
}
