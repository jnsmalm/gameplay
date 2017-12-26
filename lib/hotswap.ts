/*The MIT License (MIT)

Copyright (c) 2017 Jens Malmborg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

import * as fs from "fs"

interface Initializable {
  init?(): void
}

export module HotSwap {
  const objects: {
    [filepath: string]: Initializable[]
  } = {}
  const exports: {
    [filepath: string]: any
  } = {}

  /**
   * Function called when file has been changed.
   */
  export let fileChanged: (filepath: string, error: any) => void

  /**
   * Enables an object to swap prototype at runtime when the file changes.
   * @param object Object to enable hot swap.
   * @param module Module the objects prototype is exported from.
   */
  export function enable(object: object, module: NodeModule) {
    let filepath = module.filename

    if (!exports[filepath]) {
      let ctime: number
      fs.watch(filepath, { persistent: false }, () => {
        fs.stat(filepath, (err, stats) => {
          if (err) {
            return
          }
          // This is a fix for those times when the watcher gets called twice
          // in a row for the same file change.
          if (stats.ctime.getTime() !== ctime) {
            changed(filepath)
          }
          ctime = stats.ctime.getTime()
        })
      })
      exports[filepath] = module.exports
    }
    if (!objects[filepath]) {
      objects[filepath] = []
    }
    if (objects[filepath].indexOf(object) >= 0) {
      return
    }
    let ctor = object.constructor.name
    if (!exports[filepath][ctor]) {
      throw new TypeError(
        `Could not find constructor "${ctor}" in module "${filepath}", maybe you forgot to export it?`)
    }
    Object.setPrototypeOf(object, exports[filepath][ctor].prototype)
    objects[filepath].push(object)

    try {
      let initializable = <Initializable>object
      if (initializable.init) {
        initializable.init()
      }
    } catch (err) {
      if (HotSwap.fileChanged) {
        HotSwap.fileChanged(filepath, err)
      } else {
        throw err
      }
    }
  }

  function changed(filepath: string) {
    try {
      delete require.cache[require.resolve(filepath)]
      exports[filepath] = require(filepath)

      for (let object of objects[filepath]) {
        let ctor = object.constructor.name
        if (!exports[filepath][ctor]) {
          throw new TypeError(
            `Could not find constructor "${ctor}", maybe you changed the name?`)
        }
        Object.setPrototypeOf(object, exports[filepath][ctor].prototype)
        if (object.init) {
          object.init()
        }
      }
      if (HotSwap.fileChanged) {
        HotSwap.fileChanged(filepath, undefined)
      }
    } catch (err) {
      if (HotSwap.fileChanged) {
        HotSwap.fileChanged(filepath, err)
      } else {
        throw err
      }
      return
    }
  }
}