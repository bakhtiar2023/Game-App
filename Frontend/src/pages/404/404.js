import React from 'react'
import { Link } from 'react-router-dom'
import './404.css'

const NotFound = () => {
  return (
    <div id="main">
      <div className="fof">
        <h1>Error 404</h1>
      </div>
      <div className="tagsFof">
        <div className="row mt-3">
          <p>
            You didnt break the internet, but we cant find what you are
            looking for.
          </p>
        </div>
        <Link className="button mt-3" to={'/lobbygame'}>
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
