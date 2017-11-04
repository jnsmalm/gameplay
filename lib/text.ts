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
import { Color } from "./color"

export class FontGlyph {
  constructor(readonly advance: number, readonly source: Rectangle,
    readonly offset: Vector2) { }
}

/**
 * Represents a texture with font glyphs used when drawing text.
 */
export class FontTexture extends Texture2D {
  private _fontInfo: stbtt.FontInfo
  private _buffer: Buffer

  readonly pixelHeightScale: number
  readonly glyphs: {
    [char: string]: FontGlyph
  } = {}

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

    let codepoints = chars.split("").map(x => x.charCodeAt(0))
    let ranges = [{
      unicodeCodepoints: new Int32Array(codepoints),
      fontSize: pixelHeight,
      numChars: codepoints.length
    }]
    let bitmap = new Uint8Array(this.width * this.height)
    let context = stbtt.packBegin(bitmap, this.width, this.height, 0, 1)

    // Because we only use a single pack range, we only get back a single 
    // packed char array.
    let packed = stbtt.packFontRanges(context, this._buffer, 0, ranges)[0]
    stbtt.packEnd(context)

    // Convert to RGBA to be able to render with sprite batch shader.
    this.setData(this.convertToRGBA(bitmap))

    for (let i = 0; i < packed.length; i++) {
      let pc = packed[i]
      this.glyphs[chars[i]] = new FontGlyph(pc.xadvance,
        new Rectangle(pc.x0, pc.y0, pc.x1 - pc.x0, pc.y1 - pc.y0), 
        new Vector2(pc.xoff, pc.yoff))
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
    return stbtt.getCodepointKernAdvance(this._fontInfo,
      ch1.charCodeAt(0), ch2.charCodeAt(0)) * this.pixelHeightScale
  }

  private convertToRGBA(bitmapData: Uint8Array) {
    let rgba = new Uint8Array(bitmapData.length * 4)
    rgba.fill(255)
    for (let i = 0; i < bitmapData.length; i++) {
      rgba[3 + i * 4] = bitmapData[i]
    }
    return rgba
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

  /**
   * The color of the text.
   */
  color = new Color(0.1, 0.1, 0.1, 1) 

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
      let glyph = this.font.glyphs[this._text[i]]
      if (glyph) {
        width += glyph.advance
      }
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
      let glyph = this.font.glyphs[this._text[i]]
      if (!glyph) {
        continue
      }
      let kerning = i < this._text.length - 1 ?
        this.font.getKerning(this._text[i], this._text[i + 1]) : 0

      this.setupSpriteAsGlyph(this.sprites[i], glyph,
        new Vector2(position.x + glyph.offset.x, position.y))
      position.x += glyph.advance + kerning
    }
  }

  private setupSpriteAsGlyph(sprite: Sprite, glyph: FontGlyph, position: Vector2) {
    sprite.pixelsPerUnit = this.pixelsPerUnit
    sprite.color = this.color
    sprite.source = glyph.source
    sprite.transform.localPosition.x = position.x / this.pixelsPerUnit
    sprite.transform.localPosition.y =
      position.y - glyph.offset.y / this.pixelsPerUnit
    sprite.transform.parent = this.transform
    sprite.origin = new Vector2(0, 0)
  }
}