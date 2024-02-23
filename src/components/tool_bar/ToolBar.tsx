import React, { ReactNode } from 'react'

export const ToolBar = ({ children }: { children: ReactNode }) => {
  return <div className="tool-bar">{children}</div>
}
