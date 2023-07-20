import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  query: string;

  constructor(private searchService: SearchService) {}

  onMouseClick() {
    this.searchService.setSearch(this.query);
  }
}
