import { useState } from 'react'

import './App.css'
import Rotas from './routes/Routes'
import DefaultLayout from './components/DefaultLayout'


function App() {

  return (
    <>
    {/* <ContextProvider> */}
      <Rotas/>
    {/* </ContextProvider> */}
    </>
  )
}

export default App
