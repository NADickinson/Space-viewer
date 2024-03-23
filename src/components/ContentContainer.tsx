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
  return (
    <div className={'image-container'}>
      {isDescriptionDisplayed ? <CurrentDescription description={src?.explanation} /> : undefined}
      {src.media_type === 'image' ? (
        <img src={src.hdurl} alt={''} className={'space-image'} />
      ) : (
        <iframe src={src.url} title={'video'} className={'space-image'} style={{ width: '80%' }} />
      )}
      {children}
    </div>
  )
}
