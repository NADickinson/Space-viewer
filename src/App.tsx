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
import { deletePlaylist, isPlaylist, loadPlaylists, updateOrAddPlaylist } from './api/loadPlaylists'
import { isArrayOf } from 'ts-guardian'
import { AddNewPlaylistForm } from './components/customise_bar/AddNewPlaylistForm'
import { EditPlaylistBox } from './components/customise_bar/EditPlaylistBox'

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
  const [currentPlayList, setCurrentPlayList] = useState<PlayList>()
  const [playListToEdit, setPlayListToEdit] = useState<PlayList>()
  const [selectedId, setSelectedId] = useState('')

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

        if (favList) {
          setCurrentPlayList(favList)
        }
      }
    }
    getPhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPlayLists(loadPlaylists())
  }, [playListToEdit, currentPlayList])

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

  return (
    <BackgroundContainer>
      <NavBar>
        <div style={{ flex: 1 }}></div>
        <CustomButton
          text={'Customise'}
          onClick={() => {
            setCustomiseMenuDisplayed(!customiseMenuDisplayed)
          }}
          passedStyles={{
            root: {
              backgroundColor: '#CEABD8',
              borderColor: '#B681C5',
              fontSize: '1.2rem',
              justifySelf: 'flex-end',
            },
          }}
        />
      </NavBar>

      <ContentContainer src={currentDisplayed} isDescriptionDisplayed={isDescriptionDisplayed}>
        {customiseMenuDisplayed ? (
          <CustomiseBar>
            <div>{'!!!!!!!!!!'}</div>
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
                placeHolder={playListToEdit ? playListToEdit.toString() : 'Select Your PlayList To Edit'}
                onChange={setPlayListToEdit}
              />
            ) : undefined}
            {playListToEdit && playLists ? (
              <EditPlaylistBox playListToEdit={playListToEdit} playLists={playLists} setPlayLists={setPlayLists} />
            ) : undefined}

            {playListToEdit ? (
              <CustomButton
                text={'Delete Selected Playlist'}
                onClick={() => {
                  deletePlaylist(playListToEdit)
                  setPlayLists(loadPlaylists())
                  if (!playLists?.includes(playListToEdit)) {
                    setPlayListToEdit(undefined)
                  }
                }}
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
              if (currentPlayList) {
                const newCurrent = { ...currentPlayList, list: [...currentPlayList.list, currentDisplayed] }
                setCurrentPlayList(newCurrent)
                updateOrAddPlaylist(newCurrent)
                if (playListToEdit) {
                  setPlayListToEdit(newCurrent)
                }
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
            onChange={setCurrentPlayList}
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
      </ToolBar>
    </BackgroundContainer>
  )
}

//why change whats in here across the app to be id's if u search === in search where is it an issue and why
//delete all playlists and favs, refresh page, local storage is empty arr

//single piece of state per piece of data, shouldnt have playlist to edit and selected playlist ,
// should instead both just be a string id which is set then renders the playlist basedoff that
//when you pick a selected playlist and edit they are always set the same cant have 2 diff picked
// abstract app so components are nested in one big component with minimal prop pass downage
