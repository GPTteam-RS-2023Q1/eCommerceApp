import { Injectable } from '@angular/core';

export type Query = Record<string, string>;

@Injectable({
  providedIn: 'root',
})
export class UrlBuilderService {
  private query: Query = {};

  public withTextSearch(text: string): UrlBuilderService {
    this.query['text'] = text;
    return this;
  }

  public getBuildedQuery(): Query {
    return this.query;
  }
}
