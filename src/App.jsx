import { useState, useEffect } from 'react'
import Wordle from '../components/Wordle'

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3002/solutions")
      .then(res => res.json())
      .then(json => {
        // get random solution from solution array
        const randomSolution = json[Math.floor(Math.random() * json.length)]
        setSolution(randomSolution.word)
      })
  }, [setSolution])


  return (
    <div className="App">
      <h1>
        Wordle (Lingo App)
      </h1>
      {solution && <Wordle solution={solution} />}

    </div>
  )
}

export default App
