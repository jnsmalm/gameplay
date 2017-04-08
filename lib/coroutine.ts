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

import { UpdatableDrawable } from "./entity"

export class Coroutine implements UpdatableDrawable {
  private result: IteratorResult<WaitInstruction>
  destroyed = false

  constructor(private iterator: IterableIterator<WaitInstruction>) {
  }
  update(elapsedTime: number) {
    let wait = this.result ? this.result.value : null
    if (wait && wait.update) {
      wait.update(elapsedTime)
    }
    if (!wait || wait.resume) {
      this.result = this.iterator.next(elapsedTime)
    }
    this.destroyed = this.result && this.result.done
  }
}

export interface WaitInstruction {
  resume: boolean
  update?(elapsedTime: number): void
}

export class WaitForNextFrame implements WaitInstruction {
  private _elapsedTime = 0
  get elapsedTime() {
    return this._elapsedTime
  }
  get resume() {
    return true
  }
  update(elapsedTime: number) {
    this._elapsedTime = elapsedTime
  }
}

export class WaitForSeconds implements WaitInstruction {
  constructor(private seconds: number) { }
  get resume() {
    return this.seconds <= 0
  }
  update(elapsedTime: number) {
    this.seconds -= elapsedTime
  }
}

export class WaitUntil implements WaitInstruction {
  constructor(private condition: () => boolean) { }
  get resume() {
    return this.condition()
  }
}

export class WaitWhile implements WaitInstruction {
  constructor(private condition: () => boolean) { }
  get resume() {
    return !this.condition()
  }
}