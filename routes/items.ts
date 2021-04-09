import express, { Request, Response } from 'express'
import request from 'request'

const Router = express.Router()

// @route   GET api/items?q=query
// @desc    Get items
// @access  Public
Router.get('/', async (req: Request, res: Response) => {
  try {
    const { query } = req
    const { q } = query

    const url: string = encodeURI(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}`,
    )

    request.get(url, (error, response, body) => {
      if (error) res.status(500).send(error.message)

      const result = JSON.parse(body).results
      res.status(200).send(result)
    })
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

export default Router
