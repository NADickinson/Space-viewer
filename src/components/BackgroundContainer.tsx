import React, { ReactNode } from 'react'

export const BackgroundContainer = ({ children }: { children: ReactNode }) => {
  return <div className="background-container">{children}</div>
}
