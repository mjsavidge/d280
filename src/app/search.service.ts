import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private search = new Subject<string>();

  setSearch(data: string) {
    this.search.next(data);
  }

  getSearch() {
    return this.search.asObservable();
  }
}
