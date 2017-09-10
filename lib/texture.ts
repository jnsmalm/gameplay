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

import * as gl from "gameplay/opengl"
import * as image from "gameplay/image"

export enum TextureFormat {
  RGB = gl.RGB,
  RGBA = gl.RGBA
}

export enum TextureDataType {
  Float = gl.FLOAT,
  UnsignedByte = gl.UNSIGNED_BYTE
}

export enum TextureFilter {
  Linear = gl.LINEAR,
  Nearest = gl.NEAREST
}

export enum TextureWrap {
  Repeat = gl.REPEAT,
  ClampToEdge = gl.CLAMP_TO_EDGE
}

export enum TextureUnit {
  Texture0 = gl.TEXTURE0,
  Texture1 = gl.TEXTURE1,
  Texture2 = gl.TEXTURE2,
  Texture3 = gl.TEXTURE3,
  Texture4 = gl.TEXTURE4,
  Texture5 = gl.TEXTURE5,
  Texture6 = gl.TEXTURE6,
  Texture7 = gl.TEXTURE7,
}

/** Represents a 2d grid of texels. */
export class Texture2D {
  private static currentBindings: { [unit: number]: number } = {}

  readonly texture: number

  /** Creates a new texture2d. */
  constructor(readonly width: number, readonly height: number, 
      readonly format: TextureFormat, readonly dataType: TextureDataType,
      readonly internalFormat = format) {
    this.texture = gl.createTexture()
    this.setData(null)
    this.setFilter(TextureFilter.Linear)
    this.setWrap(TextureWrap.Repeat)
  }

  /** Creates a new texture2d from file. */
  static createFromFile(filepath: string) {
    let img = image.load(filepath)
    if (!img) {
      throw new TypeError(`Failed to load image "${filepath}"`)
    }
    let format = TextureFormat.RGB
    if (img.channels === 4) {
      format = TextureFormat.RGBA
    }
    let texture = new Texture2D(
      img.width, img.height, format, TextureDataType.UnsignedByte)
    texture.setData(img.data)
    return texture
  }

  /** Uses this texture when drawing. */
  use(unit: TextureUnit = TextureUnit.Texture0) {
    if (this.texture === Texture2D.currentBindings[unit]) {
      return
    }
    Texture2D.currentBindings[unit] = this.texture
    gl.activeTexture(unit)
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
  }

  private useTemporary(usage: () => void) {
    if (this.texture === Texture2D.currentBindings[TextureUnit.Texture0]) {
      usage()
    } else {
      gl.bindTexture(gl.TEXTURE_2D, this.texture)
      usage()
      gl.bindTexture(gl.TEXTURE_2D, 
        Texture2D.currentBindings[TextureUnit.Texture0])
    }
  }

  /** Sets the texture filter mode. */
  setFilter(value: TextureFilter) {
    this.useTemporary(() => {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, value)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, value)
    })
  }

  /** Sets the texture wrapping mode. */
  setWrap(value: TextureWrap) {
    this.useTemporary(() => {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, value);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, value);
    })
  }

  /** Sets the data for the texture. */
  setData(data: ArrayBufferView) {
    this.useTemporary(() => {
      gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, this.width, 
        this.height, 0, this.format, this.dataType, data)
    })
  }

  /** Sets the data for the texture. */
  setSubData(xoffset: number, yoffset: number, width: number, height: number, 
      data: ArrayBufferView) {
    this.useTemporary(() => {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, 
        height, this.format, this.dataType, data)
    })
  }
}