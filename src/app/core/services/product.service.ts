import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { BuildedParams } from '@app/catalog/services/query-builder.service';

import { ProductProjectionPageQueryResponse } from '../models/page-query-results';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  public getProducts({
    parameters,
    limit = 20,
  }: {
    parameters: BuildedParams;
    limit?: number;
  }): Observable<ProductProjectionPageQueryResponse> {
    let params = new HttpParams().append('limit', limit);
    parameters.forEach((param) => {
      params = params.append(...param);
    });
    console.log(params);
    return this.http.get<ProductProjectionPageQueryResponse>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/product-projections/search`,
      { params }
    );
  }

  public getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/products/${id}`
    );
  }
}
