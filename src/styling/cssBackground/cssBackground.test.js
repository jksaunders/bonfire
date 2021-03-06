import cssBackground from './cssBackground';

describe('using input not recognized by chroma', () => {
  test('returns css string: background-color', () => {
    expect(cssBackground({ background: 'null' })).toBe('');
  });
});

describe('using a color hex code', () => {
  test('returns string', () => {
    expect(typeof cssBackground({ background: '#123456' })).toBe('string');
  });

  test('returns css string: background-color', () => {
    expect(cssBackground({ background: '#123456' })).toBe(
      'background-color: #123456;'
    );
  });
});

describe('using rgb() color', () => {
  test('returns string', () => {
    expect(typeof cssBackground({ background: 'rgb(0,0,0,0.9)' })).toBe(
      'string'
    );
  });

  test('returns css string: background-color', () => {
    expect(cssBackground({ background: 'rgb(0,0,0,0.9)' })).toBe(
      'background-color: rgb(0,0,0,0.9);'
    );
  });
});
