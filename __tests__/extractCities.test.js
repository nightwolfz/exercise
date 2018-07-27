const {readFileSync} = require('fs')
const path = require('path')
const {extractCities} = require('../server/extractCities')

test('extract cities', async() => {
  const html = readFileSync(path.join(__dirname, './samples/wikipedia_cities.html'))
  const result = await extractCities(html)
  expect(result.length).toBeGreaterThan(0)
  expect(result[0].city).toBe('Tokyo')
  expect(result[0].country).toBe('Japan')
  expect(result[0].population).toBe(39800000)
})
