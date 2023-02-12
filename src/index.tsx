import React from 'react'
import styled from '@emotion/styled'
import moment from 'jalali-moment'

const Text = styled.p`
  color: hotpink;
`
export const Main: React.FC = () => (
  <Text>Hello</Text>
)

export default {
  Main,
  moment
}
