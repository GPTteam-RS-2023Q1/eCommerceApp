import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { BuildedParams } from '@app/catalog/services/query-builder.service';

import { ProductProjectionPageQueryResponse } from '../models/page-query-results';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  public getProducts(
    parameters: BuildedParams
  ): Observable<ProductProjectionPageQueryResponse> {
    let params = new HttpParams();
    parameters.forEach((param) => {
      params = params.append(...param);
    });
    return this.http.get<ProductProjectionPageQueryResponse>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/product-projections/search`,
      { params }
    );
  }
}
