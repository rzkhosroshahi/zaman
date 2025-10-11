import { cn, type ClassValue } from './cn'

interface VariantConfig<T extends Record<string, Record<string, ClassValue>>> {
  base?: ClassValue
  variants?: T
  defaultVariants?: {
    [K in keyof T]?: keyof T[K]
  }
}

type VariantProps<T extends Record<string, Record<string, ClassValue>>> = {
  [K in keyof T]?: keyof T[K]
} & {
  className?: string
}

export function createVariants<
  T extends Record<string, Record<string, ClassValue>>
>(config: VariantConfig<T>) {
  return (props?: VariantProps<T>): string => {
    const { className, ...variantProps } = props ?? {}

    const classes: ClassValue[] = [config.base]

    if (config.variants) {
      for (const variantKey in config.variants) {
        if (!Object.prototype.hasOwnProperty.call(config.variants, variantKey))
          continue

        const variantValue = config.variants[variantKey]
        const selectedVariant =
          (variantProps as Record<string, string | undefined>)[variantKey] ??
          (config.defaultVariants?.[variantKey] as string | undefined)

        if (
          selectedVariant &&
          typeof selectedVariant === 'string' &&
          variantValue[selectedVariant]
        ) {
          classes.push(variantValue[selectedVariant])
        }
      }
    }

    classes.push(className)

    return cn(...classes)
  }
}
