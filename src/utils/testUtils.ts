import { ITheme } from "../theme";

const days = `[{"day":"01","utc":"Fri, 21 Dec 2018 20:30:00 GMT","faDate":"1397/10/01","disable":false},{"day":"02","utc":"Sat, 22 Dec 2018 20:30:00 GMT","faDate":"1397/10/02","disable":false},{"day":"03","utc":"Sun, 23 Dec 2018 20:30:00 GMT","faDate":"1397/10/03","disable":false},{"day":"04","utc":"Mon, 24 Dec 2018 20:30:00 GMT","faDate":"1397/10/04","disable":false},{"day":"05","utc":"Tue, 25 Dec 2018 20:30:00 GMT","faDate":"1397/10/05","disable":false},{"day":"06","utc":"Wed, 26 Dec 2018 20:30:00 GMT","faDate":"1397/10/06","disable":false},{"day":"07","utc":"Thu, 27 Dec 2018 20:30:00 GMT","faDate":"1397/10/07","disable":false},{"day":"08","utc":"Fri, 28 Dec 2018 20:30:00 GMT","faDate":"1397/10/08","disable":false},{"day":"09","utc":"Sat, 29 Dec 2018 20:30:00 GMT","faDate":"1397/10/09","disable":false},{"day":"10","utc":"Sun, 30 Dec 2018 20:30:00 GMT","faDate":"1397/10/10","disable":false},{"day":"11","utc":"Mon, 31 Dec 2018 20:30:00 GMT","faDate":"1397/10/11","disable":false},{"day":"12","utc":"Tue, 01 Jan 2019 20:30:00 GMT","faDate":"1397/10/12","disable":false},{"day":"13","utc":"Wed, 02 Jan 2019 20:30:00 GMT","faDate":"1397/10/13","disable":false},{"day":"14","utc":"Thu, 03 Jan 2019 20:30:00 GMT","faDate":"1397/10/14","disable":false},{"day":"15","utc":"Fri, 04 Jan 2019 20:30:00 GMT","faDate":"1397/10/15","disable":false},{"day":"16","utc":"Sat, 05 Jan 2019 20:30:00 GMT","faDate":"1397/10/16","disable":false},{"day":"17","utc":"Sun, 06 Jan 2019 20:30:00 GMT","faDate":"1397/10/17","disable":false},{"day":"18","utc":"Mon, 07 Jan 2019 20:30:00 GMT","faDate":"1397/10/18","disable":false},{"day":"19","utc":"Tue, 08 Jan 2019 20:30:00 GMT","faDate":"1397/10/19","disable":false},{"day":"20","utc":"Wed, 09 Jan 2019 20:30:00 GMT","faDate":"1397/10/20","disable":false},{"day":"21","utc":"Thu, 10 Jan 2019 20:30:00 GMT","faDate":"1397/10/21","disable":false},{"day":"22","utc":"Fri, 11 Jan 2019 20:30:00 GMT","faDate":"1397/10/22","disable":false},{"day":"23","utc":"Sat, 12 Jan 2019 20:30:00 GMT","faDate":"1397/10/23","disable":false},{"day":"24","utc":"Sun, 13 Jan 2019 20:30:00 GMT","faDate":"1397/10/24","disable":false},{"day":"25","utc":"Mon, 14 Jan 2019 20:30:00 GMT","faDate":"1397/10/25","disable":false},{"day":"26","utc":"Tue, 15 Jan 2019 20:30:00 GMT","faDate":"1397/10/26","disable":false},{"day":"27","utc":"Wed, 16 Jan 2019 20:30:00 GMT","faDate":"1397/10/27","disable":false},{"day":"28","utc":"Thu, 17 Jan 2019 20:30:00 GMT","faDate":"1397/10/28","disable":false},{"day":"29","utc":"Fri, 18 Jan 2019 20:30:00 GMT","faDate":"1397/10/29","disable":false},{"day":"30","utc":"Sat, 19 Jan 2019 20:30:00 GMT","faDate":"1397/10/30","disable":false}]`;
export const mockDays = JSON.parse(days);

export const theme: ITheme = {
  // head
  headBackColor: "#FFFFFF",
  headTitleColor: "#000",
  headArrowColor: "#000",
  headRangeBackColor: "#D6D6D6",
  headRangeColor: "#000",

  // weekdays color
  weekDaysColor: "#3F3F3F",

  // days
  daysColor: "#000",
  daysBackColor: "#FFFFFF",
  holidaysColor: "#F50057",
  holidaysBackColor: "#FFFFFF",

  // start end
  startEndRangeColor: "#000",
  startRangeBackColor: "#D6D6D6",
  endRangeBackColor: "#D6D6D6",
  continueRangeBackColor: "#f3f3f3",
};

export const rangeHelperMock = {
  "1397/10/04": { status: "startRange" },
  "1397/10/05": { status: "continueRange" },
  "1397/10/06": { status: "continueRange" },
  "1397/10/07": { status: "continueRange" },
  "1397/10/08": { status: "endRange" },
};
