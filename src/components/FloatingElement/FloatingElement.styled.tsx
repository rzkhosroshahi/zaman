import styled from '@emotion/styled'
import { ANIMATE_FUNC } from '../../constants'
import { slideDown } from '../../style/animation'

export const Wrapper = styled.div`
  position: absolute;
  animation: ${slideDown} .3s ${ANIMATE_FUNC} alternate;
`
