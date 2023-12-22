const fs = require('fs')
const child_process = require('child_process')

const files = fs.readdirSync('src')
files.forEach((file) => {
  let contents = fs.readFileSync(`src/${file}`, 'utf8')

  if (file === 'main.ts') {
    contents = contents.replace(
      /\/\* This line is used by the build script. Dont modify this line \*\//g,
      '/* This line is used by the build script. Dont modify this line ---',
    )

    contents = contents.replace(
      /\/\/ \*\/ \/\/ End of imports. This line is used by the build script. Dont modify this line/g,
      '*/ // End of imports. This line is used by the build script. Dont modify this line',
    )
  } else {
    contents = contents.replace(/export class/g, 'class')
    contents = contents.replace(/import /g, '//import ')
  }

  fs.writeFileSync(`src/${file}`, contents, 'utf8')
})

child_process.exec(
  'tsc --project tsconfig.production.json',
  (error, stdout, stderr) => {
    const fs = require('fs')

    const files = fs.readdirSync('src')
    files.forEach((file) => {
      let contents = fs.readFileSync(`src/${file}`, 'utf8')

      if (file === 'main.ts') {
        contents = contents.replace(
          /\/\* This line is used by the build script. Dont modify this line ---/g,
          '/* This line is used by the build script. Dont modify this line */',
        )

        contents = contents.replace(
          /\*\/ \/\/ End of imports. This line is used by the build script. Dont modify this line/g,
          '// */ // End of imports. This line is used by the build script. Dont modify this line',
        )
      } else {
        contents = contents.replace(/class/g, 'export class')
        contents = contents.replace(/\/\/import /g, 'import ')
      }

      fs.writeFileSync(`src/${file}`, contents, 'utf8')
    })
  },
)
