import React from 'react'

/**
 * Internal components
 */
import Header from './Header'
import Row from './Row'

interface Data {
  header: any[] | []
  rows: any[]
}
const Table = ({ data }: { data: Data }) => {
  return (
    <table>
      <thead>
        <tr>
          <Header data={data.header}></Header>
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <Row key={index} data={row}></Row>
        ))}
      </tbody>
    </table>
  )
}

export default Table
