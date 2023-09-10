/* eslint-disable react/prop-types */
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import {
  Login,
  Register,
  PlayerVsCom,
  P1vsP2,
  CreateRoom,
  LobbyGame,
  GameHistory,
  HomePage,
  NotFound,
  StaticPage,
  P1vsP2Closed
} from '../../pages/AccessAllPages'

const RequiredAuth = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken === null) {
    return <Navigate to={'/login'} />
  }
  return <>{children}</>
}
function Halaman () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StaticPage />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/playervscom" element={<RequiredAuth><PlayerVsCom /></RequiredAuth>}></Route>
          <Route path="/p1vsp2" element={<RequiredAuth><P1vsP2 /></RequiredAuth>}></Route>
          <Route path="/p1vsp2closed" element={<RequiredAuth><P1vsP2Closed /></RequiredAuth>}></Route>
          <Route path="/lobbygame" element={<RequiredAuth><LobbyGame /></RequiredAuth>}></Route>
          <Route path="/createRoom" element={<RequiredAuth><CreateRoom /></RequiredAuth>}></Route>
          <Route path="/gamehistory" element={<RequiredAuth><GameHistory /></RequiredAuth>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default Halaman
