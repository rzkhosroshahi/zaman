import React from 'react'
import DatePicker from './DatePicker'
import { HeaderClass } from '../../style/classNames'

describe('<DatePicker />', () => {
  const initialDate = '2023 04 25'
  it('renders', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(<DatePicker defaultValue={initialDate} onChange={onChangeSpy} />)
      .get('input')
      .click()

    // change the year
    cy.get(`.${HeaderClass}`)
      .click()
    // click on the current month
    cy.findByText('۱۴۰۲')
      .click()
    // click on the mordad month
    cy.findByText('مرداد')
      .click()
    // click on the mordad month
    cy.findByText('۱۸')
      .click()
    cy.get('@onChangeSpy').should('have.callCount', 1)
  })
})
