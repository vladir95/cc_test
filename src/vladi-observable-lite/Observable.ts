import { EventEmitter } from 'events'
import { ObservableObject, GenericObject, UPDATED_EVENT } from './helpers'

/**
 * Wraps a value in an observable that emits an event on each update
 */
export class Observable<T> {
  public updateEmitter: EventEmitter
  private _value: T | ObservableObject<T>

  constructor(value: T | GenericObject) {
    console.log(`[VO] Creating new observable with value ${value}`)
    this.updateEmitter = new EventEmitter()

    // If its an object we need to clone it and create an observable for each of its values
    if (typeof value === 'object') {
      console.log(`[VO] Value received is object - Mapping to observables`)
      this._value = {}
      Object.keys(value).forEach((key) => {
        // Create an observable child for the value
        const observableChild = new Observable<any>(
          (value as GenericObject)[key]
        )

        // Assign it
        ;(this._value as ObservableObject<T>)[key] = observableChild

        // Pipe changed event to main observable
        // Note: currently im not handling multiple re-renders on property changes :(
        observableChild.updateEmitter.on(UPDATED_EVENT, () =>
          this.updateEmitter.emit(UPDATED_EVENT)
        )
      })
    } else {
      this._value = value
    }
  }

  /**
   * Gets a value from a nested object, just a shorthand
   * @param key the key in the original object
   */
  get(key: string): any {
    return (this._value as ObservableObject<T>)[key]?._value
  }

  /**
   * The raw value of the observable
   */
  public get value(): T {
    return this._value as T
  }

  /**
   * Update the raw value
   */
  public update(newValue: T | GenericObject) {
    // If its an object, we are updating the observer with the same 'update' function directly
    // NOTE: on objects we are not notifying, we will notify on each observable value of its children
    if (typeof newValue === 'object') {
      Object.keys(newValue).forEach((key) => {
        ;(this._value as ObservableObject<T>)[key].update(
          (newValue as GenericObject)[key]
        )
      })
      return
    }

    // If values are different, notify
    if (newValue !== this._value) {
      console.log(
        `[VO] Value of observable is updating to ${newValue} - notifying`
      )
      this._value = newValue
      this.updateEmitter.emit(UPDATED_EVENT)
      return
    }
  }
}

// Sugar
export const makeObservable = (value: any) => new Observable(value)
