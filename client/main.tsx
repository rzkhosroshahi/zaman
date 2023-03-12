import React, { useState } from 'react'
import { Calendar, CalendarProvider, DatePicker } from '../src'
import { createRoot } from 'react-dom/client'
import './style.css'
const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

const App = () => {
  const [view, setView] = useState<string>('day')

  return (
    <section>
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
      {
        view === 'cal'
          ? <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <CalendarProvider locale="fa" round="roundX2">
              <Calendar
                value={new Date()}
                onChange={(d) => console.log(d)}
                weekends={[6]}
              />
            </CalendarProvider>
            <CalendarProvider locale="fa" round="roundX4" accentColor="#6374ae">
              <Calendar
                value={new Date()} onChange={(d) => console.log(d)}
                weekends={[6]}
                range
              />
            </CalendarProvider>
          </div>
          : null
      }
      {
        view === 'day'
          ? <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <DatePicker
              round="roundX4"
            />
            <DatePicker
              round="roundX4"
              accentColor="#6374ae"
              range
              from="Mon Mar 06 2023 20:11:58 GMT+0330 (Iran Standard Time)"
              to="Wed Mar 14 2023 21:41:23 GMT+0330 (Iran Standard Time)"
            />
          </div>
          : null
      }
    </section>
  )
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
