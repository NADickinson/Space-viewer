import React, { useEffect, useState } from 'react'
import { PlayList } from '../../App'
import { getPlaylistFromId, isPlaylist } from '../../api/playlistFunctions'
import { is, isArrayOf } from 'ts-guardian'
import { CustomButton } from '../tool_bar/CustomButton'

export const FullScreenDisplay = ({
  isDisplayed,
  playlists,
  selectedPlayList,
  currentInterval,
  slideShowTransistion,
  setIsDisplayed, //this is for cross off
}: {
  isDisplayed: boolean
  playlists: PlayList[] | undefined
  selectedPlayList: string | undefined
  currentInterval: number
  slideShowTransistion: boolean
  setIsDisplayed: (display: boolean) => void
}) => {
  const isString = is('string')

  const fadeDuration = slideShowTransistion ? currentInterval / 4 : 0

  const [index, setIndex] = useState(0)
  const [isImageVisible, setIsImageVisible] = useState(true)

  useEffect(() => {
    if (isDisplayed) {
      if (isImageVisible) {
        setTimeout(() => {
          setIsImageVisible(false)
        }, currentInterval - fadeDuration)
      } else {
        setTimeout(() => {
          setIsImageVisible(true)
          setIndex(currentIndex => {
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
        }, fadeDuration)
      }
    }
  }, [isImageVisible, currentInterval, fadeDuration, isDisplayed, playlists, selectedPlayList])

  if (isDisplayed && playlists && selectedPlayList) {
    return (
      <div className="full-screen-display">
        <div style={{ zIndex: '5000', pointerEvents: 'auto', display: 'flex', flexDirection: 'row-reverse' }}>
          <CustomButton text={'Close'} onClick={() => setIsDisplayed(!isDisplayed)} />
        </div>
        <img
          style={{
            opacity: isImageVisible ? 1 : 0,
            transition: `opacity ${fadeDuration}ms ease-in-out`,
          }}
          src={getPlaylistFromId(selectedPlayList, playlists)?.list[index].hdurl}
          alt={''}
          className="space-image-full"
        />
      </div>
    )
  }
}

// //closures chatgpt- front end masters
// //custom hooks
