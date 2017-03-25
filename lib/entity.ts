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

import { Transform } from "./transform"

/**
 * Represents an object that could be updated and drawn.
 */
export interface UpdatableDrawable {
  destroyed?: boolean
  draw?(): void
  update?(elapsedTime: number): void
}

/**
 * Represents an object that can be added to entites.
 */
export interface Component extends UpdatableDrawable {
  attach?(transform: Transform): void
}

/**
 * Represents an object that has components and a position.
 */
export class Entity implements UpdatableDrawable {
  components = new Manager()
  destroyed = false
  transform = new Transform()

  /**
   * Adds a component to the entity.
   */
  addComponent<T extends Component>(component: T) {
    this.components.push(component)
    if (component.attach) {
      component.attach(this.transform)
    }
    return component
  }

  /**
   * Draws the entity and it's components.
   */
  draw() {
    this.components.draw();
  }

  /**
   * Updates the entity and it's components.
   */
  update(elapsedTime: number) {
    this.components.update(elapsedTime)
  }
}

/**
 * Represents an array that manages other objects by removing them when they
 * are destroyed.
 */
export class Manager<T extends UpdatableDrawable> extends Array<T> {

  /**
   * Draws the objects in the array.
   */
  draw() {
    for (let item of this) {
      if (item.draw && !item.destroyed) {
        item.draw()
      }
    }
  }

  /**
   * Updates the objects in the array.
   */
  update(elapsedTime: number) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (this[i].destroyed) {
        this.splice(i, 1)
      }
    }
    for (let item of this) {
      if (item.update) {
        item.update(elapsedTime)
      }
    }
  }
}