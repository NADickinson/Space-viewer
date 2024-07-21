import React, { ReactNode } from 'react'
import { Stars } from '../utils/Stars'
import { BackgroundObject } from '../App'

export const BackgroundContainer = ({
  children,
  starBackground,
}: {
  children: ReactNode
  starBackground: BackgroundObject
}) => {
  return (
    <div className="background-container">
      <Stars starBackground={starBackground} />
      {children}
    </div>
  )
}
