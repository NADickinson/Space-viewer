import React, { ReactNode } from 'react'

export const ImageContainer = ({ src, children }: { src: string; children: ReactNode }) => {
  return (
    <div className={'image-container'}>
      <img src={src} alt={''} className={'space-image'} />
      {children}
    </div>
  )
}
