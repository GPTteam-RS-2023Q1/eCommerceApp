import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

export type BuildedParams = [string, string][];

@Injectable({
  providedIn: 'root',
})
export class QueryBuilderService {
  private params: BuildedParams = [];

  public queryDictionary!: Record<string, (...args: any[]) => void>;

  constructor() {
    this.queryDictionary = {
      category: this.filterByCategory,
    };
  }

  public filterByCategory(category: string): QueryBuilderService {
    this.params.push(['filter.query', `categories.id:subtree("${category}")`]);
    return this;
  }

  public getBuildedParams(): BuildedParams {
    const { params } = this;
    this.params = [];
    return params;
  }

  public getParamsFromURL(route: ActivatedRouteSnapshot): BuildedParams {
    this.filterByCategory(route.data['category'].id);
    Object.entries(route.queryParams).forEach(([key, value]) => {
      this.queryDictionary[key](value);
    });
    return this.params;
  }
}
