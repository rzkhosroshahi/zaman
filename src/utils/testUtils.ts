import { IRangeDatePickerTheme, IRangeDay, IRangeDays } from "../types";

const days = `[{"day":"01","utc":"Fri, 21 Dec 2018 20:30:00 GMT","faDate":"1397/10/01","disable":false},{"day":"02","utc":"Sat, 22 Dec 2018 20:30:00 GMT","faDate":"1397/10/02","disable":false},{"day":"03","utc":"Sun, 23 Dec 2018 20:30:00 GMT","faDate":"1397/10/03","disable":false},{"day":"04","utc":"Mon, 24 Dec 2018 20:30:00 GMT","faDate":"1397/10/04","disable":false},{"day":"05","utc":"Tue, 25 Dec 2018 20:30:00 GMT","faDate":"1397/10/05","disable":false},{"day":"06","utc":"Wed, 26 Dec 2018 20:30:00 GMT","faDate":"1397/10/06","disable":false},{"day":"07","utc":"Thu, 27 Dec 2018 20:30:00 GMT","faDate":"1397/10/07","disable":false},{"day":"08","utc":"Fri, 28 Dec 2018 20:30:00 GMT","faDate":"1397/10/08","disable":false},{"day":"09","utc":"Sat, 29 Dec 2018 20:30:00 GMT","faDate":"1397/10/09","disable":false},{"day":"10","utc":"Sun, 30 Dec 2018 20:30:00 GMT","faDate":"1397/10/10","disable":false},{"day":"11","utc":"Mon, 31 Dec 2018 20:30:00 GMT","faDate":"1397/10/11","disable":false},{"day":"12","utc":"Tue, 01 Jan 2019 20:30:00 GMT","faDate":"1397/10/12","disable":false},{"day":"13","utc":"Wed, 02 Jan 2019 20:30:00 GMT","faDate":"1397/10/13","disable":false},{"day":"14","utc":"Thu, 03 Jan 2019 20:30:00 GMT","faDate":"1397/10/14","disable":false},{"day":"15","utc":"Fri, 04 Jan 2019 20:30:00 GMT","faDate":"1397/10/15","disable":false},{"day":"16","utc":"Sat, 05 Jan 2019 20:30:00 GMT","faDate":"1397/10/16","disable":false},{"day":"17","utc":"Sun, 06 Jan 2019 20:30:00 GMT","faDate":"1397/10/17","disable":false},{"day":"18","utc":"Mon, 07 Jan 2019 20:30:00 GMT","faDate":"1397/10/18","disable":false},{"day":"19","utc":"Tue, 08 Jan 2019 20:30:00 GMT","faDate":"1397/10/19","disable":false},{"day":"20","utc":"Wed, 09 Jan 2019 20:30:00 GMT","faDate":"1397/10/20","disable":false},{"day":"21","utc":"Thu, 10 Jan 2019 20:30:00 GMT","faDate":"1397/10/21","disable":false},{"day":"22","utc":"Fri, 11 Jan 2019 20:30:00 GMT","faDate":"1397/10/22","disable":false},{"day":"23","utc":"Sat, 12 Jan 2019 20:30:00 GMT","faDate":"1397/10/23","disable":false},{"day":"24","utc":"Sun, 13 Jan 2019 20:30:00 GMT","faDate":"1397/10/24","disable":false},{"day":"25","utc":"Mon, 14 Jan 2019 20:30:00 GMT","faDate":"1397/10/25","disable":false},{"day":"26","utc":"Tue, 15 Jan 2019 20:30:00 GMT","faDate":"1397/10/26","disable":false},{"day":"27","utc":"Wed, 16 Jan 2019 20:30:00 GMT","faDate":"1397/10/27","disable":false},{"day":"28","utc":"Thu, 17 Jan 2019 20:30:00 GMT","faDate":"1397/10/28","disable":false},{"day":"29","utc":"Fri, 18 Jan 2019 20:30:00 GMT","faDate":"1397/10/29","disable":false},{"day":"30","utc":"Sat, 19 Jan 2019 20:30:00 GMT","faDate":"1397/10/30","disable":false}]`;
export const mockDays = JSON.parse(days);

export const theme: IRangeDatePickerTheme = {
  backColor: "#00213E",
  // head
  headBackColor: "#00213E",
  headTitleColor: "#ffff",
  headArrowColor: "#fff",
  headRangeBackColor: "#04F5FF",
  headRangeColor: "#333",

  // weekdays color
  weekDaysColor: "#ACACAC",

  // days
  daysColor: "#fff",
  daysBackColor: "#00213E",
  holidaysColor: "#F50057",
  holidaysBackColor: "#00213E",
  daysRound: "50%",

  // start end
  startRangeBackColor: "#04F5FF",
  startRangeColor: "#000",
  endRangeBackColor: "#04F5FF",
  endRangeColor: "#000",
  continueRangeBackColor: "#014B64",
  continueRangeColor: "#fff",
  sameRangeBackColor: "#00213E",
  sameRangeColor: "#04F5FF",
  // buttons
  submitBackColor: "#04F5FF",
  submitHoverBackColor: "#014B64",
  submitColor: "#000",
  submitHoverColor: "#fff",
  cancelBackColor: "#00213E",
  cancelHoverBackColor: "#04F5FF",
  cancelColor: "#fff",
  cancelHoverColor: "#000",
};

export const rangeHelperMock = <IRangeDays>{
  "1397/10/04": { status: "startRange" },
  "1397/10/05": { status: "continueRange" },
  "1397/10/06": { status: "continueRange" },
  "1397/10/07": { status: "continueRange" },
  "1397/10/08": { status: "endRange" },
};
