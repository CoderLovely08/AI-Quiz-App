import React from 'react'

const ResponseText = ({userType, text}) => {
  return (
    <h3 className='text-left font-bold'>{userType}: {text} </h3>
  )
}

export default ResponseText