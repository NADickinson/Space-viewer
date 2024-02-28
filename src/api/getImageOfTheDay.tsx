import { apiKey } from './apiKey'

export const getImageOfTheDay = async (date: string) => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${date}`)
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
