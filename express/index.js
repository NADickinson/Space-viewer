import express from 'express'
import * as cheerio from 'cheerio'

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/BigChungus', async (req, res) => {
  const getData = async () => {
    const response = await fetch('https://apod.nasa.gov/apod/ap240627.html')
    const data = await response.text()
    console.log('data:', data)
    const imgRegex = /<img[^>]+src="([^">]+)"/gi
    const iframeRegex = /<iframe[^>]+src="([^">]+)"/gi
    const explanationRegex = /<b> Explanation: <\/b>(.*?)<p>/is
    const titleRegex = /<title>\s*(.*?)\s*<\/title>/i
    const date = '1'
    let urlMatch
    let titleMatch

    let resultObj = { date: date }
    while ((urlMatch = imgRegex.exec(data)) !== null) {
      resultObj.hdurl = urlMatch[1]
      resultObj.media_type = 'image'
    }
    while ((urlMatch = iframeRegex.exec(data)) !== null) {
      resultObj.hdurl = urlMatch[1]
      resultObj.media_type = 'video'
    }
    titleMatch = titleRegex.exec(data)
    if (titleMatch !== null) {
      resultObj.title = titleMatch[1].trim()
    }
    console.log(titleMatch)

    let explanationMatch = explanationRegex.exec(data)
    if (explanationMatch !== null) {
      const $ = cheerio.load(data)

      const explanationElement = $('b:contains("Explanation:")').parent()

      explanationElement.find('a').replaceWith((_, elem) => $(elem).text())
      explanationElement.find('br').replaceWith(' ')
      explanationElement.find('p').replaceWith(' ')

      let explanationText = explanationElement.text().replace('Explanation: ', '').trim()
      explanationText = explanationText.replace(/\n/g, ' ')

      resultObj.explanation = explanationText
    }
    console.log(resultObj)

    return resultObj
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
