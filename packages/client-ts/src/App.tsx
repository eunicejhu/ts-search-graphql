import { ChevronRightBold, ChevronLeftBold } from '@pretto/picto'
import { useState } from 'react'

import './fonts/MaisonNeue.css'

import ButtonSquare from './components/ButtonSquare'
import Checkbox from './components/Checkbox'
import TextField from './components/TextField'

import Theme from './components/Theme'

//to delete
import Table from './components/table'

export default function App() {
  const [isChecked, setIsChecked] = useState(false)
  const [textFieldValue, setTextFieldValue] = useState('')

  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked)
  }

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.currentTarget.value)
  }

  return (
    <Theme>
      <div>
        <TextField onChange={handleTextFieldChange} placeholder="Search..." value={textFieldValue} />

        <Table
          options={{ checkable: true }}
          data={{
            header: { mobile: [], desktop: [] },
            rows: [],
            footer: [
              <p>1-8 of 1765</p>,
              <ButtonSquare>
                <ChevronLeftBold />
              </ButtonSquare>,
              <ButtonSquare>
                <ChevronRightBold />
              </ButtonSquare>,
            ],
          }}
        ></Table>
      </div>
    </Theme>
  )
}
