const fs = require('fs')
const child_process = require('child_process')

const protectBeforeBuild = (files) => {
  files.forEach((file) => {
    let contents = fs.readFileSync(`src/${file}`, 'utf8')

    if (file !== 'main.ts') {
      contents = contents.replace(/export class/g, 'class')
    }
    contents = contents.replace(/import /g, '//import ')

    fs.writeFileSync(`src/${file}`, contents, 'utf8')
  })
}

const restoreAfterBuild = (files) => {
  files.forEach((file) => {
    let contents = fs.readFileSync(`src/${file}`, 'utf8')

    if (file !== 'main.ts') {
      contents = contents.replace(/class/g, 'export class')
    }
    contents = contents.replace(/\/\/import /g, 'import ')

    fs.writeFileSync(`src/${file}`, contents, 'utf8')
  })
}

const files = fs.readdirSync('src')
protectBeforeBuild(files)

child_process.exec(
  'tsc --project tsconfig.production.json',
  (error, stdout, stderr) => {
    const fs = require('fs')

    const files = fs.readdirSync('src')
    restoreAfterBuild(files)
  },
)
