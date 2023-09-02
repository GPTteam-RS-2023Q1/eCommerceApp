import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CategoryPageQueryResponse } from '../models/page-query-results';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  public getCategories(): Observable<CategoryPageQueryResponse> {
    return this.http.get<CategoryPageQueryResponse>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/categories`
    );
  }

  public getCategoryByTitle(title: string): Observable<CategoryPageQueryResponse> {
    return this.http.get<CategoryPageQueryResponse>(
      `${environment.CTP_API_URL}/${
        environment.CTP_PROJECT_KEY
      }/categories?where=${encodeURIComponent(`metaTitle="${title}"`)}`
    );
  }
}
