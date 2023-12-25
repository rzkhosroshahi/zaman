import React, { useContext } from 'react'
import IconButton from '../IconButton'
import ChevronRight from '../Icons/ChevronRight'
import ChevronLeft from '../Icons/ChevronLeft'
import type { HeaderProps } from './Header.types'
import {
  HeaderClass,
  IconNextButton,
  IconPrevButton,
  MonthYearButton
} from '../../style/classNames'
import cl from './Header.module.css'
import { cls } from '../../utils/className'
import { ThemeContext } from '../ThemeProvider/ThemeProvider'

export const Header = (props: HeaderProps) => {
  const theme = useContext(ThemeContext)
  const roundClassNames = {
    thin: cl.WrapperClassThin,
    x1: cl.WrapperClassX1,
    x2: cl.WrapperClassX2,
    x3: cl.WrapperClassX3,
    x4: cl.WrapperClassX4
  }
  return (
    <div className={cls([cl.WrapperClass, HeaderClass])}>
      <IconButton
        aria-label="Previous month"
        onClick={props.onPrevClick}
        className={IconPrevButton}
        tabIndex={0}
      >
        <ChevronRight />
      </IconButton>
      <button
        className={cls([
          cl.HeaderTitle,
          MonthYearButton,
          roundClassNames[theme.round]
        ])}
        role="presentation"
        onClick={props.onClickOnTitle}
        aria-label="calendar view is open, switch to year and month view"
        tabIndex={0}
      >
        {props.monthName}
      </button>
      <IconButton
        aria-label="Next month"
        onClick={props.onNextClick}
        className={IconNextButton}
        tabIndex={0}
      >
        <ChevronLeft />
      </IconButton>
    </div>
  )
}

export default Header
