import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/index'
import ItemsSearch from '../pages/ItemsSearch/index'
import ItemDetail from '../pages/ItemDetail/index'
import NotFound from '../pages/NotFound/index'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/items/search=">
          <ItemsSearch />
        </Route>
        <Route path="/items/:id">
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
