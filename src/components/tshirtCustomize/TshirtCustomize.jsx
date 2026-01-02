import React from 'react'
import { App as TshirtCanvas } from './canvas'
import { Overlay } from './overlay'
import './style.css'

const TshirtCustomize = () => {
  return (
    <div id="main">
      <TshirtCanvas />
      <Overlay />
    </div>
  )
}

export default TshirtCustomize

