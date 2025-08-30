import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputWord from './components/inputWord'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='space-y-8'>
      <h1 className='text-4xl text-center'>Shiritori Game</h1>
      <div>
        <InputWord></InputWord>
      </div>
    </div>
  )
}

export default App
