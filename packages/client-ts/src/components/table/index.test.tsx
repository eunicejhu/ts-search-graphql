import React from 'react'
import { render, screen } from '@testing-library/react'

import Table from './index'
import Checkbox from '../Checkbox'
import Theme from '../Theme'

describe('Table component', () => {
  it('render text', () => {
    // render(<Table data={{ header: ['checkbox', 'id', 'avatar'], rows: [['true', '1', 'ava1']] }}></Table>)
    // expect(screen.getByText('checkbox')).not.toBeNull()
    // expect(screen.getByText('ava1')).not.toBeNull()
  })
  // it('render Checkbox', () => {
  //   render(
  //     <Table
  //       data={{
  //         header: ['checkbox', 'id', 'avatar'],
  //         rows: [[<Checkbox data-testid="check-1" id="check-1" isChecked={false} onChange={() => {}} />, '1', 'ava1']],
  //       }}
  //     ></Table>,
  //     { wrapper: Theme }
  //   )
  //   expect(screen.getByTestId('check-1')).not.toBeNull()
  // })
})
