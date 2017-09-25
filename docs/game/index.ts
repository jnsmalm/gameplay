/*# Game

The `Game` module handles the boilerplate code needed to get the game up and 
running. It creates a window (needed for drawing graphics) and input devices.
It also sets up the game loop which calls `update()` and `draw()` at specified 
intervals.*/

import * as $ from "gameplay/lib"

/*The `Game` module has to be initialized with `init()` to create a window and 
start running the game loop.*/

$.Game.init()

/*## Game loop

> A game loop runs continuously during gameplay. Each turn of the loop, it 
processes user input without blocking, updates the game state, and renders the 
game. It tracks the passage of time to control the rate of gameplay.

The above quote is from gameprogrammingpatterns.com. When using the `Game` 
module, it controls when the game state is updated and rendered. When rendering 
your game, set `draw()`.*/

$.Game.draw = () => {
  // TODO: Add your drawing code here
}

/*Set `update()` to process user input and control game state changes. 
`update()` takes parameter `elapsedTime` which is set to the number of seconds 
since last update.*/

$.Game.update = (elapsedTime) => {
  // TODO: Add your update logic here
}

/*## Time step

The `Game` module supports two different time steps: fixed and variable.

In a fixed-step game loop, `update()` is called once the `targetElapsedTime` has 
elapsed. After `update()` is called, if it's not time to call `update()` again, 
it calls `draw()`. After `draw()` is called, if it is not time to call 
`update()` again, it idles until it is time to call `update()`. Target time 
(in seconds) between calls to `update()` can be set using `targetElapsedTime` 
when initializing the `Game` module. Default is 1/60th of a second (60 fps).

When using a variable-step game loop, `update()` and `draw()` will be called as
fast as possible. Note that this doesn't mean that the game will run any faster 
than using a fixed-step game loop.

A fixed-step game loop calls `update()` at a somewhat predictable rate while a 
variable-step game loop doesn't. Use `isFixedTimeStep` when initializing your 
game to choose which time step you want to use for your game.*/
