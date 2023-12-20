export interface Theme {
  colors: Record<string, string>
  classes: Record<string, Record<string, string>>
}
export interface InjectCSSVariablesProps {
  targetElement?: string
  theme: Theme
}
