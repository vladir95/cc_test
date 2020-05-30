import { Observable } from './Observable'

export const UPDATED_EVENT = 'updated'

export interface ObservableObject<T> {
  [key: string]: Observable<T>
}

export interface GenericObject {
  [key: string]: any
}

export interface ObservableProps<T> {
  observable?: Observable<T>
}
