import React from 'react'
import { NasaObject } from '../../App'

export const FavButton = ({
  onClick,
  currentDisplayed,
  currentFavList,
  favStateSetter,
}: {
  onClick: (currentFav: NasaObject[], stateSetter: (toSet: NasaObject[]) => void) => void
  currentDisplayed: NasaObject | undefined
  currentFavList: NasaObject[]
  favStateSetter: (toSet: NasaObject[]) => void
}) => {
  return (
    <button
      onClick={() => {
        if (!currentDisplayed) {
          return
        }
        onClick([...currentFavList, currentDisplayed], favStateSetter)
        console.log(currentFavList)
      }}
    >
      {'Add To Favourites'}
    </button>
  )
}
