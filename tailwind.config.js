/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        headerBg: '#fdfefd',
        mainGreen: '#eef7e8',
        lightGreenCyan: '#7bdcb5',
        primaryGreen: '#435a24',
        primaryHoverGreen: '#235a24',
        sectionGreen: '#b3d69c',
        darkText: '#101010',
        grayText: '#a9a9a9',
        sectionTitle: '#636363',
        unhoverText: '#666',
        sidebarColor: '#f5f5f5'
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
