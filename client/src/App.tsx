import React from 'react'
import AppRouter from './router'
import ItemState from './context/Item/ItemState'

const App: React.FC = () => {
  return (
    <ItemState>
      <AppRouter />
    </ItemState>
  )
}

export default App
