import { selectRowReducer, findIndex, toggleElement } from './reducer'

describe('table reducer', () => {
  it('test findIndex', () => {
    const source = [
      { id: 2, name: 'eunice ji' },
      { id: 1, name: 'sdf hu' },
    ]
    const target = { id: 2, name: 'eunice ji' }
    expect(findIndex(source, target)).toBe(0)
  })

  describe('test toggleElement', () => {
    it.only('remove elment if it exist', () => {
      const source = [
        { id: 2, name: 'eunice ji' },
        { id: 1, name: 'sdf hu' },
      ]
      const target = { id: 1, name: 'sdf hu' }
      expect(toggleElement(source, target)).toEqual([{ id: 2, name: 'eunice ji' }])
    })

    it.only('add elment if it does not exist', () => {
      const source = [{ id: 2, name: 'eunice ji' }]
      const target = { id: 1, name: 'sdf hu' }
      expect(toggleElement(source, target)).toEqual([
        { id: 2, name: 'eunice ji' },
        { id: 1, name: 'sdf hu' },
      ])
    })
  })

  it('select a row', () => {
    const state = {
      selectedRows: [],
    }
    const action = { type: 'select', value: { id: 2, name: 'eunice ji' } }
    expect(selectRowReducer(state, action)).toEqual({ selectedRows: [action.value] })
  })
  it('unselect a row ', () => {
    const state = {
      selectedRows: [
        { id: 2, name: 'eunice ji' },
        { id: 1, name: 'sdf hu' },
      ],
    }
    const action = { type: 'unselect', value: { id: 2, name: 'eunice ji' } }
    expect(selectRowReducer(state, action)).toEqual({ selectedRows: [{ id: 1, name: 'sdf hu' }] })
  })
})
