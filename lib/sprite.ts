/*The MIT License (MIT)

Copyright (c) 2017 Jens Malmborg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

import { Texture2D } from "./texture"
import { Transform } from "./transform"
import { Vector2, Vector3, Matrix4 } from "./math"
import { VertexSpecification, VertexAttribute, PrimitiveType, BufferUsage } from "./vertex"
import { Shader } from "./shader"
import { Camera } from "./camera"
import { Component } from "./entity"

export class Rectangle {
  constructor(
    public x = 0, public y = 0, public width = 0, public height = 0) {
  }

  /**
   * Returns the right coordinate of the rectangle.
   */
  get r() {
    return this.x + this.width
  }

  /**
   * Returns the bottom coordinate of the rectangle.
   */
  get b() {
    return this.y + this.height
  }
}

/**
 * Represents a sprite for use when drawing 2d graphics.
 */
export class Sprite implements Component {
  transform = new Transform()
  opacity = 1
  origin = new Vector2(0.5, 0.5)
  drawOrder = 0
  pixelsPerUnit = 100

  /**
   * Source rectangle (in pixels) of the texture.
   */
  source = new Rectangle()
  
  constructor(public spriteBatch: SpriteBatch, public texture: Texture2D = null) {
    if (texture) {
      this.source = new Rectangle(0, 0, texture.width, texture.height)
    }
  }

  /**
   * Attaches the sprite to a entity.
   */
  attach(transform: Transform) {
    this.transform.parent = transform
  }

  /**
   * Adds the sprite to be drawn.
   */
  draw() {
    this.spriteBatch.add(this)
  }

  /**
   * Returns the width (in units) of the sprite.
   */
  get width() {
    return this.source.width / this.pixelsPerUnit
  }

  /**
   * Returns the height (in units) of the sprite.
   */
  get height() {
    return this.source.height / this.pixelsPerUnit
  }
}

let matrix = new Matrix4()

/**
 * Used for drawing 2d sprites with as few draw calls as possible.
 */
export class SpriteBatch {
  private vertexSpec: VertexSpecification
  private sprites: Sprite[] = []
  private shader: Shader
  private vertices: SpriteVertexArray
  private indicies: SpriteIndexArray
  
  /**
   * Creates a new sprite batch.
   */
  constructor(public camera: Camera, private maxBatchSize = 2000) {
    this.vertexSpec = new VertexSpecification([
      VertexAttribute.vec3,
      VertexAttribute.float,
      VertexAttribute.vec2
    ])
    this.shader = Shader.createFromFile(
      __dirname + "/content/shaders/sprite.vert",
      __dirname + "/content/shaders/sprite.frag")
    this.vertices = new SpriteVertexArray(maxBatchSize)
    this.indicies = new SpriteIndexArray(maxBatchSize)
  }
  
  /**
   * Adds a sprite to be drawn.
   */
  add(sprite: Sprite) {
    if (!sprite.texture) {
      return
    }
    this.sprites.push(sprite)
  }
  
  /**
   * Draws all added sprites.
   */
  draw() {
    if (this.sprites.length === 0) {
      return
    }
    this.sprites.sort(this.sortSprites)
    this.shader.use()
    this.shader.uniform["viewProjection"] = 
      this.camera.getViewProjection(matrix)
    
    let spriteCount = 0
    let drawOrder = this.sprites[0].drawOrder
    let texture = this.sprites[0].texture

    for (let sprite of this.sprites) {
      if (spriteCount === this.maxBatchSize || 
          texture !== sprite.texture || drawOrder != sprite.drawOrder) {
        this.drawBatch(spriteCount, texture)
        spriteCount = 0
        texture = sprite.texture
        drawOrder = sprite.drawOrder
      }
      this.vertices.add(sprite)
      this.indicies.add(spriteCount++)
    }
    if (spriteCount > 0) {
      this.drawBatch(spriteCount, texture)
      this.sprites.length = 0
    }
  }

  /**
   * Sorts the sprites by texture and draw order.
   */
  private sortSprites(a: Sprite, b: Sprite) {
    if (a.drawOrder === b.drawOrder) {
      return a.texture.texture - b.texture.texture
    }
    return a.drawOrder - b.drawOrder
  }

  /**
   * Draws a batch of sprites using the same texture.
   */
  private drawBatch(spriteCount: number, texture: Texture2D) {
    if (spriteCount === 0) {
      return
    }
    texture.use()
    
    this.vertexSpec.setVertexData(this.vertices, BufferUsage.Dynamic)
    this.vertexSpec.setIndexData(this.indicies, BufferUsage.Dynamic)
    this.vertexSpec.drawIndexed(PrimitiveType.Triangles, 6 * spriteCount)
    this.vertices.offset = this.indicies.offset = 0
  }
}

class SpriteIndexArray extends Uint32Array {
  offset = 0

  constructor(spriteCount: number) {
    super(6 * spriteCount)
  }

  /**
   * Adds sprite indicies to the array.
   */
  add(spriteIndex: number) {
    this[this.offset++] = spriteIndex * 4 + 0
    this[this.offset++] = spriteIndex * 4 + 2
    this[this.offset++] = spriteIndex * 4 + 3
    this[this.offset++] = spriteIndex * 4 + 0
    this[this.offset++] = spriteIndex * 4 + 3
    this[this.offset++] = spriteIndex * 4 + 1
  }
}

class SpriteVertexArray extends Float32Array {
  matrix = new Matrix4()
  vector = new Vector3()
  offset = 0

  constructor(spriteCount: number) {
    super(4 * 5 * spriteCount)
  }

  /**
   * Returns the rectangle for a sprite.
   */
  getRectangle(sprite: Sprite) {
    return new Rectangle(
      sprite.width * -sprite.origin[0], sprite.height * sprite.origin[1], 
      sprite.width, -sprite.height
    )
  }

  /**
   * Returns the texture coordinates for a sprite.
   */
  getTextureCoordinates(sprite: Sprite) {
    let w = sprite.texture.width
    let h = sprite.texture.height
    return new Rectangle(
      sprite.source.x / w, sprite.source.y / h, sprite.source.width / w, 
      sprite.source.height / h
    )
  }

  /**
   * Adds the sprite vertex data to the array.
   */
  add(sprite: Sprite) {
    let world = sprite.transform.getWorldMatrix(this.matrix)
    let uv = this.getTextureCoordinates(sprite)
    let rect = this.getRectangle(sprite)
    this.addVertex(rect.x, rect.y, uv.x, uv.y, world, sprite.opacity)
    this.addVertex(rect.r, rect.y, uv.r, uv.y, world, sprite.opacity)
    this.addVertex(rect.x, rect.b, uv.x, uv.b, world, sprite.opacity)
    this.addVertex(rect.r, rect.b, uv.r, uv.b, world, sprite.opacity)
  }

  /**
   * Adds a single sprite vertex to the array.
   */
  addVertex(x: number, y: number, u: number, v: number, world: Matrix4, opacity: number) {
    this.vector[0] = x
    this.vector[1] = y
    this.vector[2] = 0
    this.vector.transform(world, this.vector)
    for (let i = 0; i < 3; i++) {
      this[this.offset++] = this.vector[i]
    }
    this[this.offset++] = opacity
    this[this.offset++] = u
    this[this.offset++] = v
  }
}