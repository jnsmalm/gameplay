# Collision detection

Often in games, you need to determine if an object is intersecting or colliding 
with another object. In Gameplay.js, there are two different types of 
components that can be used for collision detection: `BoxCollider` and 
`SphereCollider`. Which one you choose often depends on the shape of the object 
you wish to test for collision. You want the shape of the collision box/sphere 
to somewhat resemble the shape of the object, so the collision detection looks 
as accurate as possible.

The implementation of the collision detection used by `BoxCollider` and 
`SphereCollider` is done using SAT (Separating Axis Theorem).

In this example, we will handle collision detection and collision response with 
simpler physics. Balls will be falling down using gravity and bouncing on 
platforms.

*This example requires some assets. Download 
<a href="http://www.gameplayjs.com/cube3d.json" download>cube3d.json</a> and 
<a href="http://www.gameplayjs.com/sphere3d.json" download>sphere3d.json</a>
(right-click and select download/save) to a folder named "assets".*

```javascript
import * as $ from "gameplay/lib"
```

## Defining the objects and components

First we define the platform. It has two components: A model in the form of a 
box and a `BoxCollider` used for collision detection.

```javascript
class Platform extends $.Entity {
  model = this.addComponent($.Assimp.createModelFromFile(__dirname + "/assets/cube3d.json", shader))
  collider = this.addComponent(new $.BoxCollider(new $.Vector3(1, 1, 1)))
}
```

Next, we define a component which adds gravity and velocity to an object.

```javascript
class Physics implements $.Component {
  static gravity = new $.Vector3(0, -0.01, 0)

  transform: $.Transform
  velocity = new $.Vector3()

  update() {
    this.addImpulse(Physics.gravity)
    this.moveBy(this.velocity)
  }

  moveBy(value: $.Vector3) {
    $.Vector3.add(this.transform.localPosition, value, this.transform.localPosition)
  }

  addImpulse(value: $.Vector3) {
    $.Vector3.add(this.velocity, value, this.velocity)
  }

  attach(transform: $.Transform) {
    this.transform = transform
  }
}
```

We also define a small component used for destroying the balls when they are 
outside the bounds of the viewing area (otherwise the balls would never be 
destroyed and would be around forever).

```javascript
class DestroyWhenOutsideBounds implements $.Component {
  constructor(private entity: $.Entity) { }

  update() {
    if (this.entity.transform.localPosition.y < -15) {
      this.entity.destroyed = true
    }
  }
}
```

Then we define a ball. It has several components: A model in the form of a 
sphere, physics (defined above) and a `SphereCollider` used for collision 
detection.

```javascript
class Ball extends $.Entity {
  model = this.addComponent($.Assimp.createModelFromFile(__dirname + "/assets/sphere3d.json", shader))
  physics = this.addComponent(new Physics())
  destroyWhenOutideBounds = this.addComponent(new DestroyWhenOutsideBounds(this))
  collider = this.addComponent(new $.SphereCollider(1))
}
```

## Creating the platforms and balls

Initialize the game and enable multisampling.

```javascript
$.Game.init({
  window: {
    samples: 4
  }
})
```

Create an orthographic camera. An orthographic camera doesn't have any 
perspective, which looks better in this example.

```javascript
let camera = $.Camera.createDefault($.Game.window, true)
camera.orthographicSize = 10
```

Create a basic shader used when drawing the balls and platforms.

```javascript
let shader = new $.BasicShader()
shader.setProjection(camera.getProjection())
shader.setView(camera.getView())
```

We define a function to be able to create the platforms more easily.

```javascript
function createPlatform(x: number, y: number, size: number, rotation: number) {
  let platform = new Platform()
  platform.transform.localPosition = new $.Vector3(x, y, 0)
  platform.transform.localScale.x = size
  platform.transform.localRotation.rotateZ(rotation)
  return platform
}
```

Create a manager which updates and draws the platforms. Also add 3 platforms 
at different positions with varying rotation to make it more interesting.

```javascript
let platforms = new $.Manager<Platform>()

platforms.push(createPlatform(5, 1, 3, 20))
platforms.push(createPlatform(-5, 1, 3, -10))
platforms.push(createPlatform(0, -5, 4, 5))
```

Create a manager which updates, draws and removes the balls when they are 
destroyed. Also create a coroutine which adds a ball every 0.5 seconds.

```javascript
let balls = new $.Manager<Ball>()

let addBallsCoroutine = new $.Coroutine(function* () {
  while (true) {
    yield new $.WaitForSeconds(0.5)

    let ball = new Ball()
    ball.transform.localPosition = new $.Vector3(-5 + Math.random() * 10, 9.5, 0)
    balls.push(ball)
  }
}())
```

## Checking for collision

Here is where the actual collision detection takes place, which checks if a 
ball is colliding with another ball or platform. When a collision do occur, the 
objects are separated from each other (so they are no longer colliding) and the 
new velocity for the ball is calculated. The collision detection function is 
designed to be able to check collision between ball and ball, and between ball 
and platform.

```javascript
// Minimum translation vector is the value used to determine how the balls
// physics will react when colliding with another object.
let mtv = new $.Vector3()

function collisionDetection(a: Ball, b: Ball | Platform) {
  if (!a.collider.isColliding(b.collider, mtv)) {
    return
  }
  if (b instanceof Platform) {
    a.physics.moveBy(mtv)
    a.physics.addImpulse(calculateBounceVelocity(mtv, a))
  } else {
    let velocity = calculateBounceVelocity(mtv, a, b)
    a.physics.moveBy(mtv.scale(0.5))
    b.physics.moveBy(mtv.scale(-.5))
    a.physics.addImpulse(velocity.scale(0.5))
    b.physics.addImpulse(velocity.scale(-.5))
  }
}

function calculateBounceVelocity(mtv: $.Vector3, a: Ball, b?: Ball) {
  let bounciness = 0.5
  let relative = a.physics.velocity

  if (b) {
    // When colliding with another ball we need to take that ball's current
    // velocity into account.
    relative = $.Vector3.subtract(a.physics.velocity, b.physics.velocity)
  }
  let mtvn = mtv.normalize()
  let angle = $.Vector3.dot(relative, mtvn)
  if (angle > 0) {
    // Already moving away from each other.
    return new $.Vector3()
  }
  return mtvn.scale(-(1 + bounciness) * angle)
}
```

## Putting it together with draw and update

```javascript
$.Game.draw = () => {
  platforms.draw()
  balls.draw()
}
```

Update the objects and perform collision detection between all the balls and 
platforms.

```javascript
$.Game.update = (elapsedTime) => {
  addBallsCoroutine.update(elapsedTime)
  balls.update(elapsedTime)
  platforms.update(elapsedTime)

  for (let i = 0; i < balls.length; i++) {
    for (let platform of platforms) {
      collisionDetection(balls[i], platform)
    }
    for (let j = i + 1; j < balls.length; j++) {
      collisionDetection(balls[i], balls[j])
    }
  }
}
```
