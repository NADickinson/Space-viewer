import React from 'react'
import { NasaObject } from '../../App'

export const FavButton = ({
  onClick,
  currentDisplayed,
  currentFavList,
}: {
  onClick: (currentFav: NasaObject[]) => void
  currentDisplayed: NasaObject | undefined
  currentFavList: NasaObject[]
}) => {
  return (
    <button
      onClick={() => {
        if (!currentDisplayed) {
          return
        }
        onClick([...currentFavList, currentDisplayed])
        console.log(currentFavList)
      }}
    >
      {'Add To Favourites'}
    </button>
  )
}
