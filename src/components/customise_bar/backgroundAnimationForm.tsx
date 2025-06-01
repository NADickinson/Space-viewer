import { Checkbox } from '@fluentui/react'
import { BackgroundObject } from '../../App'
import React from 'react'

export const BackgroundAnimationForm = ({
  backgroundObject,
  setBackgroundObject,
}: {
  backgroundObject: BackgroundObject
  setBackgroundObject: (backgroundObject: BackgroundObject) => void
}) => {
  return (
    <div>
      <div style={{ display: 'flex', padding: '5px' }}>
        <Checkbox
          checked={backgroundObject.moving}
          onChange={() => {
            setBackgroundObject(
              backgroundObject.moving
                ? { moving: false, staticBackground: false, flashing: false }
                : { moving: true, staticBackground: false, flashing: false }
            )
          }}
        />
        {'Moving Stars Background'}
      </div>
      <div style={{ display: 'flex', padding: '5px' }}>
        <Checkbox
          checked={backgroundObject.staticBackground}
          onChange={() => {
            setBackgroundObject(
              backgroundObject.staticBackground
                ? { moving: false, staticBackground: false, flashing: false }
                : { moving: false, staticBackground: true, flashing: false }
            )
          }}
        />
        {'Static Stars Background'}
      </div>
      <div style={{ display: 'flex', padding: '5px' }}>
        <Checkbox
          checked={backgroundObject.flashing}
          onChange={() => {
            setBackgroundObject(
              backgroundObject.flashing
                ? { moving: false, staticBackground: false, flashing: false }
                : { moving: false, staticBackground: false, flashing: true }
            )
          }}
        />
        {'Flashing Stars Background'}
      </div>
    </div>
  )
}
