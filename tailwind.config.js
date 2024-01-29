/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        headerBg: '#fdfefd',
        mainBg: '#d0ffff',
        primarayBlue: '#05668D',
        darkPrimarayBlue: '#151b54',
        primarayBlueHovering: '#028090',
        footerBg: '#afdcec',
        sectionBlue: '#3FC1C0',
        darkText: '#101010',
        grayText: '#a9a9a9',
        sectionTitle: '#636363',
        unhoverText: '#606060',
        sidebarColor: '#f5f5f5',
        blue1: '#3FC1C0',
        blue2: '#028090',
        blue3: '#05668D',
        decoratingRed: '#ffa69e'
      }
    },
    screens: {
      mobileSmall: '320px',
      mobileLarge: '425px',
      tabletSmall: '640px',
      tablet: '768px',
      tabletLarge: '962px',
      desktop: '1024px',
      desktopLarge: '1440px'
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
