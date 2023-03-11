import React from 'react'
import IconButton from '../IconButton'
import ChevronRight from '../Icons/ChevronRight'
import ChevronLeft from '../Icons/ChevronLeft'
import { Wrapper, HeaderTitle } from './Header.styled'
import type { HeaderProps } from './Header.types'

export const Header = (props: HeaderProps) => {
  return (
    <>
      <Wrapper>
        <IconButton onClick={props.onPrevClick}>
          <ChevronRight />
        </IconButton>
        <HeaderTitle onClick={props.onClickOnTitle}>
          {props.monthName}
        </HeaderTitle>
        <IconButton onClick={props.onNextClick}>
          <ChevronLeft />
        </IconButton>
      </Wrapper>
    </>
  )
}

export default Header
