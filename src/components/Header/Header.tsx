import React from 'react'
import IconButton from '../IconButton'
import ChevronRight from '../Icons/ChevronRight'
import ChevronLeft from '../Icons/ChevronLeft'
import { Wrapper, HeaderTitle } from './Header.styled'
import type { HeaderProps } from './Header.types'
import {
  HeaderClass,
  IconNextButton,
  IconPrevButton,
  MonthYearButton
} from '../../style/classNames'

export const Header = (props: HeaderProps) => {
  return (
    <Wrapper className={HeaderClass}>
      <IconButton
        aria-label="Previous month"
        onClick={props.onPrevClick}
        className={IconPrevButton}
        tabIndex={0}
      >
        <ChevronRight />
      </IconButton>
      <HeaderTitle
        className={MonthYearButton}
        role="presentation"
        onClick={props.onClickOnTitle}
        aria-label="calendar view is open, switch to year and month view"
        tabIndex={0}
      >
        {props.monthName}
      </HeaderTitle>
      <IconButton
        aria-label="Next month"
        onClick={props.onNextClick}
        className={IconNextButton}
        tabIndex={0}
      >
        <ChevronLeft />
      </IconButton>
    </Wrapper>
  )
}

export default Header
