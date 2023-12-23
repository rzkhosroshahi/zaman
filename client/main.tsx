import React, { useState } from 'react'
import { Calendar, CalendarProvider, DatePicker } from '../src'
import { createRoot } from 'react-dom/client'
import './style.css'
import TimePicker from '../src/packages/TimePicker'
const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

const App = () => {
  const [view, setView] = useState<string>('cal')
  const [calendarValue, setCalendarValue] = useState(new Date())

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
        <div
          className={`tabItem tabItem${view === 'time' ? '--selected' : ''}`}
          onClick={() => setView('time')}
        >
          Time picker
        </div>
      </div>
      {view === 'cal' ? (
        <div className="libWrapper">
          <CalendarProvider locale="fa" round="x2">
            <Calendar
              defaultValue={calendarValue}
              onChange={({ value }) => setCalendarValue(value)}
              weekends={[6]}
            />
          </CalendarProvider>
          <CalendarProvider locale="fa" round="x4" accentColor="#6374ae">
            <Calendar
              defaultValue={new Date()}
              onChange={({ from, to }) => console.log(from, '---', to)}
              weekends={[6]}
              from={new Date()}
              to={new Date().setDate(new Date().getDate() + 3)}
              range
            />
          </CalendarProvider>
        </div>
      ) : null}
      {view === 'day' ? (
        <div className="libWrapper">
          <DatePicker
            round="x4"
            position="center"
            onChange={(e) => console.log(e)}
          />
          <DatePicker
            round="x2"
            accentColor="#6374ae"
            range
            from={new Date()}
            to={new Date().setDate(new Date().getDate() + 3)}
            onChange={(e) => console.log(e)}
          />
        </div>
      ) : null}
      {view === 'time' ? (
        <div className="libWrapper">
          <TimePicker
            accentColor="#6374ae"
            onChange={(py) => console.log(py)}
          />
        </div>
      ) : null}
    </section>
  )
}
root.render(<App />)
