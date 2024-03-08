import React, { useEffect, useState } from 'react'
import { getImageOfTheDay } from './api/getImageOfTheDay'
import { ContentContainer } from './components/ContentContainer'
import { BackgroundContainer } from './components/BackgroundContainer'
import { NavBar } from './components/NavBar'
import { ToolBar } from './components/tool_bar/ToolBar'
import { CustomSelect, dropDownFormatConversion } from './components/tool_bar/CustomSelect'
import { CustomButton } from './components/tool_bar/CustomButton'

export type NasaObject = {
  copyright: string
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

  useEffect(() => {
    const getPhoto = async () => {
      const data = await getImageOfTheDay('')
      setCurrentDisplayed(data)
      console.log(data)
      const data2 = await getImageOfTheDay('2024-02-01')
      setApiDataTotal(data2)
      console.log(data2)
      console.log(dropDownFormatConversion(data2))
      console.log(apiDataTotal)
      const localStorageFavs = localStorage.getItem('favs')
      if (localStorageFavs !== null) {
        setFavList(JSON.parse(localStorageFavs))
      }
    }

    getPhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BackgroundContainer>
      <NavBar />
      <ContentContainer src={currentDisplayed} />
      <ToolBar>
        <CustomSelect optionsToBe={apiDataTotal} onChange={setCurrentDisplayed} />
        <CustomButton
          onClick={() => {
            if (currentDisplayed) {
              setFavList([...favList, currentDisplayed])
              localStorage.setItem('favs', JSON.stringify([...favList, currentDisplayed]))
              console.log(favList)
            }
          }}
        ></CustomButton>
      </ToolBar>
    </BackgroundContainer>
  )
}
