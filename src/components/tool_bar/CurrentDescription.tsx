import React from 'react'

export const CurrentDescription = ({ description }: { description: string | undefined }) => {
  return <div className="currentDescription">{description ? description : 'No Description Available'}</div>
}
