/* eslint-disable no-unused-vars */

import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { useLocation } from 'react-router-dom'
import '../App.css'
import { NotFound } from '../AccessAllPages'
import OpenRoom from '../../components/OpenRoom'

// eslint-disable-next-line camelcase

function P1vsP2 () {
  const { state } = useLocation()
  // const data = location.state;
  if (state !== null) {
    console.log(state)
    return (<OpenRoom name={state}/>)
  //   )
  } else {
    // eslint-disable-next-line react/react-in-jsx-scope
    return (<NotFound />)
  }
}

export default P1vsP2
