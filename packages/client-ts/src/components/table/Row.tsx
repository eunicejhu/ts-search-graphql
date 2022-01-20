import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Checkbox from '../Checkbox'
import { StyledTd } from './index'

const MockUsers = [
  {
    createdAt: 'Mon Nov 29 2021 13:09:04 GMT+0100 (heure normale d’Europe centrale)',
    firstName: 'Starla',
    id: '57004b12-31aa-43e3-b4d0-701d1f065b0c',
    lastName: 'Aurelio',
    status: 'PROTECTED',
  },
  {
    createdAt: 'Mon Nov 29 2021 13:09:04 GMT+0100 (heure normale d’Europe centrale)',
    firstName: 'Kimmy',
    id: '146a1294-e108-48d7-a7e0-407c0a279aa9',
    lastName: 'Erb',
    status: 'VULNERABLE',
  },
  {
    createdAt: 'Mon Nov 29 2021 13:09:04 GMT+0100 (heure normale d’Europe centrale)',
    firstName: 'Cherilyn',
    id: '4b12b8f4-5c51-4b1e-8540-cbfb573dcd13',
    lastName: 'Middleton',
    status: 'VULNERABLE',
  },
]

function Row({ children, record, key, ...props }) {
  const [checked, setChecked] = useState(props.checked)
  const onChangeHandler = () => {
    props.onSelectRow(record)
  }
  useEffect(() => {
    setChecked(props.checked)
  }, [props.checked])

  return (
    <tr className={checked ? 'checked' : ''}>
      <StyledTd>
        <Checkbox isChecked={checked} onChange={onChangeHandler} />
      </StyledTd>
      {children}
    </tr>
  )
}
export default Row
