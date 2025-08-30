import React, { useState } from 'react';

const InputWord = () => {

    const [playerOne, setPlayerOne] = useState([])
    const [playerTwo, setPlayerTwo] = useState([])
    const [allWord, setAllWord] = useState([])
    const [error, setError] = useState('')
    const [errorTwo, setErrorTwo] = useState('')
    const [firstLetter, setFirstLetter] = useState('')
    const [playerOneBlock, setPlayerOneBlock] = useState(false)
    const [playerTwoBlock, setPlayerTwoBlock] = useState(false)
    const [plOneScore, setPlOneScore] = useState(0)
    const [plTwoScore, setPlTwoScore] = useState(0)
    const [yourTurn, setYourTurn] = useState('plOne')

    console.log(playerOne)

    const handleFormSubmitOne = async (e) => {
        e.preventDefault();
        const getWord = e.target.playerOne.value;
        const word = getWord.toLowerCase()
        const data = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const res = await data
        setPlayerOneBlock(true)
        setPlayerTwoBlock(false)
        const startLetter = word.slice(0, 1)
        console.log(startLetter)
        if (firstLetter && startLetter !== firstLetter) {
            setError('start with the given letter')
            return
        }
        if (!res.ok) {
            setError('use a valid word')
            return
        }

        if (word.length <= 3) {
            setError('word must have 4 character')
            return
        }

        setAllWord([...allWord, word])
        const findWord = allWord.find(w => w === word)
        if (findWord) {
            setError('duplicate word is not allowed')
            return
        }
        setError('')
        const nextLet = word.slice(-1)
        setFirstLetter(nextLet)


        setPlayerOne([...playerOne, word])

        setPlOneScore(plOneScore + 10);

        setYourTurn('plTwo')


    }



    const handleFormSubmitTwo = async (e) => {
        e.preventDefault()
        const getWord = e.target.playerTwo.value;
        const word = getWord.toLowerCase()
        const data = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const res = await data
        setPlayerTwoBlock(true)
        setPlayerOneBlock(false)

        const startLetter = word.slice(0, 1)
        console.log(startLetter)
        if (firstLetter && startLetter !== firstLetter) {
            setErrorTwo('start with the given letter')
            return
        }
        if (!res.ok) {
            setErrorTwo('use a valid word')
            return
        }

        if (word.length <= 3) {
            setErrorTwo('word must have 4 character')
            return
        }

        setAllWord([...allWord, word])
        const findWord = allWord.find(w => w === word)
        if (findWord) {
            setError('duplicate word is not allowed')
            return
        }
        setErrorTwo('')
        const nextLet = word.slice(-1)
        setFirstLetter(nextLet)


        setPlayerTwo([...playerTwo, word])

        setPlTwoScore(plTwoScore + 10);

        setYourTurn('plOne')

        e.target.playerOne.value = 'h'


    }

    return (
        <div className='max-w-7xl mx-auto grid grid-cols-2'>

            <div>
                <h2>make word with <span className='text-2xl font-bold text-amber-400'>{firstLetter}</span></h2>
                <h4>score: {plOneScore}</h4>
                {yourTurn === "plOne" && <h4 className='text-green-500'>Your Turn</h4>}
                <form onSubmit={handleFormSubmitOne}>
                    <h1 className='text-xl font-bold '>Player 1</h1>
                    <input type="text" placeholder="Type here" name='playerOne' defaultValue={firstLetter} className="input" disabled={playerOneBlock} />
                    {error && <p className='text-red-500'>{error}</p>}
                </form>
                <ul>
                    {playerOne.map(w => <li className='bullet'>{w}</li>)}
                </ul>
            </div>
            <div>
                <form onSubmit={handleFormSubmitTwo}>
                    <h2>make word with <span className='text-2xl font-bold text-amber-400'>{firstLetter}</span></h2>

                    <h4>score: {plTwoScore}</h4>
                    {yourTurn === "plTwo" && <h4 className='text-green-500'>Your Turn</h4>}
                    <h1 className='text-xl font-bold '>Player 1</h1>
                    <input type="text" placeholder="Type here" name='playerTwo' defaultValue={firstLetter} className="input" disabled={playerTwoBlock} />
                    {errorTwo && <p className='text-red-500'>{errorTwo}</p>}
                </form>
                <ul>
                    {playerTwo.map(w => <li className='bullet'>{w}</li>)}

                </ul>
            </div>
        </div>
    );
};

export default InputWord;