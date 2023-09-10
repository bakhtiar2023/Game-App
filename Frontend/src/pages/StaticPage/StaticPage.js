import { Link, Outlet } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '../App.css'
import logo from '../../assets/images/logo.svg'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
function StaticPage () {
  const userRedux = useSelector((state) => state.user)
  const [user, setUser] = useState('')

  const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const authorization = accessToken.split(' ')[1]
      const token = jwt_decode(authorization)
      const username = token.username
      return username
    }
    return userRedux.user
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.reload()
  }

  useEffect(() => {
    const username = getAccessToken()
    setUser(username)
  }, [])

  return (
    <>
      <nav className="navbar-nav">
        <Link className="navbar-logo" to={'/'}>
          <img src={logo} alt="Rock Paper Scissors" className="icons-logo" />
          <div className="form-link">Home</div>
        </Link>
        <div className="navbar-register">
          {user
            ? (
            <>
              <Link className={'form-link'} to={'/lobbygame'} replace>
                Games
              </Link>
              <p className="usernameNavbar">{user}</p>
              <Link
                className={'form-link'}
                to={'/'}
                refresh="true"
                onClick={handleLogout}
                replace
              >
                Logout
              </Link>
            </>
              )
            : (
            <>
              <Link
                className="form-link"
                to={'/login'}
                state={{ value: true }}
                replace
              >
                Sign In
              </Link>
              <Link
                className="form-link"
                to={'/register'}
                state={{ value: true }}
                replace
              >
                Register
              </Link>
            </>
              )}
        </div>
      </nav>
      <section className="home-page">
        <Outlet />
      </section>
      <footer className="footer w-100 text-center text-lg-start text-sm-start text-white">
        <section className="p-lg-3 p-sm-1 pt-lg-0 pt-sm-0 pb-sm-3 pb-xs-0">
          <div className="row d-flex align-items-center">
            <div className="col-lg-6 col-sm-5 col-xs-5 mt-lg-2 m-sm-0 m-xs-0 text-center text-md-start text-sm-start">
              <div className="text-light fw-bold">
                © 2023 Your Games, Inc.All Rights Reserved
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 mt-lg-2 m-sm-0 mt-sm-2 mt-sm-0 text-center text-md-end text-sm-end">
              <Link className="footer-link text-light text-decoration-none text-center me-2">
                PRIVACY POLICY
              </Link>
              <div
                className="vr"
                style={{ color: '#ffffff', width: '2px', opacity: '1' }}
              ></div>
              <Link className="footer-link text-light text-decoration-none ms-2">
                TERMS OF SERVICES
              </Link>

              <div
                className="vr me-2 ms-2"
                style={{ color: '#ffffff', width: '2px', opacity: '1' }}
              ></div>
              <Link className="footer-link text-light text-decoration-none">
                CODE OF CONDUCT
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}

export default StaticPage
