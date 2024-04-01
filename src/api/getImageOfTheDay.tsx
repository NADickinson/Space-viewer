import { is, isArrayOf } from 'ts-guardian'
import { apiKey } from './apiKey'

export const getImageOfTheDay = async (date: string) => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${date}`)
    if (!response.ok) {
      throw new Error('response error')
    }

    const data = (await response.json()) as unknown
    console.log(data)
    const isNasaObject = is({
      copyright: is('string').or('undefined'),
      date: is('string'),
      explanation: is('string').or('undefined'),
      hdurl: is('string').or('undefined'),
      media_type: is('string').or('undefined'),
      service_version: is('string').or('undefined'),
      title: is('string'),
      url: is('string').or('undefined'),
    })

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return
      }
      if (isArrayOf(isNasaObject)(data)) {
        return data
      }
    } else if (isNasaObject(data)) return [data]
  } catch (err) {
    console.log(err)
  }
}
