import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

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
      colors: (colors: string[] | string): void => {
        this.filterByColor(colors);
      },
      price: (price: string[] | string): void => {
        this.filterByPrice(price);
      },
      seasons: (seasons: string[] | string): void => {
        this.filterBySeasons(seasons);
      },
      patterns: (patterns: string[] | string): void => {
        this.filterByPatterns(patterns);
      },
      sort: (sort: string): void => {
        this.sort(sort);
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

  public sort(sort: string): QueryBuilderService {
    const [sortBy, sortMode] = sort.split(':');
    this.params.push(['sort', `${sortBy === 'name' ? 'name.ru' : sortBy} ${sortMode}`]);
    return this;
  }

  public filterByColor(colors: string[] | string): QueryBuilderService {
    if (colors.length === 0 || !colors[0]) {
      return this;
    }

    const param = Array.isArray(colors) ? colors : [colors];

    this.params.push([
      'filter.query',
      `variants.attributes.color:${param.map((val) => `"${val}"`).join(',')}`,
    ]);
    return this;
  }

  public filterBySeasons(season: string[] | string): QueryBuilderService {
    if (season.length === 0 || !season[0]) {
      return this;
    }

    const param = Array.isArray(season) ? season : [season];

    this.params.push([
      'filter.query',
      `variants.attributes.season:${param.map((val) => `"${val}"`).join(',')}`,
    ]);
    return this;
  }

  public filterByPrice(priceRange: string[] | string): QueryBuilderService {
    if (priceRange.length === 0) {
      return this;
    }

    const param = Array.isArray(priceRange) ? priceRange : [priceRange];

    this.params.push([
      'filter.query',
      `variants.price.centAmount:range (${Number(param[0]) * 100} to ${
        Number(param[1]) * 100
      })`,
    ]);
    return this;
  }

  public filterByPatterns(pattern: string[] | string): QueryBuilderService {
    if (pattern.length === 0 || !pattern[0]) {
      return this;
    }

    const param = Array.isArray(pattern) ? pattern : [pattern];

    this.params.push([
      'filter.query',
      `variants.attributes.pattern:${param.map((val) => `"${val}"`).join(',')}`,
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
