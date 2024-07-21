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
import { getPlaylistFromId, isPlaylist, loadPlaylists, updateOrAddPlaylist } from './api/playlistFunctions'
import { isArrayOf } from 'ts-guardian'
import { AddNewPlaylistForm } from './components/customise_bar/AddNewPlaylistForm'
import { EditPlaylistBox } from './components/customise_bar/EditPlaylistBox'
import { FullScreenDisplay } from './components/full_screen/FullScreen'
import { SetAnimationAndTimeForm } from './components/customise_bar/SetAnimationAndTimeForm'
import { DeletePlaylistOption } from './components/customise_bar/DeletePlaylistOption'
import { toSixFigureDate } from './utils/toSixFigureDate'
import { getAllData } from './api/getAllDates'
import { BackgroundAnimationForm } from './components/customise_bar/backgroundAnimationForm'

export type NasaObject = {
  date: string
  explanation: string | undefined
  hdurl: string | undefined
  media_type: string | undefined
  title: string
}

export type DateArray = [string, string, string, string]

export type PlayList = { name: string; id: string; list: NasaObject[] }

export type BackgroundObject = { moving: boolean; staticBackground: boolean; flashing: boolean }

export const App = () => {
  const [currentDisplayed, setCurrentDisplayed] = useState<NasaObject>()
  const [apiDataTotal, setApiDataTotal] = useState<DateArray[]>([])
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
  const [currentList, setCurrentList] = useState<DateArray[]>([])
  const [starBackground, setStarBackground] = useState<BackgroundObject>({
    moving: true,
    staticBackground: false,
    flashing: false,
  })

  useEffect(() => {
    const getPhoto = async () => {
      const data = await getImageOfTheDay(toSixFigureDate(currentYear, currentMonth + 1, new Date().getDate()))
      if (data === undefined) {
        console.log('fail')
        return
      }
      console.log(data)
      setCurrentDisplayed(data)
      const data2 = await getAllData()
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
      const x = await getAllData()
      console.log(x)
    }
    getPhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log()
  }, [])

  //so need to update get month and year logic for drop downs, once their good and it displays based off fetch
  //then maybe tweak to get names? for final drop down?
  //then when u select u can do fetch for the one
  useEffect(() => {
    const conditionallySetDropdownForImageSelect = () => {
      const filteredDates = apiDataTotal.filter(dateArr => {
        let convertedMonth = months.findIndex(month => {
          return dateArr[1] === month
        })
        return +dateArr[0] === currentYear && convertedMonth === currentMonth
      })
      setCurrentList(filteredDates)
    }

    conditionallySetDropdownForImageSelect()
  }, [currentYear, currentMonth])

  const selectedPlaylist = selectedId && playLists ? getPlaylistFromId(selectedId, playLists) : undefined

  return (
    <BackgroundContainer starBackground={starBackground}>
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

      <ContentContainer
        src={currentDisplayed}
        isDescriptionDisplayed={isDescriptionDisplayed}
        starBackground={starBackground}
      >
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
            <BackgroundAnimationForm backgroundObject={starBackground} setBackgroundObject={setStarBackground} />
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
          styles={{ dropdown: { width: '500px' } }}
          options={currentList}
          toId={option => {
            return option[0] + option[1] + option[2]
          }}
          toText={option => {
            return option[1] + ' ' + option[2] + ' ' + option[0] + ' ' + option[3]
          }}
          onChange={async option => {
            const res = await getImageOfTheDay(toSixFigureDate(currentYear, currentMonth + 1, +option[2]))
            setCurrentDisplayed(res)
          }}
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
