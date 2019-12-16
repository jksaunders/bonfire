import {
  css,
  cssBackground,
  processCssRule,
  processResponsiveCss,
  reconcileMediaQueries,
  responsiveCss,
  Sizes
} from './styling';

describe('#cssBackground', () => {
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
      expect(cssBackground({ background: '#123456' })).toBe('background-color: #123456;');
    });
  });
});

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
        result: `height: ${value};`
      },
      {
        property: 'height',
        propPassedAsArgument: 'width',
        result: ''
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property === testCase.propPassedAsArgument}`, () => {
        expect(css(testCase.property)({
          [testCase.propPassedAsArgument]: value
        })).toBe(testCase.result);
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
        result: `min-height: ${value};`
      },
      {
        property: 'height',
        key: 'min-height',
        propPassedAsArgument: 'width',
        result: ''
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property === testCase.propPassedAsArgument}`, () => {
        expect(css(testCase.property, testCase.key)({
          [testCase.propPassedAsArgument]: value
        })).toBe(testCase.result);
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
        result: `align-items: ${value};`
      },
      {
        property: 'centered',
        key: 'align-items',
        thirdArg: 'center',
        propPassedAsArgument: 'centered',
        result: `align-items: ${value};`
      },
      {
        property: 'centered',
        key: 'align-items',
        thirdArg: () => 'center',
        propPassedAsArgument: 'right',
        result: ''
      },
      {
        property: 'centered',
        key: 'align-items',
        thirdArg: 'center',
        propPassedAsArgument: 'right',
        result: ''
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property === testCase.propPassedAsArgument}, third arg type = ${typeof testCase.thirdArg}`, () => {
        expect(css(testCase.property, testCase.key, testCase.thirdArg)({
          [testCase.propPassedAsArgument]: value
        })).toBe(testCase.result);
      });
    });
  });

  describe('using multiple rules: eg. css([[...], [...]])', () => {
    test('no rule matches', () => {
      expect(css(
        ['centered', 'align-items', 'center'],
        ['horizontalAlignment', 'align-items']
      )({})).toBe('');
    });

    test('first rule matches', () => {
      expect(css(
        ['centered', 'align-items', 'center'],
        ['horizontalAlignment', 'align-items']
      )({
        centered: true
      })).toBe('align-items: center;');
    });

    test('second rule matches', () => {
      expect(css(
        ['centered', 'align-items', 'center'],
        ['horizontalAlignment', 'align-items']
      )({
        horizontalAlignment: 'flex-start'
      })).toBe('align-items: flex-start;');
    });

    test('all rules match props present, but first rule value is falsey', () => {
      expect(css(
        ['centered', 'align-items', 'center'],
        ['horizontalAlignment', 'align-items']
      )({
        centered: false,
        horizontalAlignment: 'center'
      })).toBe('align-items: center;');
    });

    test('incorrect usage: passing an array of rules', () => {
      expect(() => css([
        ['centered', 'align-items', 'center'],
        ['horizontalAlignment', 'align-items']
      ])({
        centered: false,
        horizontalAlignment: 'center'
      })).toThrowError(new Error('`css()` takes in positional arguments, not an array of arguments: eg. `css([], [], [])`, not `css([[], [], []])`'));
    });
  });

  describe('using `responsiveCss`', () => {
    test('rule matches', () => {
      expect(css(
        ['centered', 'align-items', 'center'],
        ['horizontalAlignment', 'align-items']
      )({
        horizontalAlignment: responsiveCss({ '_-50px': 'center', '50px-_': 'left' })
      })).toBe('@media all and (max-width: 50px) { align-items: center; }\n@media all and (min-width: 50px) { align-items: left; }');
    });
  });
});

describe('#processResponsiveCss', () => {
  describe('null values', () => {
    test('returns null', () => {
      expect(processResponsiveCss(undefined)).toBe('');
      expect(processResponsiveCss(null)).toBe('');
      expect(processResponsiveCss(null, null)).toBe('');
    });
  });

  describe('value is a string', () => {
    test('no transform', () => {
      expect(processResponsiveCss('3px')).toBe('3px');
    });

    test('with transform', () => {
      expect(processResponsiveCss('3px', (value) => `grid-gap: ${value};`)).toBe('grid-gap: 3px;');
    });
  });

  describe('value is a `Sizes` object', () => {
    test('no transform', () => {
      expect(processResponsiveCss(new Sizes({
        '_-45px': 'grid-gap: 3px;',
        '45px-55px': 'grid-gap: 4px;',
        '55px-_': 'grid-gap: 5px;',
      }))).toBe(`@media all and (max-width: 45px) { grid-gap: 3px; }
@media all and (min-width: 45px) and (max-width: 55px) { grid-gap: 4px; }
@media all and (min-width: 55px) { grid-gap: 5px; }`);
    });

    test('with transform', () => {
      expect(processResponsiveCss(new Sizes({
        '_-45px': '3px',
        '45px-55px': '4px',
        '55px-_': '5px',
      }), (value) => `grid-gap: ${value};`)).toBe(`@media all and (max-width: 45px) { grid-gap: 3px; }
@media all and (min-width: 45px) and (max-width: 55px) { grid-gap: 4px; }
@media all and (min-width: 55px) { grid-gap: 5px; }`);
    });
  });
});

describe('#reconcileMediaQueries', () => {
  test('with no media queries', () => {
    expect(reconcileMediaQueries('')).toBe('');
    expect(reconcileMediaQueries('text-align: center;')).toBe('text-align: center;');
  });

  test('with one media query', () => {
    expect(reconcileMediaQueries('text-align: left;\n@media asdasd { text-align: center; }'))
      .toBe('text-align: left;\n@media asdasd {\ntext-align: center;\n}');

    expect(reconcileMediaQueries('@media asdasd { text-align: center; }'))
      .toBe('@media asdasd {\ntext-align: center;\n}');

    expect(reconcileMediaQueries('@media asdasd {\n\ntext-align: center;\n\n}'))
      .toBe('@media asdasd {\ntext-align: center;\n}');
  });

  test('with matching media queries', () => {
    expect(reconcileMediaQueries('text-align: left;\n@media asdasd { text-align: center; }\n@media asdasd{ justify-self: flex-end; }'))
      .toBe('text-align: left;\n@media asdasd {\ntext-align: center;\njustify-self: flex-end;\n}');
  });

  test('with not matching media queries', () => {
    expect(reconcileMediaQueries('text-align: left;\n@media asdasd { text-align: center; }\n@media asdasd{ justify-self: flex-end; }\n@media asdasd2{ justify-self: flex-start; }'))
      .toBe('text-align: left;\n@media asdasd {\ntext-align: center;\njustify-self: flex-end;\n}\n@media asdasd2 {\njustify-self: flex-start;\n}');
  });
});

describe('#processCssRule', () => {
  describe('no media queries', () => {
    test('one argument', () => {
      expect(processCssRule('gap')({
        gap: 'left'
      })).toBe('gap: left;');
    });

    test('two arguments: string', () => {
      expect(processCssRule('gap', 'grid-gap')({
        gap: 'left'
      })).toBe('grid-gap: left;');
    });

    test('two arguments: function', () => {
      expect(processCssRule('gap', props => `grid-gap-${props.gap}`)({
        gap: 'left'
      })).toBe('grid-gap-left: left;');
    });
  });

  describe('with media queries', () => {
    test('one argument', () => {
      expect(processCssRule('gap')({
        gap: responsiveCss({ '_-50px': 'center', '50px-_': 'left' }),
        margin: responsiveCss({ '_-50px': 'up', '50px-_': 'down' })
      })).toBe('@media all and (max-width: 50px) { gap: center; }\n@media all and (min-width: 50px) { gap: left; }');
    });

    test('two arguments', () => {
      expect(processCssRule('gap', 'grid-gap')({
        gap: responsiveCss({ '_-50px': 'center', '50px-_': 'left' }),
        margin: responsiveCss({ '_-50px': 'up', '50px-_': 'down' })
      })).toBe('@media all and (max-width: 50px) { grid-gap: center; }\n@media all and (min-width: 50px) { grid-gap: left; }');
    });

    test('three arguments', () => {
      expect(processCssRule('gap', 'grid-gap', props => `${props.gap}-${props.margin}`)({
        gap: responsiveCss({ '_-50px': 'center', '50px-_': 'left' }),
        margin: responsiveCss({ '_-50px': 'up', '50px-_': 'down' })
      })).toBe('@media all and (max-width: 50px) { grid-gap: center-up; }\n@media all and (min-width: 50px) { grid-gap: left-down; }');
    });
  });
});