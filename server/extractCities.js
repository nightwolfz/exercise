import cheerio from 'cheerio'
import {trim} from 'lodash'
import request from '../core/request'
import config from '../server/config'

// Guess we need some ugly queries to extract the data
export async function extractCities(html) {
  const query = cheerio.load(html)
  const table = query('#bodyContent #mw-content-text table.sortable.wikitable')

  // Look inside rows, extract relevant data
  const entries = table.find('tr').map(function(i, el) {
    const subquery = query(this, el)
    const population = parsePopulation(subquery.find('td').eq(4).text())
    const url = `https://en.wikipedia.org${subquery.find('td a').first().attr('href')}`
    return {
      city: subquery.find('td a').first().text(),
      country: subquery.find('td a').eq(2).text(),
      population,
      url,
    }
  }).get().filter(x => x.city)

  // For the bonus material (this is going to make everything SLOW)
  if (config.enableDescriptions) {
    for(let entry of entries) {
      const descQuery = cheerio.load(await request.get(entry.url))
      const descriptions = descQuery('.mw-parser-output > p')

      entry.description = trim(descriptions.first().text())
      || trim(descriptions.eq(1).text())
    }
  }

  return entries
}

function parsePopulation(text) {
  return parseInt(trim(text).replace(/,/g, ''))
}
