const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

const protectBeforeBuild = (dir) => {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      protectBeforeBuild(filePath) // recursive for subdirectories
    } else {
      let contents = fs.readFileSync(filePath, 'utf8')
      if (file !== 'main.ts') {
        contents = contents.replace(/export class/g, 'class')
      }
      contents = contents.replace(/import /g, '//import ')
      fs.writeFileSync(filePath, contents, 'utf8')
    }
  })
}

const restoreAfterBuild = (dir) => {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      restoreAfterBuild(filePath) // recursive for subdirectories
    } else {
      let contents = fs.readFileSync(filePath, 'utf8')
      if (file !== 'main.ts') {
        contents = contents.replace(/class/g, 'export class')
      }
      contents = contents.replace(/\/\/import /g, 'import ')
      fs.writeFileSync(filePath, contents, 'utf8')
    }
  })
}

const srcDir = 'src'
protectBeforeBuild(srcDir)

child_process.exec(
  'tsc --project tsconfig.production.json',
  (error, stdout, stderr) => {
    restoreAfterBuild(srcDir)
  },
)
