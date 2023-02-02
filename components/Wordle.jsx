import React from 'react'
import useWordle from '../hooks/useWordle'
import { useEffect } from 'react'
import Grid from './Grid'

const Wordle = ({ solution }) => {
    const { currentGuess, handleKeyUp, guesses, isCorrect, turn } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp])

    useEffect(() => {
        console.log(guesses, "guesses")
        console.log("turn", turn)
        console.log(isCorrect, "isCorrect")
    }, [guesses, turn, isCorrect])

    return (
        <div>
            <p>
                Solution - {solution}
            </p>
            <p>
                Current Guess - {currentGuess}
            </p>

            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
        </div>
    )
}

export default Wordle