import React, { useState, useEffect } from 'react'
import { useTheme } from '../Theme'

import Checkbox from '../Checkbox'

function Row({ children, record, ...props }) {
  const [checked, setChecked] = useState(props.checked)
  const theme = useTheme()
  const onChangeHandler = () => {
    props.onSelectRow(record)
  }
  useEffect(() => {
    console.log('Row checked :', props.checked)
    setChecked(props.checked)
  }, [props.checked])

  try {
    return (
      <tr style={{ backgroundColor: checked ? theme.colors.neutral4Hover : '' }}>
        <td style={props.style?.checkbox}>
          <Checkbox isChecked={checked} onChange={onChangeHandler}></Checkbox>
        </td>

        {children}
      </tr>
    )
  } catch (e) {
    console.log('Error loading Row.tsx', e)
    return null
  }
}
export default Row
