import React from 'react'
import Row from './Row'

const Grid = ({ currentGuess, turn, guesses }) => {
    return (
        <div>
            {guesses.map((g, i) => {
                if (turn === i) {
                    return <Row key={i} currentGuess={currentGuess} />
                }
                return <Row key={i} guess={g} />
            })}
        </div>
    )
}

export default Grid