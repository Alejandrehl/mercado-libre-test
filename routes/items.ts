import express, { Request, Response } from 'express'
import request from 'request'

const Router = express.Router()

type AuthorType = {
  name: string
  lastname: string
}

const author: AuthorType = {
  name: 'Alejandro Exequiel',
  lastname: 'Hernández Lara',
}

const getItemDescription: (id: string) => Promise<string> = async (
  id: string,
) => {
  try {
    const uri = `https://api.mercadolibre.com/items/${id}/description`
    const url: string = encodeURI(uri)
    let result = ''

    request.get(url, (error, response, body) => {
      if (error) return error.message
      result = JSON.parse(body).plain_text
    })

    return result
  } catch (err) {
    return err.message
  }
}

// @route   GET api/items?q=query
// @desc    Get items
// @access  Public
Router.get('/', async (req: Request, res: Response) => {
  try {
    const { query } = req
    const { q } = query

    const uri = `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
    const url: string = encodeURI(uri)

    request.get(url, (error, response, body) => {
      if (error) res.status(500).send(error.message)

      const items = JSON.parse(body).results

      const categories: string[] = items.map(
        (item: { category_id: string }) => item.category_id,
      )

      const result = {
        author,
        categories,
        items,
      }

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
    const uri = `https://api.mercadolibre.com/items/${req.params.id}`
    const url: string = encodeURI(uri)

    const description: string = await getItemDescription(req.params.id)
    console.log('DESCRIPTION RESULT', description)

    request.get(url, async (error, response, body) => {
      if (error) res.status(500).send(error.message)

      const item = JSON.parse(body)

      const result = {
        author,
        item: { ...item, description },
      }

      res.status(200).send(result)
    })
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

export default Router
