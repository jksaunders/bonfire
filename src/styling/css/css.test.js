import { css, processCssRule, responsiveProps } from './css';

describe('#css', () => {
  test('returns a function', () => {
    expect(typeof css('height')).toBe('function');
  });

  describe('null values', () => {
    test('null props', () => {
      expect(css('height')(undefined)).toBe('');
    });

    test('null prop argument', () => {
      expect(css(null)({})).toBe('');
    });
  });

  describe('using one argument: eg. css("height")', () => {
    const value = '100px';
    [
      {
        property: 'height',
        propPassedAsArgument: 'height',
        result: `height: ${value};`,
      },
      {
        property: 'height',
        propPassedAsArgument: 'width',
        result: '',
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property ===
        testCase.propPassedAsArgument}`, () => {
        expect(
          css(testCase.property)({
            [testCase.propPassedAsArgument]: value,
          })
        ).toBe(testCase.result);
      });
    });
  });

  describe('using two arguments: eg. css("height", "min-height")', () => {
    const value = '100px';
    [
      {
        property: 'height',
        key: 'min-height',
        propPassedAsArgument: 'height',
        result: `min-height: ${value};`,
      },
      {
        property: 'height',
        key: 'min-height',
        propPassedAsArgument: 'width',
        result: '',
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property ===
        testCase.propPassedAsArgument}`, () => {
        expect(
          css(
            testCase.property,
            testCase.key
          )({
            [testCase.propPassedAsArgument]: value,
          })
        ).toBe(testCase.result);
      });
    });
  });

  describe('using three arguments: eg. css("height", "min-height", () => {})', () => {
    const value = 'center';
    [
      {
        property: 'centered',
        key: 'align-items',
        thirdArg: () => 'center',
        propPassedAsArgument: 'centered',
        result: `align-items: ${value};`,
      },
      {
        property: 'centered',
        key: 'align-items',
        thirdArg: 'center',
        propPassedAsArgument: 'centered',
        result: `align-items: ${value};`,
      },
      {
        property: 'centered',
        key: 'align-items',
        thirdArg: () => 'center',
        propPassedAsArgument: 'right',
        result: '',
      },
      {
        property: 'centered',
        key: 'align-items',
        thirdArg: 'center',
        propPassedAsArgument: 'right',
        result: '',
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property ===
        testCase.propPassedAsArgument}, third arg type = ${typeof testCase.thirdArg}`, () => {
        expect(
          css(
            testCase.property,
            testCase.key,
            testCase.thirdArg
          )({
            [testCase.propPassedAsArgument]: value,
          })
        ).toBe(testCase.result);
      });
    });
  });

  describe('using multiple rules: eg. css([[...], [...]])', () => {
    test('no rule matches', () => {
      expect(
        css(
          ['centered', 'align-items', 'center'],
          ['horizontalAlignment', 'align-items']
        )({})
      ).toBe('');
    });

    test('first rule matches', () => {
      expect(
        css(
          ['centered', 'align-items', 'center'],
          ['horizontalAlignment', 'align-items']
        )({
          centered: true,
        })
      ).toBe('align-items: center;');
    });

    test('second rule matches', () => {
      expect(
        css(
          ['centered', 'align-items', 'center'],
          ['horizontalAlignment', 'align-items']
        )({
          horizontalAlignment: 'flex-start',
        })
      ).toBe('align-items: flex-start;');
    });

    test('all rules match props present, but first rule value is falsey', () => {
      expect(
        css(
          ['centered', 'align-items', 'center'],
          ['horizontalAlignment', 'align-items']
        )({
          centered: false,
          horizontalAlignment: 'center',
        })
      ).toBe('align-items: center;');
    });

    test('incorrect usage: passing an array of rules', () => {
      expect(() =>
        css([
          ['centered', 'align-items', 'center'],
          ['horizontalAlignment', 'align-items'],
        ])({
          centered: false,
          horizontalAlignment: 'center',
        })
      ).toThrowError(
        new Error(
          '`css()` takes in positional arguments, not an array of arguments: eg. `css([], [], [])`, not `css([[], [], []])`'
        )
      );
    });
  });

  describe('using `responsiveProps`', () => {
    test('rule matches', () => {
      expect(
        css(
          ['centered', 'align-items', 'center'],
          ['horizontalAlignment', 'align-items']
        )({
          horizontalAlignment: responsiveProps({
            '_-50px': 'center',
            '50px-_': 'left',
          }),
        })
      ).toBe(
        '@media all and (max-width: 50px) { align-items: center; }\n@media all and (min-width: 50px) { align-items: left; }'
      );
    });
  });
});

describe('#processCssRule', () => {
  describe('no media queries', () => {
    test('one argument', () => {
      expect(
        processCssRule('gap')({
          gap: 'left',
        })
      ).toBe('gap: left;');
    });

    test('two arguments: string', () => {
      expect(
        processCssRule(
          'gap',
          'grid-gap'
        )({
          gap: 'left',
        })
      ).toBe('grid-gap: left;');
    });

    test('two arguments: function', () => {
      expect(
        processCssRule(
          'gap',
          props => `grid-gap-${props.gap}`
        )({
          gap: 'left',
        })
      ).toBe('grid-gap-left: left;');
    });
  });

  describe('with media queries', () => {
    test('one argument', () => {
      expect(
        processCssRule('gap')({
          gap: responsiveProps({ '_-50px': 'center', '50px-_': 'left' }),
          margin: responsiveProps({ '_-50px': 'up', '50px-_': 'down' }),
        })
      ).toBe(
        '@media all and (max-width: 50px) { gap: center; }\n@media all and (min-width: 50px) { gap: left; }'
      );
    });

    test('two arguments', () => {
      expect(
        processCssRule(
          'gap',
          'grid-gap'
        )({
          gap: responsiveProps({ '_-50px': 'center', '50px-_': 'left' }),
          margin: responsiveProps({ '_-50px': 'up', '50px-_': 'down' }),
        })
      ).toBe(
        '@media all and (max-width: 50px) { grid-gap: center; }\n@media all and (min-width: 50px) { grid-gap: left; }'
      );
    });

    test('three arguments', () => {
      expect(
        processCssRule(
          'gap',
          'grid-gap',
          props => `${props.gap}-${props.margin}`
        )({
          gap: responsiveProps({ '_-50px': 'center', '50px-_': 'left' }),
          margin: responsiveProps({ '_-50px': 'up', '50px-_': 'down' }),
        })
      ).toBe(
        '@media all and (max-width: 50px) { grid-gap: center-up; }\n@media all and (min-width: 50px) { grid-gap: left-down; }'
      );
    });
  });
});
