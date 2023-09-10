/* eslint-disable react/react-in-jsx-scope */
import 'bootstrap/dist/css/bootstrap.css'
import { useLocation } from 'react-router-dom'
import '../App.css'
import { NotFound } from '../AccessAllPages'
import ClosedRoom from '../../components/ClosedRoom'

function P1vsP2Closed () {
  const { state } = useLocation()
  // const data = location.state;
  if (state !== null) {
    console.log(state)
    return (<ClosedRoom name={state}/>)
  //   )
  } else {
    // eslint-disable-next-line react/react-in-jsx-scope
    return (<NotFound />)
  }
}

export default P1vsP2Closed
