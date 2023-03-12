import React, { useState } from 'react'
import { Calendar, CalendarProvider, DatePicker } from '../src'
import { createRoot } from 'react-dom/client'
import './style.css'
const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

const App = () => {
  const [view, setView] = useState<string>('day')

  return (
    <section className="wrapper">
      <div className="tab">
        <div
          className={`tabItem tabItem${view === 'cal' ? '--selected' : ''}`}
          onClick={() => setView('cal')}
        >
          Calendar
        </div>
        <div
          className={`tabItem tabItem${view === 'day' ? '--selected' : ''}`}
          onClick={() => setView('day')}
        >
          Date picker
        </div>
      </div>
      {view === 'cal'
        ? (
        <div className="libWrapper">
          <CalendarProvider locale="fa" round="roundX2">
            <Calendar
              value={new Date()}
              onChange={(d) => console.log(d)}
              weekends={[6]}
            />
          </CalendarProvider>
          <CalendarProvider locale="fa" round="roundX4" accentColor="#6374ae">
            <Calendar
              value={new Date()}
              onChange={(d) => console.log(d)}
              weekends={[6]}
              from="Mon Mar 06 2023 20:11:58 GMT+0330 (Iran Standard Time)"
              to="Wed Mar 14 2023 21:41:23 GMT+0330 (Iran Standard Time)"
              range
            />
          </CalendarProvider>
        </div>
          )
        : null}
      {view === 'day'
        ? (
        <div className="libWrapper">
          <DatePicker round="roundX4" />
          <DatePicker round="roundX2" accentColor="#6374ae" range />
        </div>
          )
        : null}
    </section>
  )
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
