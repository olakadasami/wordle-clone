import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)

    // format a guess into an array of letter objects
    // eg. [key: 'a', color: 'yellow']
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map(l => {
            return { key: l, color: 'grey' }
        })

        // Find letters for Green
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // find yellow letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    // add new guess into the guesses state
    // update the isCorrect state if the guess is correct
    // add one to turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }

        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory(prevHistory => {
            return [...prevHistory, currentGuess]
        })
        setTurn(prevTurn => {
            return prevTurn + 1
        })
        setCurrentGuess('')
    }

    // handle keyup even and track current guess
    // if user presses enter add the new guess
    const handleKeyUp = ({ key }) => {
        if (key === "Enter") {
            // only add if turn is less than 5
            if (turn > 5) {
                console.log("you've used all your guesses")
                return
            }
            // no duplicate words
            if (history.includes(currentGuess)) {
                console.log("Already tried that word")
                return
            }
            // check if words is less than 5
            if (currentGuess.length !== 5) {
                console.log('Word must me 5 chars long')
                return
            }
            // correct answer is gotten
            if (isCorrect) {
                console.log('already gotten the correct answer')
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (key === 'Backspace') {
            setCurrentGuess(prev => {
                return prev.slice(0, -1)
            })
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, handleKeyUp }
}

export default useWordle