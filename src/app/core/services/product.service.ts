import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { ProductPageQueryResponse } from '../models/page-query-results';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  public getProducts(
    params: HttpParams = new HttpParams()
  ): Observable<ProductPageQueryResponse> {
    return this.http.get<ProductPageQueryResponse>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/product-projections/search`,
      {
        params,
      }
    );
  }
}
