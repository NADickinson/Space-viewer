import React, { useEffect, useRef, useState } from 'react'
import { NasaObject, PlayList } from '../../App'
import { getPlaylistFromId, isPlaylist } from '../../api/playlistFunctions'
import { is, isArrayOf } from 'ts-guardian'
import { CustomButton } from '../tool_bar/CustomButton'

export const FullScreenDisplay = ({
  isDisplayed,
  playlists,
  selectedPlayList,
  currentInterval,
  slideShowTransistion,
  setIsDisplayed,
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
  const localPlaylist = useRef<NasaObject[]>()

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
              const currentPlaylist = getPlaylistFromId(selectedPlayList, playlists)?.list.filter(obj => {
                return obj.media_type === 'image'
              })
              if (currentPlaylist) {
                localPlaylist.current = currentPlaylist
              }
              if (currentPlaylist && currentIndex < currentPlaylist.length - 1) {
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
  }, [isImageVisible, currentInterval, fadeDuration, isDisplayed, playlists, selectedPlayList, isString])

  if (isDisplayed && playlists && selectedPlayList) {
    return (
      <div className="full-screen-display">
        <div
          style={{
            zIndex: '5000',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'row-reverse',
            position: 'absolute',
            right: '5px',
            top: '5px',
          }}
        >
          <CustomButton text={'Close'} onClick={() => setIsDisplayed(!isDisplayed)} />
        </div>
        <img
          style={{
            opacity: isImageVisible ? 1 : 0,
            transition: `opacity ${fadeDuration}ms ease-in-out`,
          }}
          src={localPlaylist.current ? localPlaylist.current[index].hdurl : undefined}
          alt={''}
          className="space-image-full"
        />
      </div>
    )
  }
}
