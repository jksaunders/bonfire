import { reconcileMediaQueries } from './experimental';

describe('#reconcileMediaQueries', () => {
  test('with no media queries', () => {
    expect(reconcileMediaQueries('')).toBe('');
    expect(reconcileMediaQueries('text-align: center;')).toBe(
      'text-align: center;'
    );
  });

  test('with one media query', () => {
    expect(
      reconcileMediaQueries(
        'text-align: left;\n@media asdasd { text-align: center; }'
      )
    ).toBe('text-align: left;\n@media asdasd {\ntext-align: center;\n}');

    expect(reconcileMediaQueries('@media asdasd { text-align: center; }')).toBe(
      '@media asdasd {\ntext-align: center;\n}'
    );

    expect(
      reconcileMediaQueries('@media asdasd {\n\ntext-align: center;\n\n}')
    ).toBe('@media asdasd {\ntext-align: center;\n}');
  });

  test('with matching media queries', () => {
    expect(
      reconcileMediaQueries(
        'text-align: left;\n@media asdasd { text-align: center; }\n@media asdasd{ justify-self: flex-end; }'
      )
    ).toBe(
      'text-align: left;\n@media asdasd {\ntext-align: center;\njustify-self: flex-end;\n}'
    );
  });

  test('with not matching media queries', () => {
    expect(
      reconcileMediaQueries(
        'text-align: left;\n@media asdasd { text-align: center; }\n@media asdasd{ justify-self: flex-end; }\n@media asdasd2{ justify-self: flex-start; }'
      )
    ).toBe(
      'text-align: left;\n@media asdasd {\ntext-align: center;\njustify-self: flex-end;\n}\n@media asdasd2 {\njustify-self: flex-start;\n}'
    );
  });
});
