import { is } from 'ts-guardian'

export const getImageOfTheDay = async (date: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}SpaceViewer?date=${date}`)
    if (!response.ok) {
      throw new Error('response error')
    }

    const data = (await response.json()) as unknown
    const isNasaObject = is({
      date: is('string'),
      explanation: is('string').or('undefined'),
      hdurl: is('string').or('undefined'),
      media_type: is('string').or('undefined'),
      title: is('string'),
    })

    if (isNasaObject(data)) {
      return data
    }
    return undefined
  } catch (err) {
    console.log(err)
  }
}
