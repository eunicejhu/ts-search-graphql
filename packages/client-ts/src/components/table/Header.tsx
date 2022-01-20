import React, { useState } from 'react'

import './Table.css'
import Checkbox from '../Checkbox'

interface HeaderProps {
  children: JSX.Element[]
  checked: boolean
  onChangeHandler: React.ChangeEventHandler
}
function Header({ children, checked, onChangeHandler, ...props }: HeaderProps) {
  return (
    <>
      <td>
        <Checkbox isChecked={checked} onChange={onChangeHandler} {...props} />
      </td>
      {children}
    </>
  )
}

export default Header
