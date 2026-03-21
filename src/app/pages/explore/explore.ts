import { ChangeDetectorRef, Component } from '@angular/core';
import { Apiservice } from '../../services/apiservice';
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-explore',
  imports: [Card],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore {
 movies: any[] =[];
 loading = true;
 constructor(private api: Apiservice, private cdr:ChangeDetectorRef){}
 ngOnInit(){
  this.api.getListMovies().subscribe((data:any)=>{
    this.movies = data.data;
    this.loading = false;
    this.cdr.detectChanges();
  });
 }
}
