import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QueryBuilderService {
  private params = new HttpParams();

  public queryDictionary!: Record<string, (...args: any[]) => void>;

  constructor() {
    this.queryDictionary = {
      category: this.withCategory,
    };
  }

  public withCategory = (category: string): void => {
    this.params = this.params.append('filter', `categories.key:"{${category}}"`);
  };

  public getParams(): HttpParams {
    return this.params;
  }
}
