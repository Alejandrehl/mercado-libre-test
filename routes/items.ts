/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express'
import request from 'request'
import rp from 'request-promise'

const Router = express.Router()

type AuthorType = {
  name: string
  lastname: string
}

const author: AuthorType = {
  name: 'Alejandro Exequiel',
  lastname: 'Hernández Lara',
}

const getItemById: (id: string) => Promise<any> = async (id: string) => {
  try {
    const uri = `https://api.mercadolibre.com/items/${id}`
    const url: string = encodeURI(uri)

    const result = await rp(url)
    return JSON.parse(result)
  } catch (err) {
    throw new Error('Producto no encontrado')
  }
}

const getItemDescription: (id: string) => Promise<string> = async (
  id: string,
) => {
  try {
    const uri = `https://api.mercadolibre.com/items/${id}/description`
    const url: string = encodeURI(uri)

    const result = await rp(url)
    return JSON.parse(result).plain_text
  } catch (err) {
    throw new Error('Descripción del producto no encontrada')
  }
}

// @route   GET api/items?q=query
// @desc    Get items
// @access  Public
Router.get('/', async (req: Request, res: Response) => {
  try {
    const uri = `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`
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
    res.status(500).send(err.message)
  }
})

// @route   GET api/items/:id
// @desc    Get item by ID
// @access  Public
Router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item: any = await getItemById(req.params.id)
    const description: string = await getItemDescription(req.params.id)

    const result = {
      author,
      item: { ...item, description },
    }

    res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

export default Router
