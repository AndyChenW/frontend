import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { rem, lighten, rgba } from 'polished'
import { DarkTheme, LightTheme } from './colors'

const useDefaultTheme = () => {
  const breakpoints: string[] = React.useMemo(
    () => ['0px', '600px', '1200px', '1900px'],
    [],
  )
  const darkMode = React.useMemo(() => false, [])
  const fonts = {
    body: "'Montserrat', sans-serif",
    header: "'Montserrat', sans-serif",
  }
  const fontWeight = {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  }

  const fontSizes = {
    xs: rem('8px'),
    sm: rem('12px'),
    md: rem('14px'),
    lg: rem('16px'),
    xl: rem('20px'),
    xxl: rem('24px'),
    xxxl: rem('30px'),
  }
  const borderRadius = {
    0: 0,
  }
  const buttonStyles = {
    // cursor: 'default',
    borderRadius: borderRadius[0],
    fontWeight: fontWeight.bold,
    transition: 'all ease-in-out 0.2s',
    '&:active': {
      transform: 'scale(0.95)',
    },
  }
  const tableRow = React.useMemo(
    () => ({
      fontSize: fontSizes.lg,
      fontWeight: fontWeight.regular,
      padding: `10px`,
      width: '100%',
    }),
    [fontSizes.lg, fontWeight.regular],
  )

  const wizardHeaderCommon = React.useMemo(
    () => ({
      flex: 1,
      py: 10,
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      alignItems: 'center',
      flexDirection: ['column', 'column', 'row'],
      textAlign: ['center', 'center', 'left'],
    }),
    [],
  )

  const wizardNumberCommon = React.useMemo(
    () => ({
      width: 18,
      height: 18,
      borderRadius: 18,
      p: '5px',
      mr: [0, 0, '8px'],
      mb: ['8px', '8px', 0],
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: fontSizes.sm,
    }),
    [fontSizes.sm],
  )

  const space = React.useMemo(
    () => ({
      xxs: rem('2px'),
      xs: rem('5px'),
      sm: rem('8px'),
      md: rem('12px'),
      lg: rem('16px'),
      xl: rem('20px'),
      xxl: rem('28px'),
      xxxl: rem('36px'),
      xxxxl: rem('44px'),
      xxxxxl: rem('70px'),
    }),
    [],
  )

  return {
    breakpoints,
    darkMode,
    colors: darkMode ? DarkTheme : LightTheme,
    fonts,
    fontWeight,
    fontSizes,
    borderRadius,
    spacer: space,
    variants: {
      body: {
        width: '100%',
        height: 'calc(100vh - 60px)',
      },
      'nav-item': {
        color: darkMode ? DarkTheme.grey[200] : LightTheme.grey[200],
        textDecoration: 'none',
        fontSize: [fontSizes.md, fontSizes.md, fontSizes.md, null],
        fontWeight: fontWeight.semiBold,
        textTransform: 'uppercase',
        px: [10, 10, 20, null],
        cursor: 'pointer',
        '&:hover': {
          color: darkMode ? DarkTheme.white : LightTheme.blue[200],
        },
        '&:first-child': {
          pl: 0,
        },
        '&:last-child': {
          pr: 0,
        },
        '&.active': {
          color: darkMode ? DarkTheme.white : LightTheme.blue[200],
        },
      },
      'nav-item-mobile': {
        color: darkMode ? DarkTheme.grey[200] : LightTheme.grey[200],
        textDecoration: 'none',
        fontSize: fontSizes.xl,
        fontWeight: fontWeight.semiBold,
        textTransform: 'uppercase',
        pt: 10,
        cursor: 'pointer',
        '&:hover': {
          color: darkMode ? DarkTheme.white : LightTheme.blue[200],
        },
        '&:first-child': {
          pl: 0,
        },
        '&:last-child': {
          pr: 0,
        },
        '&.active': {
          color: darkMode ? DarkTheme.white : LightTheme.blue[200],
        },
      },
      'sidebar-nav': {
        width: [180, 180, 180, 200],
        flexDirection: 'column',
      },
      'sidebar-nav-mobile': {
        width: '100%',
        flexDirection: 'row',
        position: 'fixed',
        bottom: 0,
        left: 0,
      },
      'sidebar-nav-item': {
        cursor: 'pointer',
        width: [180, 180, 180, 200],
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: fontSizes['lg'],
        color: darkMode ? DarkTheme.white : LightTheme.white,
        bg: darkMode ? DarkTheme.blue[100] : LightTheme.blue[100],
        '.menucaption': {
          color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.4)',
          fontSize: fontSizes['md'],
        },
        '.caption': {
          color: darkMode ? DarkTheme.grey[300] : LightTheme.grey[300],
          fontSize: fontSizes['md'],
        },
        '&:hover .caption': {
          color: darkMode ? DarkTheme.white : LightTheme.white,
        },
        '&.dark': {
          bg: darkMode ? DarkTheme.blue[300] : LightTheme.blue[300],
        },
        '&.darker': {
          bg: darkMode ? DarkTheme.blue[400] : LightTheme.blue[400],
        },
        '&:hover': {
          bg: darkMode ? DarkTheme.red[100] : LightTheme.red[100],
          color: darkMode ? DarkTheme.white : LightTheme.white,
        },
        '&.active': {
          bg: darkMode ? DarkTheme.red[100] : LightTheme.red[100],
          color: darkMode ? DarkTheme.white : LightTheme.white,
          '.caption': {
            color: darkMode ? DarkTheme.white : LightTheme.white,
          },
        },
      },
      'sidebar-nav-item-mobile': {
        cursor: 'pointer',
        flex: 1,
        height: 60,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: fontSizes['sm'],
        color: darkMode ? DarkTheme.white : LightTheme.white,
        bg: darkMode ? DarkTheme.blue[100] : LightTheme.blue[100],
        '.menucaption': {
          color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.4)',
          fontSize: fontSizes['md'],
        },
        '.caption': {
          color: darkMode ? DarkTheme.grey[300] : LightTheme.grey[300],
          fontSize: fontSizes['md'],
        },
        '&:hover .caption': {
          color: darkMode ? DarkTheme.white : LightTheme.white,
        },
        '&.dark': {
          bg: darkMode ? DarkTheme.blue[300] : LightTheme.blue[300],
        },
        '&.darker': {
          bg: darkMode ? DarkTheme.blue[400] : LightTheme.blue[400],
        },
        '&:hover': {
          bg: darkMode ? DarkTheme.red[100] : LightTheme.red[100],
          color: darkMode ? DarkTheme.white : LightTheme.white,
        },
        '&.active': {
          bg: darkMode ? DarkTheme.red[100] : LightTheme.red[100],
          color: darkMode ? DarkTheme.white : LightTheme.white,
          '.caption': {
            color: darkMode ? DarkTheme.white : LightTheme.white,
          },
        },
      },
      table: {
        flexDirection: 'column',
        width: '100%',
        bg: darkMode ? DarkTheme.grey[100] : LightTheme.white,
        borderBottomLeftRadius: [4],
        borderBottomRightRadius: [4],
      },
      'table-header': {
        flexDirection: 'row',
        fontWeight: fontWeight.regular,
        width: '100%',
        bg: darkMode ? DarkTheme.grey[100] : LightTheme.grey[100],
        color: darkMode ? DarkTheme.black : LightTheme.black,
        fontSize: fontSizes.md,
        p: 10,
        py: 16,
        justifyContent: 'space-between',
      },
      'table-sub.text': {
        ...tableRow,
        color: darkMode ? DarkTheme.grey[100] : LightTheme.grey[100],
        fontSize: fontSizes.xs,
      },
      'table-row': {
        ...tableRow,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: darkMode
          ? DarkTheme.grey[100]
          : LightTheme.grey[100],
      },
      'layout-content': {
        flex: 1,
        height: ['calc(100vh - 140px)', 'calc(100vh - 140px)', 600],
        overflowY: 'auto',
        bg: darkMode ? DarkTheme.white : LightTheme.white,
        p: [20, 20, 40],
      },
      'outlined-box': {
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: darkMode ? DarkTheme.grey[100] : LightTheme.grey[100],
        justifyContent: 'center',
        alignItems: 'center',
        py: 20,
      },
      'small-outlined-box': {
        borderRadius: '2',
        border: '1px solid black',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
      },
      'drop-down': {
        position: 'absolute',
        color: darkMode ? DarkTheme.grey[100] : LightTheme.grey[100],
        fontSize: fontSizes.md,
        zIndex: 50,
        display: 'none',
        '&.hover': {
          display: 'block',
        },
      },
      modal: {
        bg: darkMode ? DarkTheme.black : LightTheme.white,
        fontSize: fontSizes.md,
      },
      'modal-header': {
        bg: darkMode ? DarkTheme.red[100] : LightTheme.red[100],
        color: darkMode ? DarkTheme.white : LightTheme.white,
        p: 24,
        textTransform: 'uppercase',
      },
      'modal-body': {
        p: 24,
      },
      'list-title': {
        fontWeight: fontWeight.semiBold,
        bg: darkMode ? DarkTheme.blue[100] : LightTheme.blue[100],
        color: darkMode ? DarkTheme.white : LightTheme.white,
        px: 20,
        py: 13,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      'list-item': {
        px: 20,
        py: 13,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: darkMode
          ? DarkTheme.grey[400]
          : LightTheme.grey[400],
        '.name, .balanceFiat': {
          color: LightTheme.grey[200],
        },
      },
      'list-item-disabled': {
        px: 20,
        py: 13,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: darkMode
          ? DarkTheme.grey[400]
          : LightTheme.grey[400],
        bg: darkMode ? DarkTheme.grey[500] : LightTheme.grey[500],
        '.symbol, .balance': {
          color: LightTheme.grey[300],
          fontWeight: fontWeight.semiBold,
        },
        '.name, .balanceFiat': {
          color: LightTheme.grey[200],
        },
        '.list-icon': {
          filter: 'grayscale(100%)',
        },
      },
      'list-details': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 10,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: darkMode
          ? DarkTheme.grey[100]
          : LightTheme.grey[100],
      },
      'wizard-header-inactive': {
        ...wizardHeaderCommon,
        color: darkMode ? DarkTheme.grey[200] : LightTheme.grey[200],
        borderBottomColor: darkMode
          ? DarkTheme.grey[200]
          : LightTheme.grey[200],
      },
      'wizard-header-active': {
        ...wizardHeaderCommon,
        color: darkMode ? DarkTheme.black : LightTheme.black,
        borderBottomColor: darkMode ? DarkTheme.red[100] : LightTheme.red[100],
      },
      'wizard-header-done': {
        ...wizardHeaderCommon,
        color: darkMode ? DarkTheme.black : LightTheme.black,
        borderBottomColor: darkMode ? DarkTheme.green : LightTheme.green,
      },
      'wizard-number-inactive': {
        ...wizardNumberCommon,
        bg: darkMode ? DarkTheme.grey[200] : LightTheme.grey[200],
        color: darkMode ? DarkTheme.white : LightTheme.white,
      },
      'wizard-number-active': {
        ...wizardNumberCommon,
        bg: darkMode ? DarkTheme.red[100] : LightTheme.red[100],
        color: darkMode ? DarkTheme.white : LightTheme.white,
      },
      'wizard-number-done': {
        ...wizardNumberCommon,
        bg: darkMode ? DarkTheme.green : LightTheme.green,
        color: darkMode ? DarkTheme.white : LightTheme.white,
      },
      dots: {
        flex: 1,
        mx: '8px',
        overflow: 'hidden',
        '&::after': {
          content:
            "'................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................'",
        },
      },
      overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        bg: rgba(255, 255, 255, 0.9),
        justifyContent: 'center',
        alignItems: 'center',
      },
      drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '260px',
        height: '100%',
        padding: space.xl,
        color: darkMode ? DarkTheme.grey[100] : LightTheme.white,
        bg: darkMode ? DarkTheme.grey[100] : LightTheme.grey[100],
        transition: 'transform 0.3s ease-in-out',
        zIndex: 998,
      },
    },
    buttons: {
      primary: {
        ...buttonStyles,
        fontSize: fontSizes.md,
        bg: darkMode ? DarkTheme.red[100] : LightTheme.red[100],
        color: darkMode ? DarkTheme.white : LightTheme.white,
        '&:hover': {
          bg: darkMode
            ? lighten(0.1, DarkTheme.red[100])
            : lighten(0.1, LightTheme.red[100]),
        },
        '&:disabled': {
          bg: darkMode ? DarkTheme.grey[100] : LightTheme.grey[100],
          color: darkMode ? DarkTheme.white : LightTheme.white,
        },
      },
      secondary: {
        ...buttonStyles,
        fontSize: fontSizes.md,
        bg: darkMode ? DarkTheme.blue[100] : LightTheme.blue[100],
        color: darkMode ? DarkTheme.white : LightTheme.white,
        '&:hover': {
          bg: darkMode
            ? lighten(0.1, DarkTheme.blue[100])
            : lighten(0.1, LightTheme.blue[100]),
        },
        '&:disabled': {
          bg: darkMode ? DarkTheme.grey[200] : LightTheme.grey[200],
          color: darkMode ? DarkTheme.white : LightTheme.white,
        },
      },
      'grey-outline': {
        ...buttonStyles,
        fontSize: fontSizes.md,
        bg: darkMode ? DarkTheme.white : LightTheme.white,
        color: darkMode ? DarkTheme.grey[200] : LightTheme.grey[200],
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: darkMode ? DarkTheme.grey[200] : LightTheme.grey[200],
        '&:hover': {
          borderColor: darkMode ? DarkTheme.black : LightTheme.black,
          color: darkMode ? DarkTheme.black : LightTheme.black,
        },
        '&:disabled': {
          bg: darkMode ? DarkTheme.grey[200] : LightTheme.grey[200],
          color: darkMode ? DarkTheme.white : LightTheme.white,
        },
      },
    },
  }
}

export const GlobalStyle = createGlobalStyle<any>`
  /* Global styles bellow */

  html {
    font-size: 12px;
    font-family: ${({ fonts }) => fonts.body};
    color: ${({ colors, darkMode }) =>
      darkMode ? colors.white : colors.black};
    background: ${({ colors, darkMode }) =>
      darkMode ? colors.grey[100] : colors.grey[100]};
  }

  body {
    font-family: ${({ fonts }) => fonts.body};
    padding: 0;
    padding-top: 60px;
    /* padding-bottom: 60px; */
    margin: 0;
  }

  button, input, select, label, p, a, h1, h2, h3, h4, h5, h6, ul, li, div {
    font-family: ${({ fonts }) => fonts.body} !important;
  }

  button {
    cursor: pointer !important;
  }

  p {
    line-height: 1.5rem;
  }

  a {
    color: ${({ colors, darkMode }) =>
      darkMode ? colors.blue[100] : colors.blue[100]};
  }

  a:hover {
    text-decoration: hover;
  }

  @media (min-width: ${({ breakpoints }) => breakpoints[1]}) {
    html {
      font-size: 12px;
    }
    body {
      padding-bottom: 0;
    }
  }

  @media (min-width: ${({ breakpoints }) => breakpoints[2]}) {
    html {
      font-size: 12px;
    }
    body {
      padding-bottom: 0;
    }
  }

  @media (min-width: ${({ breakpoints }) => breakpoints[3]}) {
    html {
      font-size: 14px;
    }
    body {
      padding-bottom: 0;
    }
  }

  /* Reat datepicker styles */
  .react-datepicker {
    font-family: ${({ fonts }) => fonts.body};
    font-size: 12px;
  }
  .react-datepicker__day-names {
    margin-top: 12px;
  }
  .react-datepicker__input-container input {
    width: calc(100% - 30px);
    border: 0;
    padding-left: ${({ spacer }) => spacer.xl};
    padding-right: ${({ spacer }) => spacer.xl};
    padding-top: ${({ spacer }) => `calc(${spacer.xl} + 2px)`};
    padding-bottom: ${({ spacer }) => `calc(${spacer.xl} + 2px)`};
    text-align: center;
  }
  .react-datepicker__header {
    background: ${({ colors }) => colors.grey[100]};
  }
  .react-datepicker__input-container input:focus-visible {
    outline: none;
  }
  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
    background: ${({ colors }) => colors.blue[100]};
    border-radius: 0;
  }
  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected {
    background: ${({ colors }) => colors.blue[100]};
    border-radius: 0;
  }
  .react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover, .react-datepicker__year-text:hover {
    background: ${({ colors }) => colors.grey[100]};
    border-radius: 0;
  }
  .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover, .react-datepicker__month-text--selected:hover, .react-datepicker__month-text--in-selecting-range:hover, .react-datepicker__month-text--in-range:hover, .react-datepicker__quarter-text--selected:hover, .react-datepicker__quarter-text--in-selecting-range:hover, .react-datepicker__quarter-text--in-range:hover, .react-datepicker__year-text--selected:hover, .react-datepicker__year-text--in-selecting-range:hover, .react-datepicker__year-text--in-range:hover {
    background: ${({ colors }) => colors.red[100]};
    border-radius: 0;
  }
`

export default useDefaultTheme
