import { Component } from '@angular/core';
import { Carousel } from "../../components/carousel/carousel";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [Carousel, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
