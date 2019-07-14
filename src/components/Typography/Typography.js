import MaterialTypography from "@material-ui/core/Typography";

const CONSTANTS = {
  VARIANT: {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
    SUBTITLE1: "subtitle1",
    SUBTITLE2: "subtitle2",
    BODY1: "body1",
    BODY2: "body2",
    CAPTION: "caption",
    BUTTON: "button",
    OVERLINE: "overline",
    SRONLY: "sronly",
    INHERIT: "inherit"
  }
};

const Typography = MaterialTypography;
Typography.CONSTANTS = CONSTANTS;

export default Typography;