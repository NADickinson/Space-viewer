import React, { ReactNode } from 'react'
import { BackgroundObject, NasaObject } from '../App'
import { CurrentDescription } from './tool_bar/CurrentDescription'
import { Stars } from '../utils/Stars'

export const ContentContainer = ({
  src,
  children,
  isDescriptionDisplayed,
  starBackground,
}: {
  src: NasaObject | undefined
  children: ReactNode
  isDescriptionDisplayed: boolean
  starBackground: BackgroundObject
}) => {
  if (!src) {
    return
  }
  console.log(src)
  return (
    <div className={'image-container'}>
      <Stars starBackground={starBackground} />
      {isDescriptionDisplayed ? (
        <CurrentDescription description={src?.explanation + ' Date of this image: ' + src.date} />
      ) : undefined}
      {src.media_type === 'image' ? (
        <img src={src.hdurl} alt={''} className={'space-image'} />
      ) : (
        <iframe src={src.hdurl} title={'video'} className={'space-image'} style={{ width: '80%' }} />
      )}
      {children}
    </div>
  )
}
