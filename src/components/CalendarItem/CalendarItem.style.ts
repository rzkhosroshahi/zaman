import { cva } from '../../../styled-system/css'

export const calendarItem = cva({
  base: {
    position: 'relative',
    outline: 'none',
    bg: 'transparent',
    display: 'flex',
    fontFamily: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
    userSelect: 'none',
    color: 'gray.600',
    borderRadius: 'calendarItem',

    _hover: {
      borderColor: 'gray.50'
    },
    _focus: {
      borderColor: 'gray.50'
    },
    _active: {
      bg: 'accent.50',
      borderColor: 'transparent',
      color: 'gray.0'
    },
    _selected: {
      bg: 'accent.50',
      borderColor: 'transparent',
      color: 'gray.0'
    },
    _disabled: {
      borderColor: 'transparent',
      '&.cl-text': {
        opacity: 0.5
      }
    },
    _not_disabled: {
      cursor: 'pointer'
    },
    _not_is_range: {
      transition: 'all 0.1s linear;'
    },
    _not_selected: {
      _is_weekend: {
        color: '#ff4d4d'
      }
    },
    _is_in_range: {
      bg: 'accent.90',
      borderColor: 'transparent',
      _before: {
        content: ' ',
        display: 'block',
        position: 'absolute',
        width: '40px',
        height: '40px',
        top: '-1px',
        bg: 'accent.90',
        zIndex: -1,
        right: 'unset',
        left: 'unset',
        _rtl: {
          left: '20px'
        },
        _ltr: {
          right: '20px'
        }
      },
      '&:nth-of-type(1)': {
        _before: {
          display: 'none'
        }
      }
    },
    _is_start_range: {
      bg: 'accent.40',
      color: 'gray.0',
      borderColor: 'transparent',
      _before: {
        display: 'none'
      }
    },
    _is_end_range: {
      bg: 'accent.40',
      color: 'gray.0',
      borderColor: 'transparent',
      _before: {
        content: ' ',
        display: 'block',
        position: 'absolute',
        width: '40px',
        height: '40px',
        top: '-1px',
        bg: 'accent.90',
        zIndex: -1
      }
    }
  }
})
