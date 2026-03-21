import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moviedetails',
  imports: [],
  templateUrl: './moviedetails.html',
  styleUrl: './moviedetails.css',
})
export class Moviedetails {
  movie: any = null;

  ngOnInit() {
    this.movie = history.state.movie;
    console.log(this.movie);
  }
}