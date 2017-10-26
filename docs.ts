import * as glob from "glob"
import * as fs from "fs"
import * as path from "path"

glob("docs/**/*.ts", (err, files: string[]) => {
  for (let file of files) {
    markdown(`${__dirname}/${file}`)
  }
})

function parse(s: string) {
  return {
    comnts: s.match(/\/\*([\s\S]*?)\*\//g),
    blocks: s.split(/\/\*([\s\S]*?)\*\//g).filter((s) => {
      return s
    })
  }
}

function code(s: string, lang: string) {
  let tick = "```"
  let beg = s.match(/\n./)[0]
  let end = s.match(/.\n/g).slice(-1)[0]
  let xxx = before(s, beg, `\n${tick+lang}`)
  let tst = after(xxx, end, `\n${tick}`)
  return tst
}

function before(str: string, find: string, txt: string) {
  let i = str.indexOf(find)
  let a = str.slice(0, i)
  let b = str.slice(i)
  return a + txt + b
}

function after(str: string, find: string, txt: string) {
  let i = str.lastIndexOf(find)
  let a = str.slice(0, i + 1)
  let b = str.slice(i + 1)
  return a + txt + b
}

function markdown(filepath: string) {
  fs.readFile(filepath, "utf-8", (err, data) => {
    let parsed = parse(data)

    let docs = ""
    let lang = "javascript"
    
    for (let i = 0; i < parsed.blocks.length; i++) {
      let isComment = false
      for (let c of parsed.comnts) {
        if (c.includes(parsed.blocks[i])) {
          isComment = true
          break
        }
      }
      if (isComment) {
        docs += parsed.blocks[i]
      } else {
        docs += code(parsed.blocks[i], lang)
      }
    }
    let dir = path.dirname(filepath)
    
    fs.writeFile(`${dir}/${path.basename(
      filepath, path.extname(filepath))}.md`, docs, () => {})
  })
}