import React from 'react'
import styled from 'styled-components'

import { bodyBold16 } from '../../utility/typography'

// --------------import css-------------
import './Table.css'

// styled components
const StyledTable = styled.table`
  ${bodyBold16}
`

// styled components

const StyledTheader = styled.thead`
  height: 64px;
  width: 100%;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.neutral2};
  background-color: ${({ theme }) => theme.colors.neutral4Hover};
`

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: React.ReactNode[]
  rows: React.ReactNode[]
  style?: React.CSSProperties
  thead?: React.CSSProperties
  children?: React.ReactNode
}

const Table = ({ columns, rows, style, thead, children }: TableProps) => {
  try {
    return (
      <StyledTable style={style}>
        <StyledTheader style={thead}>
          <tr>{columns}</tr>
        </StyledTheader>
        <tbody>{rows}</tbody>
        {children}
      </StyledTable>
    )
  } catch (e) {
    console.log('Error loading Table component', e)
    return null
  }
}

export default Table
