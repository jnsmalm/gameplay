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

import * as stbtt from "gameplay/truetype"
import * as fs from "fs"

import { Vector2 } from "./math"
import { Texture2D, TextureDataType, TextureFormat } from "./texture"
import { Sprite, SpriteBatch, Rectangle } from "./sprite"
import { Component } from "./entity"
import { Transform } from "./transform"

class FontGlyph {
  constructor(readonly index: number, readonly advanceWidth: number,
    readonly source: Rectangle, readonly offset: Vector2) {
  }
}

class GlyphPacker {
  nextPosition = new Vector2()
  maxRowHeight = 0

  getGlyphPosition(width: number, height: number) {
    let position = new Vector2();
    position.set(this.nextPosition)
    if (position.x + width > 1024) {
      position.set([0, position.y + this.maxRowHeight + 1])
      this.maxRowHeight = 0
      this.nextPosition.set(position)
    }
    if (position.y + height > 1024) {
      throw new TypeError("Failed to fit glyph characters.")
    }
    this.nextPosition.x += width + 1
    this.maxRowHeight = Math.max(height, this.maxRowHeight)
    return position
  }
}

/**
 * Represents a texture with font glyphs used when drawing text.
 */
export class FontTexture extends Texture2D {
  readonly fontInfo: stbtt.FontInfo
  readonly buffer: Buffer
  readonly glyphs: { [char: string]: FontGlyph }
  readonly pixelHeightScale: number
  readonly ascent: number
  readonly descent: number

  /**
   * Creates a new font texture.
   * @param fontPath Filepath to the truetype font.
   * @param pixelHeight Height in pixels of the font.
   * @param chars String of characters which can be used when drawing text with 
   * the font.
   */
  constructor(fontPath: string, readonly pixelHeight: number, chars: string) {
    super(1024, 1024, TextureFormat.RGBA, TextureDataType.UnsignedByte)

    this.buffer = fs.readFileSync(fontPath)
    this.fontInfo = stbtt.initFont(this.buffer)
    this.pixelHeightScale =
      stbtt.scaleForPixelHeight(this.fontInfo, pixelHeight)
    this.glyphs = {}
    let fontMetrics = stbtt.getFontVMetrics(this.fontInfo)

    this.ascent = fontMetrics.ascent * this.pixelHeightScale
    this.descent = fontMetrics.descent * this.pixelHeightScale

    let glyphPacker = new GlyphPacker()
    for (let char of chars) {
      this.createGlyph(char, glyphPacker)
    }
  }

  /**
   * Returns the alpha numeric characters A-Z, a-z and 0-9.
   */
  static get alphaNumeric() {
    return "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789"
  }

  /**
   * Returns the width of a text.
   * @param text Text used for calculating the width.
   */
  getWidth(text: string) {
    let width = 0
    for (let i = 0; i < text.length; i++) {
      let glyph = this.glyphs[text[i]]
      if (i < text.length - 1) {
        width += glyph.advanceWidth - glyph.offset.x
      } else {
        width += glyph.source.width
      }
    }
    return width
  }

  /**
   * Returns the kerning between two characters.
   * @param ch1 First character.
   * @param ch2 Second character.
   */
  getKerning(ch1: string, ch2: string) {
    let glyph1 = this.glyphs[ch1].index
    let glyph2 = this.glyphs[ch2].index
    let a = stbtt.getGlyphKernAdvance(
      this.fontInfo, glyph1, glyph2) * this.pixelHeightScale
    return a
  }

  private convertToRGBA(bitmapData: Uint8Array) {
    let rgba = []
    for (let i = 0; i < bitmapData.length; i++) {
      rgba.push(255, 255, 255, bitmapData[i])
    }
    return new Uint8Array(rgba)
  }

  private createGlyph(char: string, packer: GlyphPacker) {
    let index = stbtt.findGlyphIndex(this.fontInfo, char.charCodeAt(0))
    if (index === 0) {
      throw new TypeError(`Failed to find glyph index for \"${char}\".`)
    }
    let bitmap = stbtt.getGlyphBitmap(
      this.fontInfo, 0, this.pixelHeightScale, index)
    let position = packer.getGlyphPosition(bitmap.width, bitmap.height)
    let source = new Rectangle(
      position.x, position.y, bitmap.width, bitmap.height)

    this.setSubData(position.x, position.y,
      bitmap.width, bitmap.height, this.convertToRGBA(bitmap.data))

    let metrics = stbtt.getGlyphHMetrics(this.fontInfo, index)
    let advanceWidth = metrics.advanceWidth * this.pixelHeightScale
    let offset = new Vector2(bitmap.xoff, bitmap.yoff)

    this.glyphs[char] = new FontGlyph(index, advanceWidth, source, offset)
  }
}

export enum TextHorizontalAlign {
  Center,
  Left,
  Right,
}

export class Text implements Component {
  private _horizontalAlign = TextHorizontalAlign.Center

  sprites: Sprite[] = []
  transform = new Transform()
  pixelsPerUnit = 100

  constructor(public font: FontTexture,
      public spriteBatch: SpriteBatch, private _text: string = "") {
    this.setupSprites()
  }

  get text() {
    return this._text
  }

  set text(text: string) {
    this._text = text
    this.setupSprites()
  }

  set horizontalAlign(horizontalAlign: TextHorizontalAlign) {
    this._horizontalAlign = horizontalAlign
    this.setupSprites()
  }

  attach(transform: Transform) {
    this.transform.parent = transform
  }

  draw() {
    for (let i = 0; i < this._text.length; i++) {
      this.spriteBatch.add(this.sprites[i])
    }
  }

  private getFirstSpritePosition() {
    let x = 0
    switch (this._horizontalAlign) {
      case TextHorizontalAlign.Center: {
        x = -this.font.getWidth(this._text) / 2
        break
      }
      case TextHorizontalAlign.Right: {
        x = -this.font.getWidth(this._text)
        break
      }
    }
    return new Vector2(x / this.pixelsPerUnit, 0)
  }

  private setupSprites() {
    for (let i = this.sprites.length; i < this._text.length; i++) {
      this.sprites.push(new Sprite(this.spriteBatch, this.font))
    }
    let position = this.getFirstSpritePosition()
    for (let i = 0; i < this._text.length; i++) {
      let kerning = i < this._text.length - 1 ? 
        this.font.getKerning(this._text[i], this._text[i + 1]) : 0
      let glyph = this.font.glyphs[this._text[i]]
      let advance = glyph.advanceWidth - glyph.offset.x + kerning

      this.setupSpriteAsGlyph(this.sprites[i], glyph, position)
      position.x += advance / this.pixelsPerUnit
    }
  }

  private setupSpriteAsGlyph(
      sprite: Sprite, glyph: FontGlyph, position: Vector2) {
    sprite.origin = new Vector2(0, 0)
    sprite.pixelsPerUnit = this.pixelsPerUnit
    sprite.source = glyph.source
    sprite.transform.localPosition.x = position.x
    sprite.transform.localPosition.y = 
      position.y - glyph.offset.y / this.pixelsPerUnit
  }
}