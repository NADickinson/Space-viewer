import { apiKey } from './apiKey'

export const getImageOfTheDay = async () => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    if (!response.ok) {
      throw new Error('response error')
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
