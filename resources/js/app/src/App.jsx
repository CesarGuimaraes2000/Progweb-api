import { useState } from 'react'

import './App.css'
import Rotas from './routes/Routes'
import ContextProvider from './context/ContextProvider'
import DefaultLayout from './components/DefaultLayout'


function App() {

  return (
    <>
    <ContextProvider>
      <Rotas/>
    </ContextProvider>
    </>
  )
}

export default App
