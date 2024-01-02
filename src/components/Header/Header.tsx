import React from 'react'
import Button from '../Button'
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

import locales from '../../utils/locales'
import localeCache from '../../utils/locale'

export const Header = (props: HeaderProps) => {
  const { locale } = localeCache

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
      {props.showToday && (
        <Button
          aria-label="Today"
          onClick={props.onTodayClick}
          className={IconNextButton}
          tabIndex={0}
        >
          {locales[locale].today}
        </Button>
      )}
    </Wrapper>
  )
}

export default Header
