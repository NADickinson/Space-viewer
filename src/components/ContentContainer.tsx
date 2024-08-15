import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { BackgroundObject, NasaObject } from '../App'
import { CurrentDescription } from './tool_bar/CurrentDescription'
import { Stars } from '../utils/Stars'
import { ScrollButtons } from '../utils/ScrollButtons'
import { toSixFigureDate } from '../utils/toSixFigureDate'

export const ContentContainer = ({
  src,
  children,
  isDescriptionDisplayed,
  starBackground,
  customiseMenuDisplayed,
  fullscreendisplay,
  setCurrentDisplayed,
}: {
  src: NasaObject | undefined
  children: ReactNode
  isDescriptionDisplayed: boolean
  starBackground: BackgroundObject
  customiseMenuDisplayed: boolean
  fullscreendisplay: boolean
  setCurrentDisplayed: (objectToSet: NasaObject) => void
}) => {
  const todaysDate = useRef<string>(
    toSixFigureDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
  )

  if (!src) {
    return
  }
  return (
    <div className={'image-container'}>
      <Stars starBackground={starBackground} />
      {fullscreendisplay || isDescriptionDisplayed ? undefined : (
        <ScrollButtons setCurrentDisplayed={setCurrentDisplayed} currentDisplayed={src} isLeft={true} />
      )}
      {isDescriptionDisplayed ? (
        <CurrentDescription description={src?.explanation + ' Date of this image: ' + src.date} />
      ) : undefined}
      {src.media_type === 'image' ? (
        <img src={src.hdurl} alt={''} className={'space-image'} />
      ) : (
        <iframe src={src.hdurl} title={'video'} className={'space-image'} style={{ width: '80%' }} />
      )}
      {children}
      {customiseMenuDisplayed ||
      fullscreendisplay ||
      isDescriptionDisplayed ||
      todaysDate.current === src.date ? undefined : (
        <ScrollButtons setCurrentDisplayed={setCurrentDisplayed} currentDisplayed={src} isLeft={false} />
      )}
    </div>
  )
}
