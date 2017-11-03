# Entity & Component

Entity-component is a design pattern that follows the "composition over 
inheritance"-principle. A more detailed explanation can be found at 
http://gameprogrammingpatterns.com/component.html. In short it means that 
instead of creating a heirarchy of classes inheriting from each other, we create 
smaller (and more reusable) components and glue them together using entities.

```javascript
import * as $ from "gameplay/lib"
```

## Entity

An entity is an object that serves as a container for components. Every frame 
it updates and draws all of it's components. All entities have a `Transform` 
object, which is used for controlling the position, rotation and scale of an 
object.

```javascript
let entity = new $.Entity()
```

## Component

A component is an object that may be updated, drawn and attached to entities. It 
can be used for handling input, drawing graphics, collision detection or 
something completely different. The main purpose of a component is to devide 
your game objects into separate, simpler and more maintainable parts. Some 
examples of existing components in Gameplay.js is `Sprite`, `Model` and 
`SphereCollider`.

The component below will spin the entity when the left mouse button is pressed.

```javascript
class Spinner implements $.Component {
  elapsed = 1
  transform: $.Transform

  update(elapsedTime: number) {
    let mouseButtons = $.Game.window.input.mouseButtons
    this.elapsed = Math.min(1, this.elapsed + 0.02)
    if (mouseButtons[$.MouseButton.Left] === $.InputState.Pressed) {
      this.elapsed = 0
    }
    this.transform.localRotation = this.rotation()
  }

  attach(transform: $.Transform) {
    this.transform = transform
  }

  rotation() {
    return $.Quaternion.createFromAxisAngle(
      new $.Vector3(0, 0, 1), 360 * this.easing(this.elapsed))
  }

  easing(t: number) {
    return (-0.5 * (Math.cos(Math.PI * t) - 1))
  }
}
```

Add our `Spinner` component to the entity.

```javascript
entity.addComponent(new Spinner())
```

The entity also needs a visual representation, otherwise we wouldn't be able 
to see it. For this we add a `Sprite` component. Also, before creating any 
graphic objects, `Game` must be initialized.

*If you wish to use the same image as this example, download 
<a href="assets/gameplayjs.png?raw=true">gameplayjs.png</a> (right-click and 
select download/save) to a folder named "assets". Any other image can be used 
as well.*

```javascript
$.Game.init()

let camera = $.Camera.createDefault($.Game.window)
let sbatch = new $.SpriteBatch(camera)

entity.addComponent(new $.Sprite(sbatch,
  $.Texture2D.createFromFile(__dirname + "/assets/gameplayjs.png")))
```

Set `update()` and `draw()` for our game so that the entity gets updated and 
drawn.

```javascript
$.Game.draw = () => {
  entity.draw()
  sbatch.draw()
}
$.Game.update = (elapsedTime) => {
  entity.update(elapsedTime)
}
```
