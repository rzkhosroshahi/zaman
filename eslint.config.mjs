import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const require = createRequire(import.meta.url)
const jiti = require('jiti')(__filename, { esmResolve: true })

const config = jiti('./eslint.config.ts').default

export default config
