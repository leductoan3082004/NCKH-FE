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
        primaryGreen: '#435a24',
        primaryHoverGreen: '#235a24',
        sectionGreen: '#b3d69c',
        darkText: '#101010',
        grayText: '#a9a9a9',
        sectionTitle: '#636363',
        unhoverText: '#666'
      }
    },
    screens: {
      mobileS: '320px',
      mobileL: '425px',
      tablet: '640px',
      laptop: '1024px',
      largeScreen: '1440px'
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
