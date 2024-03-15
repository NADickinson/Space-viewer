import React, { ReactNode } from 'react'
import { NasaObject } from '../App'

export const ContentContainer = ({ src, children }: { src: NasaObject | undefined; children: ReactNode }) => {
  if (!src) {
    return
  }
  return (
    <div className={'image-container'}>
      {src.media_type === 'image' ? (
        <img src={src.hdurl} alt={''} className={'space-image'} />
      ) : (
        <iframe src={src.url} title={'video'} className={'space-image'} style={{ width: '80%' }} />
      )}
      {children}
    </div>
  )
}
