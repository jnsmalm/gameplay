declare module "gameplay/vorbis" {
  function decodeFilename(filepath: string): { 
    channels: number
    rate: number
    data: Int16Array
  }
}