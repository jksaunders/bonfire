import cssBackground from './cssBackground';

describe('using unrecognized input', () => {
  test('returns css string', () => {
    expect(cssBackground({ background: 'null' })).toBe('');
  });
});

describe('using a color hex code', () => {
  test('returns a string', () => {
    expect(typeof cssBackground({ background: '#123456' })).toBe('string');
  });

  test('returns css string', () => {
    expect(cssBackground({ background: '#123456' })).toBe(
      'background-color: #123456;'
    );
  });
});
