declare module "gameplay/stb-image" {
  function load(filepath: string): { 
    channels: number
    width: number
    height: number
    data: Uint8Array
  }
}