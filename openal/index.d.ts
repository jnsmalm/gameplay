declare module "gameplay/openal" {
  function bufferData(
    buffer: number, format: number, data: ArrayBufferView, rate: number): void
  function closeDevice(device: number): void
  function createBuffer(): number
  function createContext(): number
  function createSource(): number
  function destroyContext(context: number): void
  function getError(): number
  function getSourcei(source: number, param: number): number
  function makeContextCurrent(context: number): void
  function openDevice(): number
  function source3f(
    source: number, format: number, v0: number, v1: number, v2: number): void
  function sourcef(source: number, format: number, v0: number): void
  function sourcei(source: number, format: number, buffer: number): void
  function sourcePause(source: number): void
  function sourcePlay(source: number): void
  function sourceStop(source: number): void
}