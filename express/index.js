import express from 'express'
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/BigChungus', async (req, res) => {
  const getData = async () => {
    const response = await fetch('https://apod.nasa.gov/apod/ap240622.html')
    const data = await response.text()
    const imgRegex = /<img[^>]+src="([^">]+)"/g
    let imgResult = []
    let match
    while ((match = imgRegex.exec(data)) !== null) {
      imgResult.push(match[1])
    }
    return imgResult
  }
  const finalData = await getData()

  res.send(finalData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//first task is to make express endpoint show me a nasaobject
//first make html page parser and THEN fetch to the standard page eg: below
//https://apod.nasa.gov/apod/ap240619.html
// do the req as a single hardcoded obj
