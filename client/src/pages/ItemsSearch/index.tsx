import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import ItemContext from '../../context/Item/item.context'

const ItemsSearch: React.FC = () => {
  const { loading, items, error, searchItemsByQuery } = useContext(ItemContext)
  const { query }: any = useParams()
  console.log({ query, loading, items, error })

  useEffect(() => {
    searchItemsByQuery(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div>
      <h1>ItemsSearch</h1>
    </div>
  )
}

export default ItemsSearch
