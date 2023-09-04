import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { SortMode } from '../models/enums/sort-modes';

export type BuildedParams = [string, string][];

@Injectable({ providedIn: 'root' })
export class QueryBuilderService {
  private params: BuildedParams = [];

  public queryDictionary!: Record<string, (...args: any[]) => void>;

  constructor() {
    this.queryDictionary = {
      category: (category: string): void => {
        this.filterByCategory(category);
      },
      text: (text: string): void => {
        this.fiterByText(text);
      },
    };
  }

  public filterByCategory(category: string): QueryBuilderService {
    this.params.push(['filter.query', `categories.id:subtree("${category}")`]);
    return this;
  }

  public fiterByText(text: string): QueryBuilderService {
    if (text) {
      this.params.push(
        ['text.en', text],
        ['text.ru', text],
        ['fuzzy', `true`],
        ['fuzzyLevel', `${this.getFuzzyLevel(text)}`]
      );
    }
    return this;
  }

  public sortByPrice(mode: SortMode): QueryBuilderService {
    this.params.push(['sort', `price ${mode}`]);
    return this;
  }

  public getBuildedParams(): BuildedParams {
    const { params } = this;
    this.params = [];
    return params;
  }

  public withParamsFromURL(route: ActivatedRouteSnapshot): QueryBuilderService {
    this.filterByCategory(route.data['category'].id);
    Object.entries(route.queryParams).forEach(([key, value]) => {
      this.queryDictionary[key](value);
    });

    return this;
  }

  private getFuzzyLevel(text: string): number {
    const { length } = text;
    if (length <= 2) {
      return 0;
    }

    if (length <= 5 && length > 2) {
      return 1;
    }

    return 2;
  }
}
