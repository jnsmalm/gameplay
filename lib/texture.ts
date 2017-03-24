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

import * as gl from "gameplay/gl"
import * as stb_image from "gameplay/stb-image"

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

/** Represents a 2d grid of texels. */
export class Texture2D {
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
    let image = stb_image.load(filepath)
    if (!image) {
      throw new TypeError(`Failed to load image "${filepath}"`)
    }
    let format = TextureFormat.RGB
    if (image.channels === 4) {
      format = TextureFormat.RGBA
    }
    let texture = new Texture2D(
      image.width, image.height, format, TextureDataType.UnsignedByte)
    texture.setData(image.data)
    return texture
  }

  /** Uses this texture when drawing. */
  use() {
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
  }

  private useTemporary(usage: () => void) {
    let binding = gl.getParameter(gl.TEXTURE_BINDING_2D)
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
    usage()
    gl.bindTexture(gl.TEXTURE_2D, binding)
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