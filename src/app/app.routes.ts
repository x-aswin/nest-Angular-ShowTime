import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Explore } from './pages/explore/explore';
import { About } from './pages/about/about';
import { Moviedetails } from './pages/moviedetails/moviedetails';

export const routes: Routes = [
    {
        path: '', component : Home
    },
    {
        path: 'explore', component:Explore
    },
    {
        path: 'about', component:About
    },
    {
        path: 'movie/:id', component: Moviedetails
    },
    {
        path: 'movie', redirectTo: 'explore', pathMatch: 'full'
    },
];
