declare module "gameplay/truetype" {
  class FontInfo { }
  function findGlyphIndex(fontInfo: FontInfo, codepoint: number): number
  function initFont(buffer: ArrayBufferView): FontInfo
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
  function scaleForPixelHeight(fontInfo: FontInfo, pixels: number): number
}