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
    readonly source: Rectangle, readonly offset: Vector2,
    readonly leftSideBearing: number) {
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
  private _fontInfo: stbtt.FontInfo
  private _buffer: Buffer

  readonly ascent: number
  readonly descent: number
  readonly glyphs: { [char: string]: FontGlyph }
  readonly pixelHeightScale: number

  /**
   * Creates a new font texture.
   * @param fontPath Filepath to the truetype font.
   * @param pixelHeight Height in pixels of the font.
   * @param chars String of characters which can be used when drawing text with 
   * the font.
   */
  constructor(fontPath: string, readonly pixelHeight: number, chars = Text.alphaNumeric) {
    super(1024, 1024, TextureFormat.RGBA, TextureDataType.UnsignedByte)

    this._buffer = fs.readFileSync(fontPath)
    this._fontInfo = stbtt.initFont(this._buffer)

    this.pixelHeightScale =
      stbtt.scaleForPixelHeight(this._fontInfo, pixelHeight)
    this.glyphs = {}
    let fontMetrics = stbtt.getFontVMetrics(this._fontInfo)

    this.ascent = fontMetrics.ascent * this.pixelHeightScale
    this.descent = fontMetrics.descent * this.pixelHeightScale

    let glyphPacker = new GlyphPacker()
    for (let char of chars) {
      this.createGlyph(char, glyphPacker)
    }
  }

  /**
   * Returns the kerning between two characters.
   * @param ch1 First character.
   * @param ch2 Second character.
   */
  getKerning(ch1: string, ch2: string) {
    if (ch1 === " " || ch2 === " ") {
      return 0
    }
    let glyph1 = this.glyphs[ch1].index
    let glyph2 = this.glyphs[ch2].index
    return stbtt.getGlyphKernAdvance(
      this._fontInfo, glyph1, glyph2) * this.pixelHeightScale
  }

  private convertToRGBA(bitmapData: Uint8Array) {
    let rgba = []
    for (let i = 0; i < bitmapData.length; i++) {
      rgba.push(255, 255, 255, bitmapData[i])
    }
    return new Uint8Array(rgba)
  }

  private createGlyph(char: string, packer: GlyphPacker) {
    let index = stbtt.findGlyphIndex(this._fontInfo, char.charCodeAt(0))
    if (index === 0) {
      throw new TypeError(`Failed to find glyph index for \"${char}\".`)
    }
    let bitmap = stbtt.getGlyphBitmap(
      this._fontInfo, 0, this.pixelHeightScale, index)
    let position = packer.getGlyphPosition(bitmap.width, bitmap.height)
    let source = new Rectangle(
      position.x, position.y, bitmap.width, bitmap.height)

    this.setSubData(position.x, position.y,
      bitmap.width, bitmap.height, this.convertToRGBA(bitmap.data))

    let metrics = stbtt.getGlyphHMetrics(this._fontInfo, index)
    let advanceWidth = metrics.advanceWidth * this.pixelHeightScale
    let offset = new Vector2(bitmap.xoff, bitmap.yoff)

    this.glyphs[char] = new FontGlyph(index, advanceWidth, source, offset,
      metrics.leftSideBearing * this.pixelHeightScale)
  }
}

export enum TextHorizontalAlign {
  Center,
  Left,
  Right,
}

export class Text implements Component {
  private _wordSpacing = 1
  private _horizontalAlign = TextHorizontalAlign.Center

  sprites: Sprite[] = []
  transform = new Transform()
  pixelsPerUnit = 100

  constructor(public font: FontTexture, public spriteBatch: SpriteBatch, private _text: string = "") {
    this.setupSprites()
  }

  /**
   * Returns the alpha numeric characters A-Z, a-z and 0-9.
   */
  static get alphaNumeric() {
    return "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789"
  }

  /**
   * The spacing between words.
   */
  get wordSpacing() {
    return this._wordSpacing
  }

  set wordSpacing(wordSpacing: number) {
    this._wordSpacing = wordSpacing
    this.setupSprites()
  }

  /**
   * The text string to draw.
   */
  get text() {
    return this._text
  }

  set text(text: string) {
    this._text = text
    this.setupSprites()
  }

  get horizontalAlign() {
    return this._horizontalAlign
  }

  set horizontalAlign(horizontalAlign: TextHorizontalAlign) {
    this._horizontalAlign = horizontalAlign
    this.setupSprites()
  }

  attach(transform: Transform) {
    this.transform.parent = transform
  }

  /**
   * Returns the width of the text.
   */
  get width() {
    let width = 0
    for (let i = 0; i < this._text.length; i++) {
      if (this._text[i] === " ") {
        width += this.wordSpacingWidth
        continue
      }
      width += this.font.glyphs[this._text[i]].advanceWidth
    }
    return width
  }

  draw() {
    for (let i = 0; i < this._text.length; i++) {
      if (this._text[i] === " ") {
        continue
      }
      this.spriteBatch.add(this.sprites[i])
    }
  }

  private get wordSpacingWidth() {
    return this.font.pixelHeight * 0.25 * this._wordSpacing
  }

  private setupSprites() {
    for (let i = this.sprites.length; i < this._text.length; i++) {
      this.sprites.push(new Sprite(this.spriteBatch, this.font))
    }
    let position = new Vector2()
    switch (this._horizontalAlign) {
      case TextHorizontalAlign.Center: {
        position.x = -this.width / 2
        break
      }
      case TextHorizontalAlign.Right: {
        position.x = -this.width
        break
      }
    }
    for (let i = 0; i < this._text.length; i++) {
      if (this._text[i] === " ") {
        position.x += this.wordSpacingWidth
        continue
      }
      let kerning = i < this._text.length - 1 ?
        this.font.getKerning(this._text[i], this._text[i + 1]) : 0

      let glyph = this.font.glyphs[this._text[i]]
      let p = new Vector2(position.x + glyph.offset.x, position.y)

      this.setupSpriteAsGlyph(this.sprites[i], glyph, p)
      position.x += glyph.advanceWidth + kerning
    }
  }

  private setupSpriteAsGlyph(
    sprite: Sprite, glyph: FontGlyph, position: Vector2) {
    sprite.origin = new Vector2(0, 0)
    sprite.pixelsPerUnit = this.pixelsPerUnit
    sprite.source = glyph.source
    sprite.transform.localPosition.x = position.x / this.pixelsPerUnit
    sprite.transform.localPosition.y =
      position.y - glyph.offset.y / this.pixelsPerUnit
  }
}