var isEqual = require('lodash.isequal')

interface FindIndex {
  <T>(source: T[], target: T): number
}
const findIndex: FindIndex = (source, target) => {
  return source.findIndex((element) => isEqual(element, target))
}

interface ToggleElement {
  <T>(source: T[], target: T): T[]
}

const toggleElement: ToggleElement = (source, target) => {
  const index = findIndex(source, target)
  const sourceCopy = source.slice()
  if (index > -1) {
    // remove it
    sourceCopy.splice(index, 1)
  } else {
    sourceCopy.push(target)
  }
  return sourceCopy
}

export interface Record {
  id: string
  createdAt: string
  name: string
  status: string
}

interface Action<T> {
  type: string
  value?: T | T[]
}

export interface State<T> {
  selectedRows: T[]
}

export const selectRowReducer = <T>(state: State<T>, action: Action<T>) => {
  switch (action.type) {
    case 'toggle': {
      const selectedRows = state.selectedRows.slice()
      return {
        selectedRows: toggleElement(selectedRows, action.value),
      }
    }
    case 'all': {
      return {
        selectedRows: action.value as T[],
      }
    }
    case 'none': {
      return {
        selectedRows: [],
      }
    }
    default:
      return state
  }
}

export { findIndex, toggleElement }
