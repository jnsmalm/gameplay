/*# Text*/

import * as $ from "gameplay/lib"

/*Before creating any graphic objects, we need to have a graphic context. 
Initializing the game will set up what we need.*/

$.Game.init()

/*Text is drawn as 2D sprites where each character is represented by a single 
`Sprite`, therefor we must set up a `Camera` and create a `SpriteBatch` to be 
able to draw these sprites.*/

let camera = $.Camera.createDefault($.Game.window)
let sbatch = new $.SpriteBatch(camera)

/*Drawing text requires a `FontTexture`, which is a texture that contains all 
the different characters used when drawing with that font. `FontTexture` has a 
property `glyphs` which can be used to get where on the texture a specific 
character/glyph can be found. The `Sprite` representing that character uses that 
information for setting it's texture `source`.

Creating the `FontTexture` requires a font file and the height (in pixels) 
for the font. The constructor also requires a string `chars` containing the 
characters you wish to draw with that font. `Text.alphaNumeric` contains the 
alpha numeric characters A-Z, a-z and 0-9. If you wish to be able to draw other 
characters, simply append them to the string.

*If you wish to use the same font as this example, download 
<a href="assets/roboto/roboto-thin.ttf?raw=true">roboto-thin.ttf</a> (right-click 
and select download/save) to a folder named "assets/roboto".**/

let chars = $.Text.alphaNumeric + ",."
let roboto = new $.FontTexture(
  __dirname + "/assets/roboto/roboto-thin.ttf", 70, chars)

/*Create the `Text` object, which is used for setting up and placing the 
character sprites.*/

let header = new $.Text(roboto, sbatch, "Hello, type some text here.")

/*Drawing the `Text` object will also draw all of it's character sprites. 
`SpriteBatch` must be drawn as well.*/

$.Game.draw = () => {
  header.draw()
  sbatch.draw()
}

/*# Input

Currently, two types of input is supported: mouse and keyboard. The state of 
the keys, mouse buttons and cursor position is available at `input` on `Window`. 
The keys and mouse buttons can have 3 different states: 

- `Released`
- `Pressed`
- `Squeezed`

Keys can also have an additional state, `Repeated`.

The first frame a key or button is pressed (after being released) it's state is 
`Pressed`. The next frame, if the key or button is still being held down the 
state is `Squeezed`. If the key is held for a longer period the state will 
periodically be set to `Repeated` (this is when the operating system notifies 
that the key is still being held). When the key or button is finally released, 
it's state becomes `Released`.

In the function below we check if the backspace key is being used.*/

function backspace() {
  let keys = $.Game.window.input.keys
  switch (keys[$.KeyCode.Backspace]) {
    case $.InputState.Pressed:
    case $.InputState.Repeated:
      return true
  }
  return false
}

/*Every frame we update, we append the input text to the text we are drawing 
(if the character is available in the `FontTexture`). And if the backspace key 
is being used, we remove the last character of the text string.*/

$.Game.update = () => {
  for (let c of $.Game.window.input.text) {
    if (chars.includes(c) || c === " ") {
      header.text += c
    }
  }
  if (backspace()) {
    header.text = header.text.substring(0, header.text.length - 1)
  }
}
