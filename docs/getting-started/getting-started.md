# Getting started

Download the [latest version](https://github.com/jnsmalm/gameplay/releases/latest) 
of Gameplay.js and extract the files wherever you choose. Create a new file 
*cube3d.js* in the same folder.

*cube3d.js*

```javascript
const $ = require("gameplay/lib")

$.Game.init()

let camera = $.Camera.createDefault($.Game.window)
let shader = new $.BasicShader()
let cube3d = $.Assimp.createModelFromFile(__dirname + "/assets/cube3d.json", shader)

$.Game.draw = () => {
  shader.setView(camera.getView())
  shader.setProjection(camera.getProjection())
  cube3d.draw();
}

$.Game.update = () => {
  cube3d.transform.localRotation.rotateX(2)
  cube3d.transform.localRotation.rotateY(1)
}
```

Download <a href="http://www.gameplayjs.com/cube3d.json" download>cube3d.json</a> 
(right-click and select download/save) to a folder named "assets". Run the 
application with Gameplay.js (which uses the bundled Node.js runtime). If 
everything has gone well you should see a spinning 3D cube.

```
% ./gameplay cube3d.js
```

## TypeScript

> TypeScript is a free and open-source programming language developed and 
maintained by Microsoft. It is a strict superset of JavaScript, and adds optional 
static typing and class-based object-oriented programming to the language. 
Learn more about it at https://www.typescriptlang.org

It's recommended that you use TypeScript instead of JavaScript for several 
reasons:

- Really good code completion and intellisense
- Flexible as JavaScript but with optionally static type checks
- Catch many errors before running your application

To run the above example in TypeScript you need to download the 
[latest version](https://www.typescriptlang.org/#download-links) of TypeScript. 
It's also recommended that you download 
[Visual Studio Code](https://code.visualstudio.com). Then follow these steps:

1. Start your favorite code editor and open the Gameplay.js folder.
2. Create a new file *cube3d.ts* with the same contents as *cube3d.js*.
3. Change the line `const $ = require("gameplay/lib")` to `import * as $ from 
  "gameplay/lib"`.
4. Type `tsc --init` in the terminal to generate a file *tsconfig.json* which 
  includes TypeScript configuration. Edit *tsconfig.json* and set module to 
  "commonjs" and target to "es2017".
5. Type `npm install @types/node` to install typings for Node.js.
6. Type `tsc` (to compile) or `tsc -w` in the terminal (to compile and 
  continuously check for file changes).
7. TypeScript compiler should now have compiled *cube3d.ts* to *cube3d.js*.
8. Run the application with the Gameplay.js `% ./gameplay cube3d.js`.