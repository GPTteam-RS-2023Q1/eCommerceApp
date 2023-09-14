import { GetPageCountPipe } from './get-page-count.pipe';

describe('GetPageCountPipe', () => {
  it('create an instance', () => {
    const pipe = new GetPageCountPipe();
    expect(pipe).toBeTruthy();
  });
});
