import React, { useEffect, useState } from 'react'
import { PlayList } from '../../App'
import { getPlaylistFromId, isPlaylist } from '../../api/playlistFunctions'
import { is, isArrayOf } from 'ts-guardian'

export const FullScreenDisplay = ({
  isDisplayed,
  playlists,
  selectedPlayList,
  currentInterval,
  slideShowTransistion,
}: {
  isDisplayed: boolean
  playlists: PlayList[] | undefined
  selectedPlayList: string | undefined
  currentInterval: number
  slideShowTransistion: boolean
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const isString = is('string')
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (isDisplayed) {
      const intervalId = setInterval(() => {
        if (slideShowTransistion) {
          setOpacity(0)
        }

        setCurrentIndex(currentIndex => {
          if (isString(selectedPlayList) && isArrayOf(isPlaylist)(playlists)) {
            const currentPlaylist = getPlaylistFromId(selectedPlayList, playlists)
            if (currentPlaylist && currentIndex < currentPlaylist.list.length - 1) {
              console.log(currentIndex)
              return currentIndex + 1
            } else {
              return 0
            }
          }
          return currentIndex
        })
        setOpacity(1)
      }, currentInterval)
      return () => clearInterval(intervalId)
    }
  }, [isDisplayed, selectedPlayList, playlists])

  if (isDisplayed && playlists && selectedPlayList && slideShowTransistion) {
    return (
      <div
        className="full-screen-display"
        style={{
          transition: `opacity ${currentInterval / 4} linear`,
          opacity,
        }}
      >
        <img
          src={getPlaylistFromId(selectedPlayList, playlists)?.list[currentIndex].url}
          alt={''}
          className="space-image-full"
        ></img>
      </div>
    )
  }
}

//closures chatgpt- front end masters
//custom hooks
