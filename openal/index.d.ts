declare module "gameplay/openal" {
  function closeDevice(device: number): void
  function createContext(): number
  function destroyContext(context: number): void
  function makeContextCurrent(context: number): void
  function openDevice(): number
}