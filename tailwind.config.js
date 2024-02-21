/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        headerBg: '#fdfefd',
        mainBg: '#cdedfd',
        primaryBlue: '#0077B6',
        primaryBackground: '#00B4D8',
        darkPrimaryBlue: '#03045E',
        primaryBlueHovering: '#0077B6',
        sectionBlue: '#ADE8F4',
        footerBg: '#3FC1C0',
        darkText: '#101010',
        grayText: '#a9a9a9',
        sectionTitle: '#636363',
        unhoverText: '#606060',
        sidebarColor: '#f5f5f5',
        decoratingRed: '#ffa69e',
        alertRed: '#ff0f0f',
        successGreen: '#4BB543',
        mainBlue100: '#CAF0F8',
        mainBlue200: '#ADE8F4',
        mainBlue300: '#90E0EF',
        mainBlue400: '#48CAE4',
        mainBlue500: '#00B4D8',
        mainBlue600: '#0096C7',
        mainBlue700: '#0077B6',
        mainBlue800: '#023E8A',
        mainBlue900: '#03045E'
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
        },
        '.postContainer': {
          maxWidth: theme('columns.5xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
