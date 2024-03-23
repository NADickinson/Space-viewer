import { is } from 'ts-guardian'
import { apiKey } from './apiKey'

export const getRandomImage = async () => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`)
    if (!response.ok) {
      throw new Error('response error')
    }

    const data = await response.json()

    console.log(data)

    const isNasaObject = is({
      copyright: is('string').or('undefined'),
      date: 'string',
      explanation: 'string',
      hdurl: 'string',
      media_type: 'string',
      service_version: 'string',
      title: 'string',
      url: 'string',
    })
    if (Array.isArray(data)) {
      const randomObj = data[0]
      if (isNasaObject(randomObj)) return randomObj
    } else return
  } catch (err) {
    console.log(err)
  }
}
