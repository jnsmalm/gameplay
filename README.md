# Gameplay.js

[![Build Status](https://travis-ci.org/jnsmalm/gameplay.svg?branch=develop)](https://travis-ci.org/jnsmalm/gameplay)

Gameplay.js is a library for creating native desktop games with JavaScript. It 
includes bindings to low level APIs for drawing graphics, playing sounds and 
handling input. Gameplay.js doesn't use HTML5 or run inside a web browser, 
instead it runs as a native application using Node.js.

## Building

To build from source, Node.js need to be installed. Two modules, TypeScript and Cmake.js needs to be installed globally as well.

```
$ npm install -g typescript
$ npm install -g cmake-js
```

Before compiling the script to JavaScript (it's written in TypeScript), some 
other modules need to be installed as well with `$ npm install`. Compile the 
build script to JavaScript with `$ tsc`.

When the build script has been compiled, start building with `$ node build`.