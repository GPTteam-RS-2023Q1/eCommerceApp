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

  public withCategory(category: string): QueryBuilderService {
    this.params.push(['filter.query', `categories.id:subtree("${category}")`]);

    return this;
  }

  public withColor(color: string[]): QueryBuilderService {
    if (color.length === 0 || !color[0]) {
      return this;
    }

    this.params.push([
      'filter.query',
      `variants.attributes.color:${color.map((val) => `"${val}"`).join(',')}`,
    ]);
    return this;
  }

  public withSeason(season: string[]): QueryBuilderService {
    if (season.length === 0 || !season[0]) {
      return this;
    }

    this.params.push([
      'filter.query',
      `variants.attributes.season:${season.map((val) => `"${val}"`).join(',')}`,
    ]);
    return this;
  }

  public withPrice(priceRange: number[]): QueryBuilderService {
    if (priceRange.length === 0 || priceRange[0] === undefined) {
      return this;
    }

    this.params.push([
      'filter.query',
      `variants.price.centAmount:range (${priceRange[0] * 100} to ${
        priceRange[1] * 100
      })`,
    ]);
    return this;
  }

  public withPattern(pattern: string[]): QueryBuilderService {
    if (pattern.length === 0 || !pattern[0]) {
      return this;
    }

    this.params.push([
      'filter.query',
      `variants.attributes.pattern:${pattern.map((val) => `"${val}"`).join(',')}`,
    ]);
    return this;
  }

  public getParams(): BuildedParams {
    const { params } = this;
    this.params = [];
    return params;
  }
}
