# React Jalali Date-Picker

## Calendar

| props       | type                                                                                         | default                                  |
| ----------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| holidays    | object[] => holiday: boolean, month: number, type: string Iran or Afghanistan, title: string | تعطیلات رسمی سال جاری                    |
| weekend     | object[] => day: number                                                                      | [{ day: 6 }]                             |
| startWeek   | number                                                                                       | day: 0                                   |
| today       | number                                                                                       | 0                                        |
| event       | object[] => name: month name, start: Date, end: Date, type: string, description              | null                                     |
| eventColors | object => type: string, color: HexColor                                                      | any type is #ccc color                   |
| ArrowLeft   | React.ReactNode                                                                              | default component                        |
| ArrowRight  | React.ReactNode                                                                              | default component                        |
| style       | boolean                                                                                      | true. if it's false remove default style |

## Date Picker

| props      | type                                                                                         | default                                  |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| value      | Date or Moment                                                                               | today date                               |
| holidays   | object[] => holiday: boolean, month: number, type: string Iran or Afghanistan, title: string | تعطیلات رسمی سال جاری                    |
| weekend    | object[] => day: number                                                                      | [{ day: 6 }]                             |
| startWeek  | number                                                                                       | day: 0                                   |
| ArrowLeft  | React.ReactNode                                                                              | default component                        |
| ArrowRight | React.ReactNode                                                                              | default component                        |
| style      | boolean                                                                                      | true. if it's false remove default style |

## Range Date Picker

| props      | type                                                                                         | default                                  |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| value      | Date or Moment                                                                               | today date                               |
| holidays   | object[] => holiday: boolean, month: number, type: string Iran or Afghanistan, title: string | تعطیلات رسمی سال جاری                    |
| weekend    | object[] => day: number                                                                      | [{ day: 6 }]                             |
| range      | object[] => name: month name, start: Date, end: Date                                         | null                                     |
| startWeek  | number                                                                                       | day: 0                                   |
| ArrowLeft  | React.ReactNode                                                                              | default component                        |
| ArrowRight | React.ReactNode                                                                              | default component                        |
| style      | boolean                                                                                      | true. if it's false remove default style |
