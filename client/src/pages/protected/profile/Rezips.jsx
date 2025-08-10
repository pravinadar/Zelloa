import React from 'react'
import { useSelector } from 'react-redux'

const Rezips = () => {
  const { DarkMode } = useSelector(state=>state.service);
  return (
    <div style={{ color: DarkMode ? "#f5f5f5" : "#000" }}>Rezips</div>
  )
}

export default Rezips