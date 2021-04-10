import React, { useContext, useEffect } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import ItemContext from '../../context/Item/item.context'

const styles = {
  centerContent: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '50%',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: 150,
    width: '15%',
    marginLeft: '1%',
  },
  description: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    marginTop: '2%',
    paddingLeft: '3%',
    width: '70%',
  },
  cityContainer: {
    display: 'flex',
    marginTop: '2%',
    width: '15%',
  },
  listItem: {
    display: 'flex',
    cursor: 'pointer',
  },
}

const ItemsSearch: React.FC = () => {
  const { loading, searchResult, searchItemsByQuery, setQuery } = useContext(
    ItemContext,
  )
  const { query }: any = useParams()
  const history = useHistory()

  useEffect(() => {
    setQuery(query)
    searchItemsByQuery(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleOnClick: (id: string) => void = (id: string) => {
    history.push(`/items/${id}`)
  }

  return (
    <div style={styles.centerContent}>
      <div
        style={{
          ...styles.container,
          paddingTop: searchResult?.items.length > 0 ? '0%' : '2%',
          paddingBottom: searchResult?.items.length > 0 ? '0%' : '2%',
        }}>
        {loading ? (
          <div style={styles.centerContent}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : searchResult && searchResult.items.length > 0 ? (
          <ListGroup>
            {searchResult.items.map((item: any) => {
              return (
                <ListGroup.Item
                  key={item.id}
                  style={styles.listItem}
                  onClick={() => handleOnClick(item.id)}>
                  <div style={styles.imageContainer}>
                    <img
                      src={item.thumbnail}
                      alt={item.thumbnail}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={styles.description}>
                    <h6>{item.price}</h6>
                    <label>{item.title}</label>
                  </div>
                  <div style={styles.cityContainer}>
                    <label>{item.address.city_name}</label>
                  </div>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        ) : (
          <div style={styles.centerContent}>
            <h3>No se encontraron registros para tu búsqueda</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemsSearch
