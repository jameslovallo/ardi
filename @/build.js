import { exec } from 'child_process'
import fs from 'fs'
import { marked } from 'marked'
import path from 'path'
import unescape from 'unescape'
import headJSON from './head.json' assert { type: 'json' }

const doc = (head, body) => `
<!DOCTYPE html>
<html lang="en-us">
${head}
${body}
</html>
`

const head = `<head>
<meta name="prebuilt" content="true">
${Object.keys(headJSON)
  .map((tagType) =>
    headJSON[tagType]
      .map(
        (el) =>
          `<${tagType} ${Object.keys(el)
            .map((attr) => `${attr}="${el[attr]}"`)
            .join(' ')}>`
      )
      .join('')
  )
  .join('')}
</head>`

const getFile = (path) =>
  fs.readFileSync(path, { encoding: 'utf8' }, (err, data) =>
    err ? console.log(err) : data
  )

function buildHTML(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log('directory does not exist: ', startPath)
    return
  }

  const files = fs.readdirSync(startPath)
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i])
    var stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      buildHTML(filename, filter) //recurse
    } else if (filename.endsWith(filter)) {
      let file = getFile(filename)
      let body = file.replace(
        '<body',
        '<body style="opacity: 0; transition: opacity .5s;"'
      )
      if (file.includes('lang="md"')) {
        let openingTag = body.match(/<body.+>/)[0]
        body = body.replace(openingTag, '')
        body = body.replace('</body>', '')
        body = marked.parse(unescape(body), {
          gfm: true,
        })
        body = openingTag.replace(' lang="md"', '') + body + '</body>'
      }
      fs.writeFileSync(filename, doc(head, body), {
        encoding: 'utf8',
      })
    }
  }
}

const excludes = [
  '.git',
  '.gitignore',
  '@/build.js',
  'bin.js',
  'node_modules',
  'package-lock.json',
  'package.json',
]

exec(
  `rsync -a ${excludes.map((e) => `--exclude "${e}"`).join(' ')} ./ ./dist/`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    if (!error && !stderr) buildHTML('./dist/', '.html')
  }
)
