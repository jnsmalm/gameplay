# Playing sounds

> OpenAL (Open Audio Library) is a cross-platform audio API, used by the 
framework for playing sounds. Although it's low level functionality can be 
accessed directly in the framework, there are higher level abstractions 
available that can be used more easily.

```javascript
import * as $ from "gameplay/lib"
```

First, a `SoundBuffer` object needs to be created to load PCM audio data into 
memory.

## Load from memory

```javascript
function generateSoundBuffer(seconds: number, freq: number, rate: number) {
  let samples = []
  for (let i = 0; i < seconds * rate; i++) {
    samples[i] = 32760 * Math.sin((2 * Math.PI * freq) / rate * i)
  }
  return new $.SoundBuffer($.SoundFormat.Mono16, new Uint16Array(samples), rate)
}
```

In this example, we are generating an array of samples containing a sine wave 
of audio data. The function generates the samples which are then used for 
creating the `SoundBuffer`. Use the function like below to generate a 2 seconds 
long audio stream.

```javascript
let buffer = generateSoundBuffer(2, 440, 22050)
```

## Load from file

Often, you will want to load the sound from a file rather then directly from 
memory. Vorbis is an audio compression format which can be loaded using 
`Vorbis.createSoundBuffer`.

```javascript
let buffer = $.Vorbis.createSoundBuffer(
  __dirname + "/../_content/eric-skiff/come-and-find-me.ogg")
```

If the sound file you want to load is not in the vorbis format, you can use 
the [FFmpeg](https://www.ffmpeg.org) tool to convert it. For example, use the 
following command to convert a wav file *input.wav* to a ogg vorbis file 
*output.ogg*:

```
$ ffmpeg -i input.wav -acodec libvorbis output.ogg
```

## Playing from buffer

In order to actually output the `SoundBuffer` to the playback device, we need 
to create a `SoundSource`. Many `SoundSource` objects can be created which 
outputs the same `SoundBuffer`.

```javascript
let source = new $.SoundSource(buffer)
```

Start playing with `play()`. To further control the audio you can use `stop()` 
and `pause()`. You can also use `volume` and `pitch` to adjust the sound.

```javascript
$.Game.update = () => {
  let keys = $.Game.window.input.keys
  if (keys[$.KeyCode.P] === $.InputState.Pressed) {
    if (source.state === $.SoundState.Playing) {
      source.pause()
    } else {
      source.play()
    }
  }
  if (keys[$.KeyCode.S] === $.InputState.Pressed) {
    source.stop()
  }
}
```

We need to initialize the game to create a window. Let's also draw some 
instruction text so the user knows how to control the music.

```javascript
$.Game.init()

let camera = $.Camera.createDefault($.Game.window)
let sbatch = new $.SpriteBatch(camera)

$.Game.draw = () => {
  uitext.draw()
  sbatch.draw()
}

let roboto = new $.FontTexture(__dirname + "/../_content/roboto/roboto-thin.ttf",
  50, $.Text.alphaNumeric + "()/")
let uitext = new $.Text(
  roboto, sbatch, "Press (P) to play/pause and (S) to stop")
```
