import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Category } from '../models/category';
import { CategoryPageQueryResponse } from '../models/page-query-results';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public menuSubject = new BehaviorSubject(false);

  constructor(private readonly http: HttpClient) {}

  public getCategories(): Observable<CategoryPageQueryResponse> {
    return this.http.get<CategoryPageQueryResponse>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/categories`
    );
  }

  public getCategoryByKey(key: string, expand?: string): Observable<Category> {
    let params = new HttpParams();
    if (expand) {
      params = params.append('exapnd', expand);
    }
    return this.http.get<Category>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/categories/key=${key}`,
      { params }
    );
  }
}
