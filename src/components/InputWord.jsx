import React, { useState } from 'react';

const InputWord = () => {

    const [playerOne, setPlayerOne] = useState([])
    const [playerTwo, setPlayerTwo] = useState([])
    const [allWord, setAllWord] = useState([])
    const [error, setError] = useState('')
    const [firstLetter, setFirstLetter] = useState('')
    const [playerOneBlock, setPlayerOneBlock]= useState(false)
    const [playerTwoBlock, setPlayerTwoBlock]= useState(false)

    console.log(playerOne)

    const handleFormSubmitOne = async (e) => {
        e.preventDefault();
        const getWord = e.target.playerOne.value;
        const word = getWord.toLowerCase()
        const data = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const res = await data

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
        console.log(nextLet)
        setFirstLetter(nextLet)
        setPlayerOne([...playerOne, word])
        setPlayerOneBlock(true)
        setPlayerTwoBlock(false)
        console.log(word)
    }



    const handleFormSubmitTwo = (e) => {
        e.preventDefault();
        const word = e.target.playerTwo.value;
        console.log(word)
        setPlayerTwoBlock(true)
        setPlayerOneBlock(false)
    }

    return (
        <div className='max-w-7xl mx-auto grid grid-cols-2'>
            <div>
                <form onSubmit={handleFormSubmitOne}>
                    <h1 className='text-xl font-bold '>Player 1</h1>
                    <input type="text" placeholder="Type here" name='playerOne' defaultValue={firstLetter} className="input" disabled={playerOneBlock}  />
                    {error && <p className='text-red-500'>{error}</p>}
                </form>
                <ul>
                    {playerOne.map(w => <li className='bullet'>{ w}</li>)}
                </ul>
            </div>
            <form onSubmit={handleFormSubmitTwo}>
                <h1 className='text-xl font-bold '>Player 1</h1>
                <input type="text" placeholder="Type here" name='playerTwo' defaultValue={firstLetter} className="input" disabled={playerTwoBlock}  />
            </form>

        </div>
    );
};

export default InputWord;