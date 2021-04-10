import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import ItemContext from '../../context/Item/item.context'

const ItemDetail: React.FC = () => {
  const { loading, item, error, getItemById } = useContext(ItemContext)
  const { id }: any = useParams()
  console.log({ id, loading, item, error })

  useEffect(() => {
    getItemById(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div>
      <h1>ItemDetail</h1>
      <h3>{loading && 'Cargando...'}</h3>
    </div>
  )
}

export default ItemDetail
