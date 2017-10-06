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

import * as process from "process"

process.on("exit", (code) => {
  openal.destroyContext(context)
  openal.closeDevice(device)
});

import * as vorbis from "gameplay/vorbis"
import * as openal from "gameplay/openal"

let device = openal.openDevice()
let context = openal.createContext(device)
openal.makeContextCurrent(context)

export enum SoundFormat {
  Mono16 = openal.FORMAT_MONO16,
  Mono8 = openal.FORMAT_MONO8,
  Stereo16 = openal.FORMAT_STEREO16,
  Stereo8 = openal.FORMAT_STEREO8,
}

export enum SoundState {
  Initial = openal.INITIAL,
  Playing = openal.PLAYING,
  Paused = openal.PAUSED,
  Stopped = openal.STOPPED,
}

export class SoundBuffer {
  readonly buffer: number

  /**
   * Creates a new sound buffer.
   */
  constructor(format: SoundFormat, data: ArrayBufferView, rate: number) {
    this.buffer = openal.createBuffer()
    openal.bufferData(this.buffer, format, data, rate)
  }

  /**
   * Creates a new sound buffer from a ogg vorbis file.
   */
  static createFromVorbisFile(filepath: string) {
    let data = vorbis.decodeFilename(filepath)
    return new SoundBuffer(data.channels == 2 ? 
      SoundFormat.Stereo16 : SoundFormat.Mono16, data.data, data.rate)
  }
}

export class SoundSource {
  private source: number

  /**
   * Creates a new sound source.
   */
  constructor(readonly buffer: SoundBuffer) {
    this.source = openal.createSource()
    openal.sourcei(this.source, openal.BUFFER, this.buffer.buffer)
  }

  /**
   * Gets or sets the gain.
   */
  get gain() {
    return openal.getSourcef(this.source, openal.GAIN)
  }

  set gain(gain: number) {
    openal.sourcef(this.source, openal.GAIN, gain)
  }

  /**
   * Pauses the playing sound.
   */
  pause() {
    openal.sourcePause(this.source)
  }

  /**
   * Playes the sound.
   */
  play() {
    openal.sourcePlay(this.source)
  }

  /**
   * Returns the current state of the sound.
   */
  get state() {
    return <SoundState>openal.getSourcei(this.source, openal.SOURCE_STATE)
  }

  /**
   * Stops playing the sound.
   */
  stop() {
    openal.sourceStop(this.source)
  }

  /**
   * Gets or sets the pitch.
   */
  get pitch() {
    return openal.getSourcef(this.source, openal.PITCH)
  }

  set pitch(pitch: number) {
    openal.sourcef(this.source, openal.PITCH, pitch)
  }
}