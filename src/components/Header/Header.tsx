import React from 'react'
import IconButton from '../IconButton'
import ChevronRight from '../Icons/ChevronRight'
import ChevronLeft from '../Icons/ChevronLeft'
import { weekDayNames } from '../../utils'
import { Wrapper, HeaderTitle, SubHeader, DayName } from './Header.styled'
import type { HeaderProps } from './Header.types'

export const Header = (props: HeaderProps) => {
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
        {weekDayNames.map((name) => (
          <DayName key={name}>{name}</DayName>
        ))}
      </SubHeader>
    </>
  )
}

export default Header
