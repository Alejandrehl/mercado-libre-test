import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/index'
import ItemsSearch from '../pages/ItemsSearch/index'
import ItemDetail from '../pages/ItemDetail/index'
import NotFound from '../pages/NotFound/index'
import { Button, Navbar, Form, FormControl } from 'react-bootstrap'
import Logo from '../assets/meli-logo-2.png'
import { Search } from 'react-bootstrap-icons'
import ItemContext from '../context/Item/item.context'
import AppBreadcrumb from '../components/AppBreadcrumb'

const styles = {
  breadcrumbContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  navbar: {
    backgroundColor: '#ffe600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '30%',
  },
  form: {
    width: '100%',
  },
  formControl: {
    width: '50%',
  },
}

const AppRouter: React.FC = () => {
  const { setQuery, query, searchResult, product, loading } = useContext(
    ItemContext,
  )

  const handleSearch: () => void = () => {
    window.location.replace(`/items/search=${query}`)
  }

  return (
    <Router>
      <Navbar variant="dark" style={styles.navbar}>
        <Navbar.Brand href="/">
          <img
            alt="MELI-LOGO"
            src={Logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Form inline style={styles.form}>
          <FormControl
            type="text"
            placeholder="Nunca dejes de buscar"
            className="mr-sm-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.formControl}
          />
          <Button
            variant="light"
            onClick={handleSearch}
            disabled={query === ''}>
            <Search />
          </Button>
        </Form>
      </Navbar>
      <div style={styles.breadcrumbContainer}>
        <AppBreadcrumb
          values={
            !product ? searchResult?.categories : [product.item.category_id]
          }
          loading={loading}
        />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/items/search=:query">
          <ItemsSearch />
        </Route>
        <Route exact path="/items/:id">
          <ItemDetail />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
