import React from 'react'

const Row = ({ data }) => {
  const tds = data.map((value, index) => <td key={index}>{value}</td>)
  return <tr>{tds}</tr>
}

export default Row
