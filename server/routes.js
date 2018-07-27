import Router from 'koa-router'
import request from '../core/request'
import {extractCities} from './extractCities'

const router = new Router()

router.get('/', async(ctx) => {
  const url = `https://en.wikipedia.org/wiki/List_of_metropolitan_areas_in_Asia`
  const response = await request.get(url)
  ctx.body = await extractCities(response)
})

export default router
