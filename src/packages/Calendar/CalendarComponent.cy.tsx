import React from 'react'
import Calendar from './Calendar'
import { CalendarProvider } from '../../index'
import {
  DaysButton,
  HeaderClass,
  IconNextButton,
  IconPrevButton,
  YearPickerButton
} from '../../style/classNames'

describe('Calendar Component', () => {
  it('renders', () => {
    const initialDate = '1994 08 09'
    cy.mount(
      <CalendarProvider locale={'fa'}>
        <Calendar defaultValue={new Date(initialDate)} onChange={() => {}} />
      </CalendarProvider>
    )
      .get(`.${HeaderClass}`)
      .findByText('مرداد ۱۳۷۳')
      .get(`.${DaysButton}[aria-selected=true]`)
      .should('have.text', '۱۸')
  })
  it('renders en locale', () => {
    const initialDate = '1994 08 09'
    cy.mount(
      <CalendarProvider locale={'en'}>
        <Calendar defaultValue={new Date(initialDate)} onChange={() => {}} />
      </CalendarProvider>
    )
      .get(`.${HeaderClass}`)
      .findByText('Aug 1994')
      .get(`.${DaysButton}[aria-selected=true]`)
      .should('have.text', '9')
  })
  it('scenario 1 choose the year and the month', () => {
    const initialDate = '1994 08 09'
    // going to Year and Month Picker state
    cy.mount(
      <CalendarProvider locale={'fa'}>
        <Calendar defaultValue={new Date(initialDate)} onChange={() => {}} />
      </CalendarProvider>
    )
      .get(`.${HeaderClass}`)
      .click()
      .get(`.${YearPickerButton}[aria-selected=true]`)
      .should('have.text', '۱۳۷۳')
    // change the year
    cy.findByText('۱۴۰۲').click()
    // click on the current month
    cy.findByText('مرداد').click()
    // now year should be changed
    cy.get(`.${HeaderClass}`).should('have.text', 'مرداد ۱۴۰۲')
    // go to previous month
    cy.get(`.${IconPrevButton}`).click()
    // now month should be changed
    cy.get(`.${HeaderClass}`).should('have.text', 'تیر ۱۴۰۲')
    cy.wait(300)
    // go to previous month
    cy.get(`.${IconNextButton}`).click()
    // now month should be changed
    cy.get(`.${HeaderClass}`).should('have.text', 'مرداد ۱۴۰۲')
    // go to previous month
    cy.get(`.${IconNextButton}`).click()
    // now month should be changed
    cy.get(`.${HeaderClass}`).should('have.text', 'شهریور ۱۴۰۲')
  })
})
