import React from 'react'
import IconButton from '../IconButton'
import ChevronRight from '../Icons/ChevronRight'
import ChevronLeft from '../Icons/ChevronLeft'
import { Wrapper, HeaderTitle, SubHeader, DayName } from './Header.styled'
import type { HeaderProps } from './Header.types'
import localeCache from '../../utils/locale'
import locales from '../../utils/locales'

export const Header = (props: HeaderProps) => {
  const { locale } = localeCache

  return (
    <>
      <Wrapper>
        <IconButton onClick={props.onPrevClick}>
          <ChevronRight />
        </IconButton>
        <HeaderTitle>
          {props.monthName}
        </HeaderTitle>
        <IconButton onClick={props.onNextClick}>
          <ChevronLeft />
        </IconButton>
      </Wrapper>
      <SubHeader>
        {locales[locale].shortWeekDays.map((day) => (
          <DayName key={day.key}>{day.name}</DayName>
        ))}
      </SubHeader>
    </>
  )
}

export default Header
