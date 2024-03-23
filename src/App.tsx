import React, { useEffect, useState } from 'react'
import { getImageOfTheDay } from './api/getImageOfTheDay'
import { ContentContainer } from './components/ContentContainer'
import { BackgroundContainer } from './components/BackgroundContainer'
import { NavBar } from './components/NavBar'
import { ToolBar } from './components/tool_bar/ToolBar'
import { CustomSelect } from './components/tool_bar/CustomSelect'
import { CustomButton } from './components/tool_bar/CustomButton'
import { FavListSelect } from './components/tool_bar/FavListSelect'
import { CustomiseBar } from './components/customise_bar/CustomiseBar'
import { months, monthsForDropDown, yearsForDropDown } from './api/dateFunction'
import { getRandomImage } from './api/getRandomImage'

export type NasaObject = {
  copyright?: string
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

export const App = () => {
  const [currentDisplayed, setCurrentDisplayed] = useState<NasaObject>()
  const [apiDataTotal, setApiDataTotal] = useState<NasaObject[]>([])
  const [favList, setFavList] = useState<NasaObject[]>([])
  const [customiseMenuDisplayed, setCustomiseMenuDisplayed] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurentMonth] = useState(new Date().getMonth())
  const [isDescriptionDisplayed, setIsDescriptionDisplayed] = useState(false)
  useEffect(() => {
    const getPhoto = async () => {
      const data = await getImageOfTheDay('')
      setCurrentDisplayed(data)
      console.log(data)
      const data2 = await getImageOfTheDay(`${currentYear}-${currentMonth + 1}-01`)
      setApiDataTotal(data2)
      console.log(data2)
      console.log(apiDataTotal)
      const localStorageFavs = localStorage.getItem('favs')
      if (localStorageFavs !== null) {
        setFavList(JSON.parse(localStorageFavs))
      }
    }
    console.log(currentYear, currentMonth)
    getPhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const conditionallySetDropdownForImageSelect = async () => {
      const data = await getImageOfTheDay(`${currentYear}-${currentMonth + 1}-01`)
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
            <FavListSelect favList={favList} />
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
          text={'Add To Favourites'}
          onClick={() => {
            if (currentDisplayed) {
              setFavList([...favList, currentDisplayed])
              localStorage.setItem('favs', JSON.stringify([...favList, currentDisplayed]))
              console.log(favList)
            }
          }}
          passedStyles={{
            root: {
              backgroundColor: '#CEABD8',
              borderColor: '#B681C5',
              fontSize: '1.2rem',
            },
          }}
        />
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
