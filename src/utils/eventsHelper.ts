import { IEvents } from "../types";
import * as moment from "jalali-moment";

export function eventsHelper(events: IEvents[]) {
  const eventsDays = {};
  events.map(event => {
    const { type, description: describeEvent, color: eventColor } = event;
    const description = describeEvent ? { describeEvent } : null;
    const color = eventColor ? { eventColor } : null;
    const eventStart = moment(event.start);
    const eventEnd = moment(event.end);

    while (eventStart.isSameOrBefore(eventEnd)) {
      const key = eventsDays[eventStart.format("jYYYY/jMM/jDD")];
      if (key) {
        eventsDays[eventStart.format("jYYYY/jMM/jDD")].push({
          type,
          ...description,
          ...color,
        });
      } else {
        eventsDays[eventStart.format("jYYYY/jMM/jDD")] = [
          { type, ...description, ...color },
        ];
      }
      eventStart.add("day", 1);
    }
  });

  return eventsDays;
}
