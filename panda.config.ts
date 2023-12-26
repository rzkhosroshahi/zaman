import { defineConfig } from '@pandacss/dev'
import { ACCENT_COLOR } from 'src/constants'
import { getHsl } from 'src/style/colorPallete'
import hexToHSL from 'src/style/hexToHSL'

const { h, s, l } = hexToHSL(ACCENT_COLOR)

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './client/**/*.{js,jsx,ts,tsx}'
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        gray: {
          0: { value: '#FFFFFF' },
          20: { value: '#F5F5F5' },
          30: { value: '#EBEBEB' },
          40: { value: '#DEDEDE' },
          50: { value: '#BFBFBF' },
          60: { value: '#B0B0B0' },
          70: { value: '#575757' },
          80: { value: '#666666' },
          600: { value: '#2E2E2E' }
        }
      }
    },
    semanticTokens: {
      colors: {
        accent: {
          40: {
            value: getHsl(h, s, l - 10)
          },
          50: {
            value: getHsl(h, s, l)
          },
          85: {
            value: getHsl(h, s, 85)
          },
          90: {
            value: getHsl(h, s, 90)
          },
          95: {
            value: getHsl(h, s, 95)
          }
        }
      },
      radii: {
        calendarItem: {
          value: '0px'
        },
        wrapper: {
          value: '0px'
        }
      }
    }
  },
  conditions: {
    extend: {
      disabled: '&:is(:disabled, [disabled], [data-disabled="true"])',
      not_disabled: '&:not(:disabled, [disabled], [data-disabled="true"])',
      selected: '&:is([aria-selected=true], [data-selected="true"])',
      not_selected: '&:not([aria-selected=true], [data-selected="true"])',
      is_range: '&:is([data-range="true"])',
      not_is_range: '&:not([data-range="true"])',
      is_weekend: '&:is([data-weekend="true"])',
      is_in_range: '&:is([data-in-range="true"])',
      is_start_range: '&:is([data-start-range="true"])',
      is_end_range: '&:is([data-end-range="true"])'
    }
  },

  // The output directory for your css system
  outdir: 'styled-system'
})
