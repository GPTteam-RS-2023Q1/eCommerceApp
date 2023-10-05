import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { BuildedParams } from '@app/catalog/services/query-builder.service';
import { ProductProjectionPageQueryResponse } from '@app/shared/models/interfaces/page-query-results';
import { Product, ProductType } from '@app/shared/models/interfaces/product';

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

  public getProductTypeById(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/product-types/${id}`
    );
  }

  /* public index(): Observable<any> {
    const params = new HttpParams().append('Content-Type', 'application/json');
    return this.http.post<any>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}`,
      {
        version: 4,
        actions: [
          {
            action: 'changeProductSearchIndexingEnabled',
            enabled: true,
          },
        ],
      },
      { params }
    );
  } */
}
