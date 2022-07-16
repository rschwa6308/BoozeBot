import { extendTheme } from 'native-base';

export const theme = extendTheme({
  fontConfig: {
    Baskerville: {
      100: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
      200: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
      300: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
      400: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
      500: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
      600: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
      700: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
      800: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
      900: {
        normal: "Baskerville-Regular",
        italic: "Baskerville-Italic",
        bold: "Baskerville-Bold"
      },
    }
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Baskerville',
    body: 'Baskerville',
    mono: 'Baskerville',
  },
});
