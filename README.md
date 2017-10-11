# Gameplay.js

[![Build Status](https://travis-ci.org/jnsmalm/gameplay.svg?branch=develop)](https://travis-ci.org/jnsmalm/gameplay)
[![Build status](https://ci.appveyor.com/api/projects/status/evxuhc1m502glsbw/branch/develop?svg=true)](https://ci.appveyor.com/project/jnsmalm/gameplay-mxc0a/branch/develop)

Gameplay.js is a library for creating native desktop games with JavaScript. 
It includes bindings to low level APIs for drawing graphics, playing sounds and 
handling input. Gameplay.js doesn't use HTML5 or run inside a web browser, 
instead it runs as a native application using Node.js.

## Getting started

- [Getting started](docs/getting-started/getting-started.md) - Get started and 
create a spinning 3D cube

## Documentation

The documentation is written like tutorials which are generated from actual 
source code. The code is written in TypeScript, which should be simple to 
convert into plain JavaScript if you would prefer that.

- [Game loop](docs/game-loop/game-loop.md) - Learn about the game loop and how you 
can easily use it 
- [2D sprites](docs/2d-sprites/2d-sprites.md) - Draw 2D sprites
- [Drawing graphics](docs/drawing-graphics/drawing-graphics.md) - Using vertex 
specification and shaders for drawing graphics
- [Playing sounds](docs/playing-sounds/playing-sounds.md) - Using buffer and source for 
playing sounds
- [Text/input](docs/text-input/text-input.md) - Draw text and handle input
- [Entity/component](docs/entity-component/entity-component.md) - How to use the 
entity-component design pattern for structure

#### Running tutorials

All the tutorials are applications that can run. For example, use the gameplay 
script to run the *2d-sprites* application:

```
% ./gameplay docs/2d-sprites/2d-sprites.js
```

## Build from source

To build Gameplay.js from source, Node.js need to be installed. Two modules, 
TypeScript and Cmake.js needs to be installed globally as well.

```
$ npm install -g typescript
$ npm install -g cmake-js
```

Before compiling the script to JavaScript (it's written in TypeScript), some 
other modules need to be installed with `$ npm install`. Compile the build 
script to JavaScript with `$ tsc`.

When the build script has been compiled, start building with `$ node build`.