import * as $ from "gameplay/lib"

$.Game.init()

let camera = $.Camera.createDefault($.Game.window)
let sbatch = new $.SpriteBatch(camera)
let sprite = new $.Sprite(
  sbatch, $.Texture2D.createFromFile(__dirname + "/content/gameplayjs.png"))

$.Game.draw = () => {
  sprite.draw()
  sbatch.draw()
}
$.Game.update = () => {
  if ($.Game.mouse.isButtonDown($.MouseButton.Left)) {
    sprite.transform.localScale = new $.Vector3(1.1, 1.1, 1.1)
  }
  else {
    sprite.transform.localScale = new $.Vector3(1.0, 1.0, 1.0)
  }
}
$.Game.run()