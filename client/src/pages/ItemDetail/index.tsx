import React, { useContext } from 'react'
import { useParams } from 'react-router'
import ItemContext from '../../context/Item/item.context'

const ItemDetail: React.FC = () => {
  const { loading, item, error } = useContext(ItemContext)
  const { id }: any = useParams()
  console.log({ id, loading, item, error })

  return (
    <div>
      <h1>ItemDetail</h1>
    </div>
  )
}

export default ItemDetail
