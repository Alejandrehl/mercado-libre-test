import React, { useContext, useEffect } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
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
  upperContainer: {
    display: 'flex',
  },
  leftContainer: {
    width: '65%',
  },
  rightContainer: {
    width: '35%',
  },
  price: {
    marginBottom: '15%',
    marginTop: '5%',
  },
  description: {
    marginTop: '5%',
    fontSize: 14,
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
            product && (
              <div>
                <div style={styles.upperContainer}>
                  <div style={styles.leftContainer}>
                    <img
                      src={product.item.thumbnail}
                      alt=""
                      width="80%"
                      height="80%"
                    />
                  </div>
                  <div style={styles.rightContainer}>
                    <label>
                      {(product.item.condition === 'new' ? 'Nuevo' : 'Usado') +
                        ' - ' +
                        product.item.sold_quantity +
                        ' vendidos'}
                    </label>
                    <h4>{product.item.title}</h4>
                    <h4 style={styles.price}>{product.item.price}</h4>
                    <Button variant="primary" block>
                      Comprar
                    </Button>
                  </div>
                </div>
                <div style={styles.leftContainer}>
                  <h4>Descripción del producto</h4>
                  <label style={styles.description}>
                    {product.item.description}
                  </label>
                </div>
              </div>
            )
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ItemDetail
