import { css, cssBackground } from "./styling";

describe("#cssBackground", () => {
  describe("using unrecognized input", () => {
    test("returns css string", () => {
      expect(cssBackground({ background: "null" })).toBe("");
    });
  });

  describe("using a color hex code", () => {
    test("returns a string", () => {
      expect(typeof cssBackground({ background: "#123456" })).toBe("string");
    });

    test("returns css string", () => {
      expect(cssBackground({ background: "#123456" })).toBe("background-color: #123456;");
    });
  });
});

describe("#css", () => {
  test("returns a function", () => {
    expect(typeof css("height")).toBe("function");
  });

  describe("null values", () => {
    test("null props", () => {
      expect(css("height")(undefined)).toBe(null);
    });

    test("null prop argument", () => {
      expect(css(null)({})).toBe(null);
    });
  });

  describe("using one argument: eg. css(\"height\")", () => {
    const value = "100px";
    [
      {
        property: "height",
        propPassedAsArgument: "height",
        result: `height: ${value};`
      },
      {
        property: "height",
        propPassedAsArgument: "width",
        result: null
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property === testCase.propPassedAsArgument}`, () => {
        expect(css(testCase.property)({
          [testCase.propPassedAsArgument]: value
        })).toBe(testCase.result);
      });
    });
  });

  describe("using two arguments: eg. css(\"height\", \"min-height\")", () => {
    const value = "100px";
    [
      {
        property: "height",
        key: "min-height",
        propPassedAsArgument: "height",
        result: `min-height: ${value};`
      },
      {
        property: "height",
        key: "min-height",
        propPassedAsArgument: "width",
        result: null
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property === testCase.propPassedAsArgument}`, () => {
        expect(css(testCase.property, testCase.key)({
          [testCase.propPassedAsArgument]: value
        })).toBe(testCase.result);
      });
    });
  });

  describe("using three arguments: eg. css(\"height\", \"min-height\", () => {})", () => {
    const value = "center";
    [
      {
        property: "centered",
        key: "align-items",
        thirdArg: () => "center",
        propPassedAsArgument: "centered",
        result: `align-items: ${value};`
      },
      {
        property: "centered",
        key: "align-items",
        thirdArg: "center",
        propPassedAsArgument: "centered",
        result: `align-items: ${value};`
      },
      {
        property: "centered",
        key: "align-items",
        thirdArg: () => "center",
        propPassedAsArgument: "right",
        result: null
      },
      {
        property: "centered",
        key: "align-items",
        thirdArg: "center",
        propPassedAsArgument: "right",
        result: null
      },
    ].forEach(testCase => {
      test(`property is present = ${testCase.property === testCase.propPassedAsArgument}, third arg type = ${typeof testCase.thirdArg}`, () => {
        expect(css(testCase.property, testCase.key, testCase.thirdArg)({
          [testCase.propPassedAsArgument]: value
        })).toBe(testCase.result);
      });
    });
  });

  describe("using multiple rules: eg. css([[...], [...]])", () => {
    test("no rule matches", () => {
      expect(css(
        ["centered", "align-items", "center"],
        ["horizontalAlignment", "align-items"]
      )({})).toBe(null);
    });

    test("first rule matches", () => {
      expect(css(
        ["centered", "align-items", "center"],
        ["horizontalAlignment", "align-items"]
      )({
        centered: true
      })).toBe("align-items: center;");
    });

    test("second rule matches", () => {
      expect(css(
        ["centered", "align-items", "center"],
        ["horizontalAlignment", "align-items"]
      )({
        horizontalAlignment: "flex-start"
      })).toBe("align-items: flex-start;");
    });

    test("all rules match props present, but first rule value is falsey", () => {
      expect(css(
        ["centered", "align-items", "center"],
        ["horizontalAlignment", "align-items"]
      )({
        centered: false,
        horizontalAlignment: "center"
      })).toBe("align-items: center;");
    });

    test("incorrect usage: passing an array of rules", () => {
      expect(() => css([
        ["centered", "align-items", "center"],
        ["horizontalAlignment", "align-items"]
      ])({
        centered: false,
        horizontalAlignment: "center"
      })).toThrowError(new Error("`css()` takes in positional arguments, not an array of arguments: eg. `css([], [], [])`, not `css([[], [], []])`"));
    });
  });
});