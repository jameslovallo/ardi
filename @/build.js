import fs from 'fs'
import path from 'path'
import headJSON from './head.js'

fs.rmSync('./dist', { recursive: true, force: true })

const doc = (head, body) => `
<!DOCTYPE html>
<html lang="en-us">
${head.trim()}
${body.trim()}
</html>`

const head = `
<!-- Built ${new Date().toLocaleDateString()} -->
<head>
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
        .join('\n\t')
    )
    .join('\n\t')}
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
      fs.writeFileSync(filename, doc(head, body).trim(), {
        encoding: 'utf8',
      })
    }
  }
}

fs.mkdirSync('./dist')

var copy = function (srcDir, dstDir) {
  var results = []
  var list = fs.readdirSync(srcDir)
  var src, dst
  list.forEach(function (file) {
    src = srcDir + '/' + file
    dst = dstDir + '/' + file
    var stat = fs.statSync(src)
    const exclusions = [
      '.git',
      '.gitignore',
      'bin.js',
      'dist',
      'node_modules',
      'package-lock.json',
      'package.json',
    ]
    if (!exclusions.includes(file)) {
      if (stat && stat.isDirectory()) {
        try {
          console.log('creating dir: ' + dst)
          fs.mkdirSync(dst)
        } catch (e) {
          console.log('directory already exists: ' + dst)
        }
        results = results.concat(copy(src, dst))
      } else {
        try {
          console.log('copying file: ' + dst)
          fs.writeFileSync(dst, fs.readFileSync(src))
        } catch (e) {
          console.log("could't copy file: " + dst)
        }
        results.push(src)
      }
    }
  })
  return results
}

copy('./', './dist')
buildHTML('./dist/', 'index.html')
