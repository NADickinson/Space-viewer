import React, { ReactNode } from 'react'
import { NasaObject } from '../App'

export const ContentContainer = ({ src }: { src: NasaObject | undefined }) => {
  if (!src) {
    return
  }
  return (
    <div className={'image-container'}>
      {src.media_type === 'image' ? (
        <img src={src.hdurl} alt={''} className={'space-image'} />
      ) : (
        <video>
          <source src={src.url} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
