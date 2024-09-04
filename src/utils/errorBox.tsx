import React from 'react'
export const ErrorBox = ({ opacity }: { opacity: number }) => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        bottom: '200%',
        position: 'absolute',
        display: 'flex',
        color: '#b1b3b3',
        transition: 'opacity 4000ms ease-in-out',
        opacity: opacity,
        boxShadow: '0px 0px 5px 5px rgba(0, 0, 255, 0.3)',
        pointerEvents: 'none',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      {' Please Wait A Moment '}
    </div>
  )
}
