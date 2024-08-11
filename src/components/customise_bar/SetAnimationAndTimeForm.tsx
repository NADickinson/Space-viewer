import React, { useRef } from 'react'
import { CustomButton } from '../tool_bar/CustomButton'
import { Checkbox, Slider } from '@fluentui/react'

export const SetAnimationAndTimeForm = ({
  setTime,
  setSlideShowTransistion,
  slideShowTransistion,
}: {
  setTime: (time: number) => void
  setSlideShowTransistion: (transition: boolean) => void
  slideShowTransistion: boolean
}) => {
  return (
    <div>
      <div style={{ color: '#B1B3B3', padding: '5px' }}>{'Use Slider To Set Image Fade Time On Slideshow'}</div>
      <Slider
        onChange={value => {
          setTime(value === 0 ? 1000 : value * 2000)
        }}
      />
      <div style={{ display: 'flex', padding: '5px' }}>
        <Checkbox
          checked={slideShowTransistion}
          onChange={() => {
            setSlideShowTransistion(!slideShowTransistion)
          }}
        />
        {'Set Slideshow Image Fade'}
      </div>
    </div>
  )
}
