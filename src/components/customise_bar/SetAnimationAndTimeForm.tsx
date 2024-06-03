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
          if (value === 0) {
            setTime(1000)
          }
          setTime(value * 1000)
        }}
      />

      <Checkbox
        checked={slideShowTransistion}
        onChange={() => {
          setSlideShowTransistion(!slideShowTransistion)
        }}
      />
    </div>
  )
}
