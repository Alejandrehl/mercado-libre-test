import React, { useContext, useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import ItemContext from '../../context/Item/item.context'

const styles = {
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const ItemsSearch: React.FC = () => {
  const {
    loading,
    searchResult,
    error,
    searchItemsByQuery,
    setQuery,
  } = useContext(ItemContext)
  const { query }: any = useParams()
  console.log({ query, loading, searchResult, error })

  useEffect(() => {
    setQuery(query)
    searchItemsByQuery(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div style={styles.centerContent}>
      <Card body style={{ width: '65%' }}>
        {loading ? (
          <div style={styles.centerContent}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : searchResult && searchResult.items.length > 0 ? (
          <h1>Hay registros</h1>
        ) : (
          <div style={styles.centerContent}>
            <h3>No se encontraron registros para tu búsqueda</h3>
          </div>
        )}
      </Card>
    </div>
  )
}

export default ItemsSearch
