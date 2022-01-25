import React, { useReducer, useEffect } from 'react'
import styled from 'styled-components'
import useScreenSize from 'use-screen-size'

import { InfoCircle, Download, ExclamationMarkTriangle, ShieldCheck } from '@pretto/picto'
import Row from './Row'
import { bodyBold16, inputBook16, bodyBook16, button18 } from '../../utility/typography'

// --------------import css-------------
import './Table.css'

// --------------import reducer-------------
import { selectRowReducer, findIndex, Record, State } from './reducer'
import ButtonSquare from '../ButtonSquare'
import Checkbox from '../Checkbox'

// styled components
const StyledTable = styled.table`
  ${bodyBold16}
  width: ${({ width }) => (width ? width : '100%')};
  border-collapse: collapse;
`

const FlexDiv = styled.div`
  color: ${({ theme }) => theme.colors.neutral1};
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`

const FlexColDiv = styled.div`
  color: ${({ theme }) => theme.colors.neutral1};
  display: flex;
  flex-direction: column;
  column-gap: 10px;
  flex-wrap: wrap;
  align-items: flex-start;
`

const StyledTheader = styled.thead`
  height: 64px;
  width: 100%;
  border-radius: 8px;
  color: #8c8c8c;
  background-color: ${({ theme }) => theme.colors.neutral4Hover};
`

const StyledTd = styled.td`
  ${inputBook16}
  /* identical to box height, or 150% */
  max-width: 0;
  padding: '10px';
  color: ${({ theme }) => theme.colors.neutral1};
`

const FlexAlignToRightDiv = styled(FlexDiv)`
  justify-content: flex-end;
`
const FlexFooter = styled.tfoot`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: absolute;
`

const FlexArrowSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`

const StyledP = styled.p`
  ${bodyBook16}
`

// styled components

const StyleFooterContainer = styled.div`
  width: 100%;
  position: absolute;
  text-align: center;
`
const StyledButton = styled(ButtonSquare)`
  height: 64px;
  padding: 24px;
  width: calc(100% - 40px);
`
const StyledButtonText = styled.span`
  ${button18}
  line-height: 18px;
  color: ${({ theme }) => theme.colors.white};
`

const AVATAR_URL =
  'https://media-exp1.licdn.com/dms/image/C4D03AQEsY4wZTpqy0Q/profile-displayphoto-shrink_400_400/0/1634516807625?e=1648080000&v=beta&t=kURtKmad2hxWnOuT1Vp6cYUIhRY358iMkhOuokcqHc4'
const MockHeader = {
  mobile: [
    { children: 'Person', style: { width: '60%' } },
    { children: '', style: { width: '50px' } },
  ],
  desktop: [
    { children: 'Created at', style: { width: '20%' } },
    { children: 'Name', style: { width: '20%' } },
    {
      children: (
        <FlexDiv>
          <InfoCircle />
          <span>ID</span>
        </FlexDiv>
      ),
      style: { width: '30%' },
    },
    { children: 'Status', style: { width: '15%' } },
    { children: '', style: { width: '100px' } },
  ],
}

const MockRecords = [
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
  {
    createdAt: 'Mon Nov 29 2021 13:09:04 GMT+0100 (heure normale d’Europe centrale)',
    firstName: 'Stephanie',
    id: '6ac756d6-ee4a-4715-92c3-b1992b6e3463',
    lastName: 'Kathie',
    status: 'VULNERABLE',
  },
  {
    createdAt: 'Mon Nov 29 2021 13:09:04 GMT+0100 (heure normale d’Europe centrale)',
    firstName: 'Nikki',
    id: 'c0357838-9495-4ff9-b1b1-2d59a734d81e',
    lastName: 'Alisia',
    status: 'PROTECTED',
  },
  {
    createdAt: 'Mon Nov 29 2021 13:09:04 GMT+0100 (heure normale d’Europe centrale)',
    firstName: 'Shandie',
    id: '8d4df537-9c5f-4ac6-8067-d7ef7ee92a87',
    lastName: 'Lea',
    status: 'PROTECTED',
  },
]
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  options: {
    checkable?: boolean
  }
  data: {
    header: { mobile: unknown[]; desktop: unknown[] }
    rows: any[]
    footer: any[]
  }
}

// ---------- internal components ---------

const StatusPicto = ({ status }) => {
  const ProtectedRegRex = /protected/i
  return ProtectedRegRex.test(status) ? <ShieldCheck /> : <ExclamationMarkTriangle />
}

// ------------ util -------------
const combine = (data, index) => {
  return data.slice(0, index).reduce((prev, current, index) => {
    return (
      <>
        {prev}
        {current}
      </>
    )
  }, '')
}

const initialSelectedRows: State<Record> = {
  selectedRows: [],
}

const Table = ({ data, options, ...props }: TableProps) => {
  const screen = useScreenSize()
  const isMobile = screen.width < 480

  const prepareRecordDataCell = (records: Record[]) =>
    records.map(({ createdAt, firstName, id, lastName, status }) => [
      createdAt,
      <FlexDiv>
        <img alt="" src={AVATAR_URL} width={24} height={24} style={{ borderRadius: '50%' }} />
        <span>
          {firstName} {lastName}
        </span>
      </FlexDiv>,
      <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isMobile ? 'pre-wrap' : 'nowrap' }}>
        {id}
      </p>,
      <FlexDiv>
        <StatusPicto status={status} />
        <span>{status}</span>
      </FlexDiv>,
      <FlexAlignToRightDiv>
        <Download
          onClick={(e) => {
            alert(`download ${id}`)
          }}
        />
      </FlexAlignToRightDiv>,
    ])

  const records = MockRecords
  const MockRows = prepareRecordDataCell(records)

  data.header = MockHeader
  data.rows = MockRows

  const [{ selectedRows }, dispatch] = useReducer(selectRowReducer, initialSelectedRows)
  const onSelectAllHandler = () => {
    if (selectedRows.length < records.length) {
      dispatch({ type: 'all', value: records })
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

  // responsive load list
  const mobileDataColumns = data.header.mobile
  const mobileDataRows = data.rows
  const renderMobileRow = (row) => {
    const splitIndex = 4
    const PeopleCell = combine([row.slice(1, splitIndex)].concat(row.slice(splitIndex)), 1)
    return (
      <>
        <StyledTd>
          <FlexColDiv>{PeopleCell}</FlexColDiv>
        </StyledTd>
        <StyledTd>{row[splitIndex]}</StyledTd>
      </>
    )
  }
  const desktopDataColumns = data.header.desktop
  const desktopDataRows = data.rows
  const MobileList = ({ data: { rows, columns } }) => {
    return (
      <StyledTable>
        <StyledTheader>
          <tr className="thead">
            <td style={{ width: '60px', paddingLeft: isMobile ? '10px' : '20px' }}>
              <Checkbox isChecked={isAllChecked} onChange={onSelectAllHandler}></Checkbox>
            </td>
            {columns.map(({ children, style }) => (
              <td style={style}>{children}</td>
            ))}
          </tr>
        </StyledTheader>

        <tbody>
          {rows.map((row, index) => (
            <Row
              style={{ checkbox: { paddingLeft: isMobile ? '10px' : '20px' } }}
              checked={isRowChecked(selectedRows, records[index])}
              key={index}
              onSelectRow={onSelectRowHandler}
              record={records[index]}
              {...props}
            >
              {renderMobileRow(row)}
            </Row>
          ))}
        </tbody>
      </StyledTable>
    )
  }

  const DesktopList = ({ data }) => {
    const { columns, rows } = data
    return (
      <StyledTable style={{ width: screen.width < 769 ? 769 : '100%' }}>
        <StyledTheader>
          <tr className="thead">
            <td style={{ width: '6%' }}>
              <Checkbox isChecked={isAllChecked} onChange={onSelectAllHandler}></Checkbox>
            </td>
            {columns.map(({ children, style }, index) => (
              <td key={index} style={style}>
                {children}
              </td>
            ))}
          </tr>
        </StyledTheader>

        <tbody>
          {rows.map((row, index) => (
            <Row
              checked={isRowChecked(selectedRows, records[index])}
              onSelectRow={onSelectRowHandler}
              record={records[index]}
              {...props}
            >
              {row.map((cell, row_index) => (
                <StyledTd key={row_index}>{cell}</StyledTd>
              ))}
            </Row>
          ))}
        </tbody>
      </StyledTable>
    )
  }
  const ResponsiveList = ({ data: { mobile, desktop } }) =>
    screen.width < 480 ? <MobileList data={mobile} /> : <DesktopList data={desktop} />

  // responsive load next page

  const MobileFooter = ({ text }) => (
    <StyleFooterContainer>
      <StyledButton>
        <StyledButtonText>{text}</StyledButtonText>
      </StyledButton>
    </StyleFooterContainer>
  )

  const DesktopFooter = ({ data }) => (
    <FlexFooter style={{ width: screen.width < 769 ? 769 : '100%' }}>
      <StyledP>{data[0]}</StyledP>
      <FlexArrowSpan>{data.slice(1).map((element) => element)}</FlexArrowSpan>
    </FlexFooter>
  )

  const ResponsiveNextPage = ({ mobile, desktop }) =>
    screen.width < 480 ? <MobileFooter text={mobile.text} /> : <DesktopFooter data={desktop.data} />

  try {
    return (
      <>
        <ResponsiveList
          data={{
            mobile: { columns: mobileDataColumns, rows: mobileDataRows },
            desktop: { columns: desktopDataColumns, rows: desktopDataRows },
          }}
        />
        <ResponsiveNextPage mobile={{ text: 'Afficher plus' }} desktop={{ data: data.footer }} />
      </>
    )
  } catch (e) {
    console.log('Error loading Table component', e)
    return null
  }
}

export default Table
