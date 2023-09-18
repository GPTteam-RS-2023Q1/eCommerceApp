import { TestBed } from '@angular/core/testing';

import { QueryBuilderService } from './query-builder.service';

describe('QueryBuilderService', () => {
  let service: QueryBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFuzzyLevel() should get fuzzy number', () => {
    spyOn(service, 'getFuzzyLevel').and.callThrough();

    const a = service.getFuzzyLevel('t');
    const b = service.getFuzzyLevel('test');
    const c = service.getFuzzyLevel('test123');

    expect(a).toEqual(0);
    expect(b).toEqual(1);
    expect(c).toEqual(2);

    expect(service.getFuzzyLevel).toHaveBeenCalled();
  });

  it('filterByPatterns should work', () => {
    spyOn(service, 'filterByPatterns').and.callThrough();
    service.filterByPatterns([]);
    const a = service.getBuildedParams();

    service.filterByPatterns('test');
    const b = service.getBuildedParams();

    service.filterByPatterns(['test', 'test1']);
    const c = service.getBuildedParams();

    expect(a).toEqual([]);
    expect(b).toEqual([['filter.query', 'variants.attributes.pattern:"test"']]);
    expect(c).toEqual([['filter.query', 'variants.attributes.pattern:"test","test1"']]);

    expect(service.filterByPatterns).toHaveBeenCalled();
  });
});

describe('QueryBuilderService', () => {
  let service: QueryBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryBuilderService);
  });

  it('filterByPatterns should work', () => {
    spyOn(service, 'filterByPatterns').and.callThrough();
    service.filterByPatterns([]);
    const a = service.getBuildedParams();

    service.filterByPatterns('test');
    const b = service.getBuildedParams();

    service.filterByPatterns(['test', 'test1']);
    const c = service.getBuildedParams();

    expect(a).toEqual([]);
    expect(b).toEqual([['filter.query', 'variants.attributes.pattern:"test"']]);
    expect(c).toEqual([['filter.query', 'variants.attributes.pattern:"test","test1"']]);

    expect(service.filterByPatterns).toHaveBeenCalled();
  });
});

describe('QueryBuilderService', () => {
  let service: QueryBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryBuilderService);
  });

  it('filterByColor should work', () => {
    spyOn(service, 'filterByColor').and.callThrough();
    service.filterByColor([]);
    const a = service.getBuildedParams();

    service.filterByColor('test');
    const b = service.getBuildedParams();

    service.filterByColor(['test', 'test1']);
    const c = service.getBuildedParams();

    expect(a).toEqual([]);
    expect(b).toEqual([['filter.query', 'variants.attributes.color:"test"']]);
    expect(c).toEqual([['filter.query', 'variants.attributes.color:"test","test1"']]);

    expect(service.filterByColor).toHaveBeenCalled();
  });

  it('filterBySeasons should work', () => {
    spyOn(service, 'filterBySeasons').and.callThrough();
    service.filterBySeasons([]);
    const a = service.getBuildedParams();

    service.filterBySeasons('test');
    const b = service.getBuildedParams();

    service.filterBySeasons(['test', 'test1']);
    const c = service.getBuildedParams();

    expect(a).toEqual([]);
    expect(b).toEqual([['filter.query', 'variants.attributes.season:"test"']]);
    expect(c).toEqual([['filter.query', 'variants.attributes.season:"test","test1"']]);

    expect(service.filterBySeasons).toHaveBeenCalled();
  });
});
