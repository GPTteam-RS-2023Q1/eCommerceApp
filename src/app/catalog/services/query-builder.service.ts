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
      colors: (colors: string[]): void => {
        this.filterByColor(colors);
      },
      price: (price: string[]): void => {
        this.filterByPrice(price);
      },
      seasons: (seasons: string[]): void => {
        this.filterBySeasons(seasons);
      },
      patterns: (patterns: string[]): void => {
        this.filterByPatterns(patterns);
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

  public filterByColor(colors: string[]): QueryBuilderService {
    if (colors.length === 0 || !colors[0]) {
      return this;
    }

    this.params.push([
      'filter.query',
      `variants.attributes.color:${colors.map((val) => `"${val}"`).join(',')}`,
    ]);
    return this;
  }

  public filterBySeasons(season: string[]): QueryBuilderService {
    if (season.length === 0 || !season[0]) {
      return this;
    }

    this.params.push([
      'filter.query',
      `variants.attributes.season:${season.map((val) => `"${val}"`).join(',')}`,
    ]);
    return this;
  }

  public filterByPrice(priceRange: string[]): QueryBuilderService {
    if (priceRange.length === 0 || priceRange[0] === undefined) {
      return this;
    }

    this.params.push([
      'filter.query',
      `variants.price.centAmount:range (${Number(priceRange[0]) * 100} to ${
        Number(priceRange[1]) * 100
      })`,
    ]);
    return this;
  }

  public filterByPatterns(pattern: string[]): QueryBuilderService {
    if (pattern.length === 0 || !pattern[0]) {
      return this;
    }

    this.params.push([
      'filter.query',
      `variants.attributes.pattern:${pattern.map((val) => `"${val}"`).join(',')}`,
    ]);
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
      console.log(value);
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
