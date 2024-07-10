import React, { ReactNode } from 'react'
import { NasaObject } from '../App'
import { CurrentDescription } from './tool_bar/CurrentDescription'

export const ContentContainer = ({
  src,
  children,
  isDescriptionDisplayed,
}: {
  src: NasaObject | undefined
  children: ReactNode
  isDescriptionDisplayed: boolean
}) => {
  if (!src) {
    return
  }
  console.log(src)
  return (
    <div className={'image-container'}>
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
