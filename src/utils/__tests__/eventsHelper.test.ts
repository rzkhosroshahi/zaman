import { eventsHelper } from "../eventsHelper";

const events = [
  {
    start: "Tue, 25 Dec 2018 20:01:44 GMT",
    end: "Sat, 29 Dec 2018 20:01:44 GMT",
    type: "booking",
    description: "test describeEvent",
  },
  {
    start: "Thu, 27 Dec 2018 20:01:44 GMT",
    end: "Sun, 30 Dec 2018 20:01:44 GMT",
    type: "parental",
    color: "#ccc",
  },
];

test("make sure", () => {
  expect(eventsHelper(events)).toEqual({
    "1397/10/04": [{ type: "booking", describeEvent: "test describeEvent" }],
    "1397/10/05": [{ type: "booking", describeEvent: "test describeEvent" }],
    "1397/10/06": [
      { type: "booking", describeEvent: "test describeEvent" },
      { type: "parental", eventColor: "#ccc" },
    ],
    "1397/10/07": [
      { type: "booking", describeEvent: "test describeEvent" },
      { type: "parental", eventColor: "#ccc" },
    ],
    "1397/10/08": [
      { type: "booking", describeEvent: "test describeEvent" },
      { type: "parental", eventColor: "#ccc" },
    ],
    "1397/10/09": [{ type: "parental", eventColor: "#ccc" }],
  });
});
