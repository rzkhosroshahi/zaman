export interface Theme {
  colors: Record<string, string>
}
export interface InjectCSSVariablesProps {
  targetElement?: string
  theme: Theme
}
