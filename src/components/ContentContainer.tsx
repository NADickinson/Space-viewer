import React, { ReactNode, useRef } from 'react'
import { BackgroundObject, NasaObject } from '../App'
import { CurrentDescription } from './tool_bar/CurrentDescription'
import { Stars } from '../utils/Stars'
import { ScrollButtons } from '../utils/ScrollButtons'
import { toSixFigureDate } from '../utils/toSixFigureDate'
import { sixFigureReverse } from '../utils/SixFigureReverse'

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
      <div style={{ color: '#b1b3b3' }}>{src.title.split('APOD:').join('').trim()}</div>
      <Stars starBackground={starBackground} />
      {fullscreendisplay || isDescriptionDisplayed ? undefined : (
        <ScrollButtons setCurrentDisplayed={setCurrentDisplayed} currentDisplayed={src} isLeft={true} />
      )}
      {isDescriptionDisplayed ? (
        <CurrentDescription description={src?.explanation + ' Date of this image: ' + sixFigureReverse(src.date)} />
      ) : undefined}
      {src.media_type === 'image' ? (
        <img src={src.hdurl} alt={''} className={'space-image'} />
      ) : src.hdurl?.includes('youtube.com') ? (
        <iframe src={src.hdurl} title={'video'} className={'space-image'} style={{ width: '80%' }} />
      ) : (
        <video controls className="space-image" style={{ width: '80%' }}>
          <source src={src.hdurl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
