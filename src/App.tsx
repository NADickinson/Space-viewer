import React, { useEffect, useState } from 'react'
import { getImageOfTheDay } from './api/getImageOfTheDay'
import { ContentContainer } from './components/ContentContainer'
import { BackgroundContainer } from './components/BackgroundContainer'
import { NavBar } from './components/NavBar'
import { ToolBar } from './components/tool_bar/ToolBar'
import { CustomSelect } from './components/tool_bar/CustomSelect'
import { CustomButton } from './components/tool_bar/CustomButton'
import { CustomiseBar } from './components/customise_bar/CustomiseBar'
import { months, monthsForDropDown, yearsForDropDown } from './api/dateFunction'
import { getRandomImage } from './api/getRandomImage'
import {
  deletePlaylist,
  getPlaylistFromId,
  isPlaylist,
  loadPlaylists,
  updateOrAddPlaylist,
} from './api/playlistFunctions'
import { isArrayOf } from 'ts-guardian'
import { AddNewPlaylistForm } from './components/customise_bar/AddNewPlaylistForm'
import { EditPlaylistBox } from './components/customise_bar/EditPlaylistBox'
import { FullScreenDisplay } from './components/full_screen/FullScreen'
import { SetAnimationAndTimeForm } from './components/customise_bar/SetAnimationAndTimeForm'
import { DeletePlaylistOption } from './components/customise_bar/DeletePlaylistOption'

export type NasaObject = {
  copyright: string | undefined
  date: string
  explanation: string | undefined
  hdurl: string | undefined
  media_type: string | undefined
  service_version: string | undefined
  title: string
  url: string | undefined
}

export type PlayList = { name: string; id: string; list: NasaObject[] }

export const App = () => {
  const [currentDisplayed, setCurrentDisplayed] = useState<NasaObject>()
  const [apiDataTotal, setApiDataTotal] = useState<NasaObject[]>([])
  const [favList, setFavList] = useState<PlayList>()
  const [customiseMenuDisplayed, setCustomiseMenuDisplayed] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurentMonth] = useState(new Date().getMonth())
  const [isDescriptionDisplayed, setIsDescriptionDisplayed] = useState(false)
  const [playLists, setPlayLists] = useState<PlayList[]>()
  const [selectedId, setSelectedId] = useState<string>()
  const [slideShowDisplayed, setSlideShowDisplayed] = useState<boolean>(false)
  const [currentInterval, setCurrentInterval] = useState(3000)
  const [slideShowTransistion, setSlideShowTransistion] = useState<boolean>(true)
  const [deleteOption, setDeleteOption] = useState<boolean>(false)

  useEffect(() => {
    const getPhoto = async () => {
      const data = await getImageOfTheDay('')
      if (data === undefined) {
        return
      }
      setCurrentDisplayed(data[0])
      const data2 = await getImageOfTheDay(`${currentYear}-${currentMonth + 1}-01`)
      if (data2 === undefined) {
        return
      }
      setApiDataTotal(data2)
      const loadedPlaylists = loadPlaylists()
      if (isArrayOf(isPlaylist)(loadedPlaylists)) {
        setPlayLists(loadedPlaylists)
        setFavList(
          loadedPlaylists.find(playlist => {
            return playlist.name === 'Favourites'
          })
        )
      }
    }
    getPhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const conditionallySetDropdownForImageSelect = async () => {
      const data = await getImageOfTheDay(`${currentYear}-${currentMonth + 1}-01`)
      if (data === undefined) {
        return
      }
      setApiDataTotal(data)
    }
    conditionallySetDropdownForImageSelect()
  }, [currentYear, currentMonth])

  const selectedPlaylist = selectedId && playLists ? getPlaylistFromId(selectedId, playLists) : undefined

  return (
    <BackgroundContainer>
      <FullScreenDisplay
        setIsDisplayed={setSlideShowDisplayed}
        isDisplayed={slideShowDisplayed}
        playlists={playLists}
        selectedPlayList={selectedId}
        currentInterval={currentInterval}
        slideShowTransistion={slideShowTransistion}
      />
      <NavBar>
        <div style={{ flex: 1 }}></div>
        <CustomButton
          text={'Customise'}
          onClick={() => {
            setCustomiseMenuDisplayed(!customiseMenuDisplayed)
          }}
        />
      </NavBar>

      <ContentContainer src={currentDisplayed} isDescriptionDisplayed={isDescriptionDisplayed}>
        {customiseMenuDisplayed ? (
          <CustomiseBar>
            <AddNewPlaylistForm setPlaylists={setPlayLists} />
            {playLists ? (
              <CustomSelect
                options={playLists}
                toId={option => {
                  return option.id
                }}
                toText={option => {
                  return option.name
                }}
                placeHolder={selectedPlaylist ? selectedPlaylist?.name : 'Select Your PlayList To Edit'}
                onChange={opt => {
                  setSelectedId(opt.id)
                }}
              />
            ) : undefined}

            {selectedPlaylist && playLists ? (
              <EditPlaylistBox
                playListToEdit={selectedPlaylist}
                playLists={playLists}
                setPlayLists={setPlayLists}
                setCurrentDisplayed={setCurrentDisplayed}
              />
            ) : undefined}

            {selectedPlaylist ? (
              <CustomButton
                text={'Delete Selected Playlist'}
                onClick={() => {
                  setDeleteOption(true)
                }}
              />
            ) : undefined}

            {deleteOption && selectedPlaylist ? (
              <DeletePlaylistOption
                selectedId={selectedId}
                playLists={playLists}
                setPlayLists={setPlayLists}
                setSelectedId={setSelectedId}
                setDeleteOption={setDeleteOption}
              />
            ) : undefined}

            {selectedPlaylist ? (
              <SetAnimationAndTimeForm
                setTime={setCurrentInterval}
                setSlideShowTransistion={setSlideShowTransistion}
                slideShowTransistion={slideShowTransistion}
              />
            ) : undefined}
          </CustomiseBar>
        ) : undefined}
      </ContentContainer>
      <ToolBar>
        <CustomSelect
          options={yearsForDropDown()}
          toId={option => {
            return option.toString()
          }}
          toText={option => {
            return option.toString()
          }}
          onChange={setCurrentYear}
          placeHolder="Select Year"
        />
        <CustomSelect
          options={monthsForDropDown(currentYear)}
          toId={option => {
            return option.toString()
          }}
          toText={option => {
            return months[option]
          }}
          onChange={option => {
            setCurentMonth(option)
          }}
          placeHolder="Select Month"
        />
        <CustomSelect
          options={apiDataTotal}
          toId={option => {
            return option.date
          }}
          toText={option => {
            return option.title
          }}
          onChange={setCurrentDisplayed}
          placeHolder="Select Your Image"
        />
        <CustomButton
          text={'Add To Selected Playlist'}
          onClick={() => {
            if (!currentDisplayed) {
              return
            } else {
              if (selectedPlaylist) {
                const newCurrent = { ...selectedPlaylist, list: [...selectedPlaylist.list, currentDisplayed] }
                updateOrAddPlaylist(newCurrent)
                const loadedPlaylists = loadPlaylists()
                setPlayLists(loadedPlaylists)
              }
            }
          }}
        />
        {playLists ? (
          <CustomSelect
            options={playLists}
            toId={option => {
              return option.id
            }}
            toText={option => {
              return option.name
            }}
            onChange={opt => {
              setSelectedId(opt.id)
            }}
            placeHolder={'Currently Selected Playlist'}
          />
        ) : undefined}
        <CustomButton
          text={'See Random Image'}
          onClick={async () => {
            const data = await getRandomImage()
            setCurrentDisplayed(data)
          }}
        />
        <CustomButton
          text={'See Description'}
          onClick={() => {
            setIsDescriptionDisplayed(!isDescriptionDisplayed)
          }}
        />
        <CustomButton
          text={'Play SlideShow'}
          onClick={() => {
            setSlideShowDisplayed(!slideShowDisplayed)
          }}
        />
      </ToolBar>
    </BackgroundContainer>
  )
}
