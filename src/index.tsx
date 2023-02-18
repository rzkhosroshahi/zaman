import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import moment from 'jalali-moment'
import FloatingElement from './components/FloatingElement'

const Text = styled.p`
  color: hotpink;
`
export const Main: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  return (
    <div>
      <input ref={inputRef} type="text" onClick={() => { setShowCalendar(true) }} />
      { showCalendar
        ? <FloatingElement destinationRef={inputRef}>
            <Text>
            TEEEXT
            </Text>
          </FloatingElement>
        : null }
    </div>
  )
}

export default {
  Main,
  moment
}
