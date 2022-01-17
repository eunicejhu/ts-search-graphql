import React from 'react'

const Header = ({ data }) => data.map((value, index) => <td key={index}>{value}</td>)

export default Header
