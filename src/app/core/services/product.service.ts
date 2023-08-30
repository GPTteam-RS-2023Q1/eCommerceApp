import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { ProductPageQueryResponse } from '../models/product-page-result';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  public getProducts(): Observable<ProductPageQueryResponse> {
    return this.http.get<ProductPageQueryResponse>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/products`
    );
  }
}
