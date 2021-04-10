/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SET_ERROR,
  SET_LOADING,
  GET_ITEM_BY_ID,
  SEARCH_ITEMS_BY_QUERY,
  SET_QUERY,
} from '../types'

import { ItemStateType } from './item.types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: ItemStateType, action: any): any => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case SEARCH_ITEMS_BY_QUERY:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    case GET_ITEM_BY_ID:
      return {
        ...state,
        loading: false,
        item: action.payload,
      }
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      }
    default:
      return state
  }
}
