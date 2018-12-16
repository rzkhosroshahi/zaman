# React Jalali Date-Picker

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/11410506?v=4" width="100px;"/><br /><sub><b>Reza Khosroshahi</b></sub>](https://reza.blue)<br />[💻](https://github.com/rzkhosroshahi/react-jalali-datepicker/commits?author=rzkhosroshahi "Code") [📖](https://github.com/rzkhosroshahi/react-jalali-datepicker/commits?author=rzkhosroshahi "Documentation") [💡](#example-rzkhosroshahi "Examples") [🤔](#ideas-rzkhosroshahi "Ideas, Planning, & Feedback") [⚠️](https://github.com/rzkhosroshahi/react-jalali-datepicker/commits?author=rzkhosroshahi "Tests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
