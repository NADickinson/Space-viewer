import { is, isArrayOf } from 'ts-guardian'
import { apiKey } from './apiKey'

export const getImageOfTheDay = async (date: string) => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${date}`)
    if (!response.ok) {
      throw new Error('response error')
    }

    const data = await response.json()
    console.log(data)
    // const isNasaObject = is({
    //   copyright: is('string').or('undefined'),
    //   date: 'string',
    //   explanation: 'string',
    //   hdurl: 'string',
    //   media_type: 'string',
    //   service_version: 'string',
    //   title: 'string',
    //   url: 'string',
    // })
    // if (Array.isArray(data)) {
    //   if (data.length === 0) {
    //     return
    //   }
    //   const x = data.filter(obj => {
    //     if (isNasaObject(obj)) {
    //       return isNasaObject(obj)
    //     }
    //   })

    //   const y = isArrayOf(isNasaObject)
    //   if (y(data)) {

    //   }
    // }
    return data
  } catch (err) {
    console.log(err)
  }
}
