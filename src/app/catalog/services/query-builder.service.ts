import { Injectable } from '@angular/core';

export type BuildedParams = [string, string][];

@Injectable({
  providedIn: 'root',
})
export class QueryBuilderService {
  private params: BuildedParams = [];

  public queryDictionary!: Record<string, (...args: any[]) => void>;

  constructor() {
    this.queryDictionary = {
      category: this.withCategory,
    };
  }

  public withCategory(category: string): void {
    this.params.push(['filter.query', `categories.id:subtree("${category}")`]);
  }

  public getParams(): BuildedParams {
    const { params } = this;
    this.params = [];
    return params;
  }
}
