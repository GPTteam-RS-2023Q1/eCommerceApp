import { ArrayToPrettyStringPipe } from './array-to-pretty-string.pipe';

describe('ArrayToPrettyStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayToPrettyStringPipe();
    expect(pipe).toBeTruthy();
  });
});
