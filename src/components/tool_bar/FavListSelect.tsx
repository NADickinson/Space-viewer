import React from 'react'
import { NasaObject } from '../../App'

export const FavListSelect = ({ favList }: { favList: NasaObject[] }) => {
  if (favList.length === 0) {
    return undefined
  }
  return (
    <div style={{ maxHeight: '200px', overflow: 'scroll' }}>
      {favList.map(item => {
        return <div>{item.title} </div>
      })}
    </div>
  )
}
