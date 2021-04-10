import React, { useContext, useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import ItemContext from '../../context/Item/item.context'

const styles = {
  centerContent: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '50%',
  },
}

const ItemDetail: React.FC = () => {
  const { loading, product, error, getItemById } = useContext(ItemContext)
  const { id }: any = useParams()

  useEffect(() => {
    getItemById(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Card.Body>
          {loading ? (
            <div style={styles.centerContent}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <div style={styles.centerContent}>
              <h3>{error}</h3>
            </div>
          ) : (
            <h1>AQUI</h1>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ItemDetail
