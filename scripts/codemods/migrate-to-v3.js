/**
 * Codemod for migrating from Zaman v2 to v3
 *
 * Usage:
 * npx jscodeshift -t scripts/codemods/migrate-to-v3.js src/
 *
 * This codemod is OPTIONAL since v3 maintains backward compatibility
 */

module.exports = function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasModifications = false

  // Transform locale imports (optional modernization)
  root
    .find(j.ImportDeclaration, {
      source: { value: (v) => v.includes('@utils/locales') }
    })
    .forEach((path) => {
      // Replace with new i18n system import
      const newImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('fa'), j.identifier('fa'))],
        j.literal('zaman/i18n/locales')
      )

      j(path).replaceWith(newImport)
      hasModifications = true
    })

  // Add JSDoc comments to component exports
  root.find(j.ExportDefaultDeclaration).forEach((path) => {
    if (!path.value.comments) {
      const componentName = path.value.declaration.name || 'Component'
      path.value.comments = [
        j.commentBlock(
          `*\n * ${componentName}\n * @see https://github.com/rzkhosroshahi/zaman\n `,
          true,
          false
        )
      ]
      hasModifications = true
    }
  })

  return hasModifications ? root.toSource() : null
}
