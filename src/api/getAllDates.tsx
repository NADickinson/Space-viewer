export const getAllData = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}SpaceData`)
    if (!response.ok) {
      throw new Error('response error')
    }
    const data = response.json()

    return data
  } catch (err) {
    console.log(err)
  }
}
