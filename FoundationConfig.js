// FoundationConfig.js

import { Colors, Typography, Spacings } from "react-native-ui-lib";

Colors.loadColors({
  primaryColor: "#193766",
  secondaryColor: "#0054fe",
  textColor: "#697B98",
  errorColor: "#E63B2E",
  successColor: "#32c658",
  warnColor: "##FF963C",
});

Typography.loadTypographies({
  heading: { fontSize: 36, fontWeight: "600" },
  subheading: { fontSize: 28, fontWeight: "500" },
  body: { fontSize: 18, fontWeight: "400" },
  popM: { fontFamily: "PopM" },
  popR: { fontFamily: "PopR" },
  popB: { fontFamily: "PopB" },
  popSB: { fontFamily: "PopSB" },

  h1: { fontSize: 32, fontWeight: "600" },
  h2: { fontSize: 24, fontWeight: "600" },
  h3: { fontSize: 20, fontWeight: "600" },
  h4: { fontSize: 16, fontWeight: "600" },
  h5: { fontSize: 12, fontWeight: "600" },
  h6: { fontSize: 10, fontWeight: "600" },
});

Spacings.loadSpacings({
  page: 20,
  card: 12,
  gridGutter: 16,
});

import { ThemeManager } from "react-native-ui-lib";

// with plain object
ThemeManager.setComponentTheme("Card", {
  borderRadius: 8,
});

// with a dynamic function
ThemeManager.setComponentTheme("Button", (props, context) => {
  // 'square' is not an original Button prop, but a custom prop that can
  // be used to create different variations of buttons in your app
  if (props.square) {
    return {
      borderRadius: 0,
    };
  }
});

// set default font family for all text components
ThemeManager.setComponentTheme("Text", (props, context) => {
  return {
    fontFamily: "PopR",
    ...props,
  };
});
