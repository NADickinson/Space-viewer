import React, { useEffect, useState } from 'react'
import { CustomButton } from '../components/tool_bar/CustomButton'
import { getImageOfTheDay } from '../api/getImageOfTheDay'
import { toSixFigureDate } from './toSixFigureDate'
import { NasaObject } from '../App'
export const ScrollButtons = ({
  isLeft,
  currentDisplayed,
  setCurrentDisplayed,
}: {
  isLeft: boolean
  currentDisplayed: NasaObject
  setCurrentDisplayed: (objectToSet: NasaObject) => void
}) => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState<Date>()
  useEffect(() => {
    let startingYear = currentDisplayed.date.slice(0, 2)
    let startingMonth = currentDisplayed.date.slice(2, 4)
    let startingDay = currentDisplayed.date.slice(4, 6)
    let yearConverted =
      startingYear.startsWith('95') ||
      startingYear.startsWith('96') ||
      startingYear.startsWith('97') ||
      startingYear.startsWith('98') ||
      startingYear.startsWith('99')
        ? Number('19' + startingYear)
        : Number('20' + startingYear)
    let monthConverted = startingMonth.startsWith('0') ? Number(startingMonth.slice(1)) : Number(startingMonth)
    let dayConverted = startingDay.startsWith('0') ? Number(startingDay.slice(1)) : Number(startingDay)
    setCurrentDisplayDate(new Date(yearConverted, monthConverted, dayConverted))
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
          if (isLeft && currentDisplayDate) {
            const newDate = new Date(currentDisplayDate)
            newDate.setDate(currentDisplayDate.getDate() - 1)
            let data = await getImageOfTheDay(
              toSixFigureDate(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
            )

            if (data) {
              setCurrentDisplayed(data)
            }
          } else {
            if (currentDisplayDate) {
              const newDate = new Date(currentDisplayDate)
              newDate.setDate(currentDisplayDate.getDate() + 1)
              let data = await getImageOfTheDay(
                toSixFigureDate(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
              )

              if (data) {
                setCurrentDisplayed(data)
              }
            }
          }
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
