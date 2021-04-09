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

    const uri = `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
    const url: string = encodeURI(uri)
    console.log({ id: req.params.id, uri, url })

    request.get(url, (error, response, body) => {
      if (error) res.status(500).send(error.message)

      const result = JSON.parse(body).results
      res.status(200).send(result)
    })
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

// @route   GET api/items/:id
// @desc    Get item by ID
// @access  Public
Router.get('/:id', async (req: Request, res: Response) => {
  try {
    const uri = `https://api.mercadolibre.com/items/​${req.params.id}`
    const url: string = encodeURI(uri)
    console.log({ id: req.params.id, uri, url })

    request.get(url, (error, response, body) => {
      if (error) res.status(500).send(error.message)

      const result = JSON.parse(body)
      res.status(200).send(result)
    })
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

export default Router
