import cssBackground from './cssBackground';

describe('using unrecognized input', () => {
  test('returns css string: background-color', () => {
    expect(cssBackground({ background: 'null' })).toBe(
      'background-color: null;'
    );
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
