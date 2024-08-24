import { is } from 'ts-guardian'
import { apiKey } from './apiKey'
import { toSixFigureDate } from '../utils/toSixFigureDate'

export const getRandomImage = async () => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`)
    if (!response.ok) {
      throw new Error('response error')
    }

    const data = await response.json()

    const isNasaObject = is({
      date: 'string',
      explanation: 'string',
      hdurl: 'string',
      media_type: 'string',
      title: 'string',
    })
    if (Array.isArray(data)) {
      const randomObj = data[0]
      if (isNasaObject(randomObj)) {
        let dateStrSplit = randomObj.date.split('-')
        return {
          date: toSixFigureDate(Number(dateStrSplit[0]), Number(dateStrSplit[1]), Number(dateStrSplit[2])),
          explanation: randomObj.explanation,
          hdurl: randomObj.hdurl,
          media_type: randomObj.media_type,
          title: randomObj.title,
        }
      }
    } else return
  } catch (err) {
    console.log(err)
  }
}
