/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer } from 'react'
import {
  SET_ERROR,
  SET_LOADING,
  GET_ITEM_BY_ID,
  SEARCH_ITEMS_BY_QUERY,
} from '../types'
import itemReducer from './item.reducer'
import ItemContext from './item.context'

import { ItemStateType } from './item.types'
import { api } from '../../utils/api'
import { SET_QUERY } from '../types'

const ItemState: React.FC = ({ children }) => {
  const InitialState: ItemStateType = {
    loading: false,
    error: null,
    item: null,
    items: [],
    query: '',
  }

  const [state, dispatch] = useReducer(itemReducer, InitialState) as [
    ItemStateType,
    React.Dispatch<any>,
  ]

  const setLoading: (value?: boolean) => void = (value = true) =>
    dispatch({ type: SET_LOADING, payload: value })

  const setError: (msg: string) => void = (msg: string) =>
    dispatch({ type: SET_ERROR, payload: msg })

  const getItemById: (id: string) => void = async (id: string) => {
    try {
      setLoading()
      const res = await api.get(`/items/${id}`)
      dispatch({ type: GET_ITEM_BY_ID, payload: res.data })
    } catch (err) {
      setError(err.response.data)
    }
  }

  const searchItemsByQuery: (query: string) => void = async (query: string) => {
    try {
      setLoading()
      const res = await api.get(`/items?q=${query}`)
      dispatch({ type: SEARCH_ITEMS_BY_QUERY, payload: res.data })
    } catch (err) {
      setError(err.response.data)
    }
  }

  const setQuery: (value: string) => void = (value: string) =>
    dispatch({ type: SET_QUERY, payload: value })

  return (
    <ItemContext.Provider
      value={{
        ...state,
        setLoading,
        setError,
        getItemById,
        searchItemsByQuery,
        setQuery,
      }}>
      {children}
    </ItemContext.Provider>
  )
}

export default ItemState
