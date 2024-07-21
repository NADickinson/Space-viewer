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
      <Slider
        onChange={value => {
          setTime(value === 0 ? 1000 : value * 2000)
        }}
      />
      <div style={{ display: 'flex' }}>
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
