const fs = require('fs')
const child_process = require('child_process')

const files = fs.readdirSync('src')
files.forEach((file) => {
  let contents = fs.readFileSync(`src/${file}`, 'utf8')
  contents = contents.replace(/export class/g, 'class')
  fs.writeFileSync(`src/${file}`, contents, 'utf8')
})

child_process.exec(
  'tsc --project tsconfig.production.json',
  (error, stdout, stderr) => {
    const fs = require('fs')

    const files = fs.readdirSync('src')
    files.forEach((file) => {
      let contents = fs.readFileSync(`src/${file}`, 'utf8')
      contents = contents.replace(/class/g, 'export class')
      fs.writeFileSync(`src/${file}`, contents, 'utf8')
    })
  },
)
