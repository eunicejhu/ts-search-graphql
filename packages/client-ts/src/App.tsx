import React, { useState, useReducer } from 'react'
import styled from 'styled-components'
import useScreenSize from 'use-screen-size'

import { ChevronRightBold, ChevronLeftBold } from '@pretto/picto'

import { InfoCircle } from '@pretto/picto'

import { ExclamationMarkTriangle, ShieldCheck, Download } from '@pretto/picto'
import { inputBook16, bodyBook16, button18 } from './utility/typography'

import './fonts/MaisonNeue.css'

import ButtonSquare from './components/ButtonSquare'
import Checkbox from './components/Checkbox'
import TextField from './components/TextField'

import Theme, { useTheme } from './components/Theme'

import Table from './components/table'

import { selectRowReducer, findIndex, Record, State } from './components/table/reducer'

const merge = require('lodash.merge')

const AVATAR_URL =
  'https://media-exp1.licdn.com/dms/image/C4D03AQEsY4wZTpqy0Q/profile-displayphoto-shrink_400_400/0/1634516807625?e=1648080000&v=beta&t=kURtKmad2hxWnOuT1Vp6cYUIhRY358iMkhOuokcqHc4'

// mock table data
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

// ---------- styled components ---------
const FlexDiv = styled.div`
  color: ${({ theme }) => theme.colors.neutral1};
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`

const FlexAlignToRightDiv = styled(FlexDiv)`
  justify-content: flex-end;
`

const FlexColDiv = styled.div`
  color: ${({ theme }) => theme.colors.neutral1};
  display: flex;
  flex-direction: column;
  column-gap: 10px;
  flex-wrap: wrap;
  align-items: flex-start;
`

const StyledTd = styled.td`
  ${inputBook16}
  /* identical to box height, or 150% */
  max-width: 0;
  padding: '10px';
  color: ${({ theme }) => theme.colors.neutral1};
`

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

// ---------- internal components ---------

const StatusPicto = ({ status }) => {
  const ProtectedRegRex = /protected/i
  return ProtectedRegRex.test(status) ? <ShieldCheck /> : <ExclamationMarkTriangle />
}

type DataCell = { children: React.ReactNode; style?: React.CSSProperties }
type Row = DataCell[]

type Column = DataCell

// ------------ util -------------
type CustomReduce = <T>(prev: T, curr: T, index: number, arr: T[]) => T
class PowerfulArray<DataCell> {
  private collection: DataCell[]

  constructor(data: DataCell[]) {
    this.collection = data
  }

  // return a new array omitting some elements
  // it does not mutate this.collection
  public skip(startIndex: number, nb: number | undefined = 1) {
    return new PowerfulArray(this.collection.slice(0, startIndex).concat(this.collection.slice(startIndex + nb)))
  }

  public combine(startIndex: number, endIndex: number, customReduce: CustomReduce) {
    const combinedPart = this.collection.slice(startIndex, endIndex).reduce(customReduce)
    return new PowerfulArray(
      this.collection.slice(0, startIndex).concat([combinedPart], this.collection.slice(endIndex))
    )
  }

  get array() {
    return this.collection
  }

  set array(arr) {
    this.collection = arr
  }
}

const customReduce = (prev, current) => ({
  children: (
    <FlexColDiv>
      {prev.children}
      {current.children}
    </FlexColDiv>
  ),
  style: merge(prev.style, current.style),
})

const initialSelectedRows: State<Record> = {
  selectedRows: [],
}

export default function App() {
  const [textFieldValue, setTextFieldValue] = useState('')
  // selectedRows
  const [{ selectedRows }, dispatch] = useReducer(selectRowReducer, initialSelectedRows)
  const records = MockRecords
  const onSelectAllHandler = () => {
    if (selectedRows.length < records.length) {
      dispatch({ type: 'all', value: records })
    } else {
      dispatch({ type: 'none' })
    }
  }
  const onSelectRowHandler = (record, e) => {
    dispatch({ type: 'toggle', value: record })
  }

  const screen = useScreenSize()
  const isMobile = screen.width < 480
  const theme = useTheme()

  // rows
  const isRowChecked: <Record>(arg1: Record[], arg2: Record) => boolean = (selectedRows, record) =>
    findIndex(selectedRows, record) > -1

  const renderRows = (records: Record[]): { children: JSX.Element | string; style?: React.CSSProperties }[][] =>
    records.map((record) => {
      const { createdAt, firstName, id, lastName, status } = record

      return [
        {
          children: (
            <Checkbox
              isChecked={isRowChecked(selectedRows, record)}
              onChange={onSelectRowHandler.bind(this, record)}
            ></Checkbox>
          ),
          style: { paddingLeft: isMobile ? '10px' : '20px' },
        },
        { children: createdAt },
        {
          children: (
            <FlexDiv>
              <img alt="" src={AVATAR_URL} width={24} height={24} style={{ borderRadius: '50%' }} />
              <span>
                {firstName} {lastName}
              </span>
            </FlexDiv>
          ),
        },
        {
          children: (
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isMobile ? 'pre-wrap' : 'nowrap' }}>
              {id}
            </p>
          ),
        },
        {
          children: (
            <FlexDiv>
              <StatusPicto status={status} />
              <span>{status}</span>
            </FlexDiv>
          ),
        },
        {
          children: (
            <FlexAlignToRightDiv>
              <Download
                onClick={(e) => {
                  alert(`download ${id}`)
                }}
              />
            </FlexAlignToRightDiv>
          ),
        },
      ]
    })

  const desktopRows: Row[] = renderRows(MockRecords)

  const rowsCollection = desktopRows.map((row) => new PowerfulArray(row))
  const mobileRows = rowsCollection.map((rowCollection) => rowCollection.skip(1).combine(1, 4, customReduce as CustomReduce).array)

  const rows = isMobile ? mobileRows : desktopRows
  // columns
  const isAllChecked = selectedRows.length === rows.length
  const desktopColumns = [
    {
      children: <Checkbox isChecked={isAllChecked} onChange={onSelectAllHandler}></Checkbox>,
      style: { width: '6%' } as React.CSSProperties,
    },
    { children: 'Created at', style: { width: '20%' } as React.CSSProperties },
    { children: 'Name', style: { width: '20%' } as React.CSSProperties },
    {
      children: (
        <FlexDiv>
          <InfoCircle />
          <span>ID</span>
        </FlexDiv>
      ),
      style: { width: '30%' } as React.CSSProperties,
    },
    { children: 'Status', style: { width: '15%' } as React.CSSProperties },
    { children: '', style: { width: '100px' } as React.CSSProperties },
  ]
  const mobileColumns = [
    {
      children: <Checkbox isChecked={isAllChecked} onChange={onSelectAllHandler}></Checkbox>,
      style: { width: '60px', paddingLeft: isMobile ? '10px' : '20px' } as React.CSSProperties,
    },
    { children: 'Person', style: { width: '60%' } as React.CSSProperties },
    { children: '', style: { width: '50px' } as React.CSSProperties },
  ]

  const columns = isMobile ? mobileColumns : desktopColumns

  // tfoot

  const MobileFooter = () => (
    <StyleFooterContainer>
      <StyledButton>
        <StyledButtonText>Afficher plus</StyledButtonText>
      </StyledButton>
    </StyleFooterContainer>
  )

  const DesktopFooter = () => (
    <FlexFooter style={{ width: screen.width < 769 ? 769 : '100%' }}>
      <StyledP>
        <p>1-8 of 1765</p>
      </StyledP>
      <FlexArrowSpan>
        <ButtonSquare>
          <ChevronLeftBold />
        </ButtonSquare>
        <ButtonSquare>
          <ChevronRightBold />
        </ButtonSquare>
      </FlexArrowSpan>
    </FlexFooter>
  )

  const NextPage = () => (isMobile ? <MobileFooter /> : <DesktopFooter />)

  // propsForTable

  const style = {
    table: {
      width: isMobile ? '100%' : screen.width < 769 ? 769 : '100%',
      borderCollapse: 'collapse',
    } as React.CSSProperties,
    thead: {
      height: '64px',
      width: '100%',
      borderRadius: '8px',
      color: theme.colors.neutral2,
      backgroundColor: theme.colors.neutral4Hover,
    },
  }

  const listProps = {
    columns: columns.map(({ children, style }, index) => (
      <td key={index} style={style}>
        {children}
      </td>
    )),
    rows: rows.map((row, index) => (
      <tr style={{ backgroundColor: isRowChecked(selectedRows, records[index]) ? theme.colors.neutral4Hover : '' }}>
        {row.map(({ children, style }, datacell_index) => (
          <StyledTd style={style} key={datacell_index}>
            {children}
          </StyledTd>
        ))}
      </tr>
    )),
  }

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.currentTarget.value)
  }

  return (
    <Theme>
      <div>
        <TextField onChange={handleTextFieldChange} placeholder="Search..." value={textFieldValue} />

        <Table {...listProps} style={style.table} thead={style.thead}></Table>
        <NextPage />
      </div>
    </Theme>
  )
}
