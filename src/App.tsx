import React, { useEffect, useState } from 'react'
import { getImageOfTheDay } from './api/getImageOfTheDay'
import { ImageContainer } from './components/ImageContainer'
import { BackgroundContainer } from './components/BackgroundContainer'
import { NavBar } from './components/NavBar'
import { ToolBar } from './components/tool_bar/ToolBar'
import { CustomSelect } from './components/tool_bar/CustomSelect'

export const App = () => {
  const [apiData, setApiData] = useState<{
    copyright: string
    date: string
    explanation: string
    hdurl: string
    media_type: string
    service_version: string
    title: string
    url: string
  }>()
  useEffect(() => {
    const getPhoto = async () => {
      const data = await getImageOfTheDay()
      setApiData(data)
      console.log(data)
    }

    getPhoto()
  }, [])

  return (
    <BackgroundContainer>
      <NavBar />
      <ImageContainer src={apiData ? apiData.url : ''} />
      <ToolBar>
        <CustomSelect options={[{ key: '111', text: '111' }]} />
      </ToolBar>
    </BackgroundContainer>
  )
}

//'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.ts(2686)
//i never have to import react normally?
