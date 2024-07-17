import { is } from 'ts-guardian'

export const getImageOfTheDay = async (date: string) => {
  console.log(date)
  try {
    const response = await fetch(`http://localhost:3001/SpaceViewer?date=${date}`)
    if (!response.ok) {
      throw new Error('response error')
    }

    const data = (await response.json()) as unknown
    console.log(data)
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
