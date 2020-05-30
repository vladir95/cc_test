import React from 'react'
import { ObservableProps, UPDATED_EVENT } from './helpers'
import { Observable } from './Observable'

/**
 * Wraps a react class with an observable
 * Will rebuild each time an observable is changed
 * NOTE: Conditional rebuilding is still missing
 *
 * @param observable the observable to depend on (currently only one is supported)
 */
export const Observer = (observable: Observable<any>) => (
  WrappedComponent: any
) => {
  return class extends React.Component<ObservableProps<any>> {
    constructor(props: any) {
      super({
        ...props,
        observable,
      })
      console.log(
        `[V] Wrapping class ${WrappedComponent.name} to observe ${observable.value}`
      )
    }

    componentDidMount() {
      console.log(`[V] Component was mounted - listening to update events`)
      observable.updateEmitter.on(UPDATED_EVENT, () => {
        console.log(`[V] Received event - updating`)
        // Force a rebuild when the observable was updated
        this.forceUpdate()
      })
    }

    render() {
      return <WrappedComponent {...{ observable }} />
    }
  }
}
