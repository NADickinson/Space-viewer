import React, { useEffect, useState } from 'react'
import { getImageOfTheDay } from './api/getImageOfTheDay'
import { ContentContainer } from './components/ContentContainer'
import { BackgroundContainer } from './components/BackgroundContainer'
import { NavBar } from './components/NavBar'
import { ToolBar } from './components/tool_bar/ToolBar'
import { CustomSelect, dropDownFormatConversion } from './components/tool_bar/CustomSelect'
import { FavButton } from './components/tool_bar/FavButton'
import { setToLocal } from './api/setToLocal'

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
    }

    getPhoto()
  }, [])

  useEffect(() => {
    const getPhoto = async () => {
      const data = await getImageOfTheDay('2024-02-01')
      setApiDataTotal(data)
      console.log(data)
      console.log(dropDownFormatConversion(data))
      console.log(apiDataTotal)
    }

    getPhoto()
  }, [])

  return (
    <BackgroundContainer>
      <NavBar />
      <ContentContainer src={currentDisplayed} />
      <ToolBar>
        <CustomSelect optionsToBe={apiDataTotal} onChange={setCurrentDisplayed} />
        <FavButton
          onClick={setToLocal}
          currentDisplayed={currentDisplayed}
          currentFavList={favList}
          favStateSetter={setFavList}
        />
      </ToolBar>
    </BackgroundContainer>
  )
}

//'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.ts(2686)
//i never have to import react normally?
