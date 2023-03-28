# Zaman React Date-Picker

## Date Picker and Calendar

| props        | type                                                       | default   |
|--------------|------------------------------------------------------------|-----------|
| defaultValue | timestamp &#124; Date &#124; Dayjs                         | Date      |
| weekend      | number[]                                                   | undefined |
| round        | string one of thin &#124; x1 &#124; x2 &#124; x3 &#124; x4 | thin      |
| accentColor  | string                                                     | #0D59F2   |
| locale       | string one of fa &#124; en                                 | fa        |
| onChange     | function                                                   | undefined |
| range        | boolean                                                    | false     |
| from         | timestamp &#124; Date &#124; Dayjs                         | undefined |
| to           | timestamp &#124; Date &#124; Dayjs                         | undefined |
| show         | boolean                                                    | false     |


## Calendar Provider

| props       | type                                                       | default |
|-------------|------------------------------------------------------------|---------|
| round       | string one of thin &#124; x1 &#124; x2 &#124; x3 &#124; x4 | thin    |
| accentColor | string                                                     | #0D59F2 |
| locale      | string one of fa &#124; en                                 | fa      |
| children    | ReactNode                                                  | null    |



## Time Picker

| props        | type                                                       | default |
|--------------|------------------------------------------------------------|---------|
| defaultValue | timestamp &#124; Date &#124; Dayjs                         | Date    |
| round        | string one of thin &#124; x1 &#124; x2 &#124; x3 &#124; x4 | thin    |
| accentColor  | string                                                     | #0D59F2 |
| locale       | string one of fa &#124; en                                 | fa      |
| clockTime    | number one of 12 &#124; 24                                 | 24      |

