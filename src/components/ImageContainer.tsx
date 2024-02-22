import React from 'react'

export const ImageContainer = ({ src }: { src: string }) => {
  return (
    <div className={'image-container'}>
      <img src={src} alt={''} className={'space-image'} />
    </div>
  )
}
