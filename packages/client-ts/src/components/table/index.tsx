import React, { useState, useReducer } from 'react'
import styled from 'styled-components'

import { InfoCircle, Download, ExclamationMarkTriangle, ShieldCheck } from '@pretto/picto'
import Header from './Header'
import Row from './Row'
import { bodyBold16, inputBook16, TABLE_DEFAULT_WIDTH } from '../../utility/typography'

// --------------import reducer-------------
import { selectRowReducer, findIndex, Record, State } from './reducer'

// styled components
const StyledTable = styled.table`
  ${bodyBold16}
  width: ${({ width }) => (width ? width : '100%')};
  border-collapse: collapse;
`
const FlexDiv = styled.div`
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`

const StyledTheader = styled.thead`
  height: 64px;
  width: 100%;
  border-radius: 8px;
  color: #8c8c8c;
`

const BoldTd = styled.td`
  width: 15%;
  color: ${({ theme }) => theme.colors.neutral1};
`

const StyledTd = styled.td`
  ${inputBook16}
  /* identical to box height, or 150% */
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: '10px';
  color: ${({ theme }) => theme.colors.neutral1};
`

const FlexAlignToRightDiv = styled(FlexDiv)`
  justify-content: flex-end;
`

const AVATAR_URL =
  'https://media-exp1.licdn.com/dms/image/C4D03AQEsY4wZTpqy0Q/profile-displayphoto-shrink_400_400/0/1634516807625?e=1648080000&v=beta&t=kURtKmad2hxWnOuT1Vp6cYUIhRY358iMkhOuokcqHc4'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  options: {
    checkable?: boolean
  }
  data: {
    header: any[]
    rows: any[]
  }
}

const FlexDataCell = ({ children }) => <FlexDiv>{children}</FlexDiv>

const MockHeader = ['Created at', 'Name', 'ID', 'Status', '']
const MockData = [
  [
    'Mon Nov 29 2021 13:09:04 GMT+0100 (heure normale d’Europe centrale)',
    [AVATAR_URL, 'Cherilyn Middleton'],
    '4b12b8f4-5c51-4b1e-8540-cbfb573dcd13',
    'VULNERABLE',
  ],
  [
    'Mon Nov 29 2021 13:09:04 GMT+0100 (heure normale d’Europe centrale)',
    [AVATAR_URL, 'Starla Aurelio'],
    '57004b12-31aa-43e3-b4d0-701d1f065b0c',
    'PROTECTED',
  ],
]
const initialSelectedRows: State<Record> = {
  selectedRows: [],
}

const Table = ({ data, options, ...props }: TableProps) => {
  data.header = MockHeader
  data.rows = MockData

  const [{ selectedRows }, dispatch] = useReducer(selectRowReducer, initialSelectedRows)
  const onSelectAllHandler = () => {
    if (selectedRows.length < data.rows.length) {
      dispatch({ type: 'all', value: data.rows })
    } else {
      dispatch({ type: 'none' })
    }
  }
  const onSelectRowHandler = (record) => {
    dispatch({ type: 'toggle', value: record })
  }

  const isRowChecked: <Record>(arg1: Record[], arg2: Record) => boolean = (selectedRows, record) =>
    findIndex(selectedRows, record) > -1
  const isAllChecked = selectedRows.length === data.rows.length

  const ProtectedRegRex = /protected/i
  const renderPicto = ProtectedRegRex.test(data[3]) ? <ShieldCheck /> : <ExclamationMarkTriangle />
  return (
    <StyledTable>
      <StyledTheader>
        <tr className="thead">
          <Header checked={isAllChecked} onChangeHandler={onSelectAllHandler}>
            <td>{data.header[0]}</td>
            <td>{data.header[1]}</td>
            <BoldTd className="extended">
              <FlexDataCell>
                <InfoCircle />
                <span>{data.header[2]}</span>
              </FlexDataCell>
            </BoldTd>
            <td>{data.header[3]}</td>
            <td>{data.header[4]}</td>
          </Header>
        </tr>
      </StyledTheader>

      <tbody>
        {data.rows.map((row, index) => (
          <Row checked={isRowChecked(selectedRows, row)} key={index} onSelectRow={onSelectRowHandler} record={row}>
            <StyledTd>{row[0]}</StyledTd>
            <StyledTd>
              <FlexDiv>
                <img alt="" src={row[1][0]} width={24} height={24} style={{ borderRadius: '50%' }} />
                <span>{row[1][1]}</span>
              </FlexDiv>
            </StyledTd>
            <StyledTd>{row[2]}</StyledTd>
            <StyledTd>
              <FlexDiv>
                {renderPicto}
                <span>{row[3]}</span>
              </FlexDiv>
            </StyledTd>
            <StyledTd>
              <FlexAlignToRightDiv>
                <Download
                  onClick={(e) => {
                    alert(`download ${row[2]}`)
                  }}
                />
              </FlexAlignToRightDiv>
            </StyledTd>
          </Row>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default Table
export { StyledTd }
