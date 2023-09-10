/* eslint-disable react/prop-types */
import React from 'react'

const Title = (props) => {
  const { classProps, children } = props
  return <h1 className={classProps}>{children}</h1>
}

export default Title
