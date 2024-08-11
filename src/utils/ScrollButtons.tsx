import React, { useEffect, useState } from 'react'
import { CustomButton } from '../components/tool_bar/CustomButton'
import { getImageOfTheDay } from '../api/getImageOfTheDay'
import { toSixFigureDate } from './toSixFigureDate'
import { NasaObject } from '../App'

export const ScrollButtons = ({ isLeft, currentDisplayed }: { isLeft: boolean; currentDisplayed: NasaObject }) => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState()
  useEffect(() => {
    console.log(currentDisplayed)
  }, [currentDisplayed])
  return (
    <div className={isLeft ? 'scroll_button_left' : 'scroll_button_right'}>
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
            borderColor: 'transparent',
            borderRadius: '10px',
          },
          rootHovered: {
            backgroundColor: 'transparent',
            borderColor: 'white',
          },
        }}
        onClick={async () => {
          console.log('scroll')
        }}
      >
        <div style={{ display: 'flex', position: 'absolute' }}>
          <svg
            style={{ flex: 1, width: '100%', height: '100%', transform: isLeft ? 'scale(-1.2, 2)' : 'scale(1.2, 2)' }}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L15.71 12 11.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 12 19z"
              fill="white"
            />
          </svg>
        </div>
      </CustomButton>
    </div>
  )
}
