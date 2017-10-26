declare module "gameplay/truetype" {
  class PackContext { }
  class FontInfo { }

  interface PackRange {
    fontSize: number
    firstUnicodeCodepointInRange?: number
    unicodeCodepoints?: Int32Array
    numChars: number
  }

  interface PackedChar {
    x0: number
    x1: number
    xadvance: number
    xoff: number
    y0: number
    y1: number
    yoff: number
  }

  function findGlyphIndex(fontInfo: FontInfo, codepoint: number): number
  function initFont(buffer: ArrayBufferView): FontInfo
  function packBegin(buffer: ArrayBufferView,  width: number, height: number, 
    strideInBytes: number, padding: number): PackContext
  function packFontRanges(context: PackContext, buffer: ArrayBufferView, 
    fontIndex: number, arr: PackRange[]): Array<Array<PackedChar>>
  function packEnd(context: PackContext): void
  function getGlyphBitmap(
    fontInfo: FontInfo, scale_x: number, scale_y: number, glyph: number): {
      width: number,
      height: number,
      xoff: number,
      yoff: number,
      data: Uint8Array
    }
  function getFontVMetrics(fontInfo: FontInfo): {
    descent: number,
    ascent: number,
    lineGap: number
  }
  function getGlyphHMetrics(fontInfo: FontInfo, glyph: number): {
    advanceWidth: number,
    leftSideBearing: number
  }
  function getGlyphKernAdvance(
    fontInfo: FontInfo, glyph1: number, glyph2: number): number
  function getCodepointKernAdvance(
    fontInfo: FontInfo, ch1: number, ch2: number): number
  function scaleForPixelHeight(fontInfo: FontInfo, pixels: number): number
}