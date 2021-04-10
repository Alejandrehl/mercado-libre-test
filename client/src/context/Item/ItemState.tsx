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

const ItemState: React.FC = ({ children }) => {
  const InitialState: ItemStateType = {
    loading: false,
    error: null,
    item: null,
    items: [],
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
      dispatch({ type: GET_ITEM_BY_ID })
    } catch (err) {
      setError(err.message)
    }
  }

  const searchItemsByQuery: (query: string) => void = async (query: string) => {
    try {
      setLoading()
      dispatch({ type: SEARCH_ITEMS_BY_QUERY })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <ItemContext.Provider
      value={{
        ...state,
        setLoading,
        setError,
        getItemById,
        searchItemsByQuery,
      }}>
      {children}
    </ItemContext.Provider>
  )
}

export default ItemState