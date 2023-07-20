import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from 'src/app/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map-home',
  templateUrl: './map-home.component.html',
  styleUrls: ['./map-home.component.css'],
})
export class MapHomeComponent implements OnDestroy {
  svgClicked = new EventEmitter<MouseEvent>();
  pathClicked = new EventEmitter<string>();
  pathMouseOver = new EventEmitter<string>();
  pathMouseOut = new EventEmitter<string>();
  svgMouseOver = new EventEmitter<MouseEvent>();
  svgMouseOut = new EventEmitter<MouseEvent>();

  country = [];
  searchArr = [];

  searchData: string;
  private sub: Subscription;

  constructor(private http: HttpClient, private search: SearchService) {
    this.sub = this.search.getSearch().subscribe((data) => {
      this.searchData = data;
      this.fetchSearch(this.searchData);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchSearch(path: string) {
    this.http
      .get(`https://api.worldbank.org/v2/country/${path}?format=json`)
      .subscribe(
        (data) => {
          this.searchArr.length = 0;
          this.searchArr.push(
            data[1][0].name,
            data[1][0].capitalCity,
            data[1][0].region.value,
            data[1][0].incomeLevel.value,
            data[1][0].longitude,
            data[1][0].latitude
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchData(path: string) {
    this.http
      .get(`https://api.worldbank.org/v2/country/${path}?format=json`)
      .subscribe(
        (data) => {
          this.country.length = 0;
          this.country.push(
            data[1][0].name,
            data[1][0].capitalCity,
            data[1][0].region.value,
            data[1][0].incomeLevel.value,
            data[1][0].longitude,
            data[1][0].latitude
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSvgClick(event: MouseEvent) {
    this.svgClicked.emit(event);
  }

  onPathClick(event: MouseEvent, pathId: string) {
    this.pathClicked.emit(pathId);
    this.fetchData(pathId);
  }

  onPathMouseOver(event: MouseEvent, pathId: string) {
    this.pathMouseOver.emit(pathId);
    this.fetchData(pathId);
  }

  onPathMouseOut(event: MouseEvent, pathId: string) {
    this.pathMouseOut.emit(pathId);
    this.fetchData(pathId);
  }

  onSvgMouseOver(event: MouseEvent) {
    this.svgMouseOver.emit(event);
  }
  onSvgMouseOut(event: MouseEvent) {
    this.svgMouseOut.emit(event);
  }
}
