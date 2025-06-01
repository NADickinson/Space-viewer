export const getRandomImage = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}RandomImage`)
    if (!response.ok) {
      throw new Error('response error')
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
