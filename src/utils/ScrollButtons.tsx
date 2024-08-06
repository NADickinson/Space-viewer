import React from 'react'
import { CustomButton } from '../components/tool_bar/CustomButton'

export const ScrollButtons = ({ classNameStyle }: { classNameStyle: string }) => {
  return (
    <div className={classNameStyle}>
      <CustomButton
        passedStyles={{
          root: {
            backgroundColor: 'transparent',
            fontSize: '1.2rem',
            justifySelf: 'flex-end',
            color: 'black',
            fontWeight: 'bold',
            height: '300px',
            width: '20px',
            borderColor: '#343d46',
            borderRadius: '10px',
          },
          rootHovered: {
            backgroundColor: 'transparent',
            borderColor: 'white',
          },
        }}
        onClick={() => {
          console.log('scroll')
        }}
      >
        {<span className="material-symbols-outlined">arrow_forward_ios</span>}
      </CustomButton>
    </div>
  )
}

//greys darker think vs code, blues darker, text white/light grey, button border rad,description box needs padding betwen and around
