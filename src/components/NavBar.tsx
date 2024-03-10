import React, { ReactNode } from 'react'

export const NavBar = ({ children }: { children: ReactNode }) => {
  return <div className={'nav-bar'}>{children}</div>
}
