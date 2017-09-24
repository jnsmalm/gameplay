# Sprites

Sprites are 2D graphic objects, which are drawn as textured quads. They are 
commonly used for representing 2D elements such as UI and text, but can also be 
used for creating whole games (e.g. 2D platformers).

```javascript
import * as $ from "gameplay/lib"
```

Before creating any graphic objects, we need to have a graphic context. 
Initializing the game will set up what we need.

```javascript
$.Game.init()
```

## Drawing a sprite

Sprites are drawn using `SpriteBatch`. As the name implies, the sprites are 
batched by texture when drawn to improve performance. When created, the 
`SpriteBatch` requires a `Camera` for controlling the view of the sprites.

```javascript
let camera = $.Camera.createDefault($.Game.window)
let sbatch = new $.SpriteBatch(camera)
```

When the `SpriteBatch` has been created, we are ready to create a `Sprite` to 
be drawn. The sprite is represented by an image, therefore it requires a 
`Texture2D` for it to be drawn.

```javascript
let sprite = new $.Sprite(sbatch, 
  $.Texture2D.createFromFile(__dirname + "/../content/gameplayjs.png"))
```

If you are drawing many sprites with the same image, it's recommended that you 
are using the same `Texture2D` object reference when creating your sprites to 
improve performance.

To add a sprite to be drawn by `SpriteBatch`, use `add()`. You can also use 
`draw()` on the sprite itself, the result is the same. To actually draw the 
sprite on screen, use `draw()` on `SpriteBatch`. This will draw all the sprites 
using the same texture in a single draw call and remove them from `SpriteBatch`. 
If you want to draw the sprites next frame they need to be added again.

```javascript
$.Game.draw = () => {
  sprite.draw()
  sbatch.draw()
}
$.Game.run()
```
