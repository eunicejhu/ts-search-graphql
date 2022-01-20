import { ChevronRightBold } from '@pretto/picto'
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

        <ButtonSquare>
          <ChevronRightBold />
        </ButtonSquare>

        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
        <Table
          options={{ checkable: true }}
          data={{
            header: [],
            rows: [
              [<Checkbox data-testid="check-1" id="check-1" isChecked={false} onChange={() => {}} />, '1', 'ava1'],
            ],
          }}
        ></Table>
      </div>
    </Theme>
  )
}
