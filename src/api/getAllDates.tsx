export const getAllData = async () => {
  try {
    const response = await fetch(`http://localhost:3001/SpaceData`)
    if (!response.ok) {
      throw new Error('response error')
    }
    const data = response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
