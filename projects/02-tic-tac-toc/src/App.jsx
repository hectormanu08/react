
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css'
import { Square } from './components/Square';
import { TURNS} from './constants';
import { checkWinnerFrom } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import { saveGameStorage, resetGameStorage } from './storage';

function App() {

  const [board, setBoard]= useState(() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage) 
    return Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() =>{
    const turnFormStorage = window.localStorage.getItem('turn')
    return turnFormStorage ?? TURNS.X
  });
  
  const [winner,  setWinner] = useState(null);


  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
    
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  
  const updateBoard = (index) => {
    //no actualizamos el tablero si ya tiene un dato
    if(board[index] || winner ) return

    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameStorage({
      board: newBoard,
      turn: newTurn
    })
    
    
   
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)

    }else if (checkEndGame(newBoard)){
      setWinner(false)

    }
  }

  useEffect(() => {
    console.log("useEffect");
  }, [winner])


    return (
      <main className='board'>
        <h1>TIC TAC TOE</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
          {
            board.map((square, index) => {
              return (
                <Square 
                  key={index}
                  index = {index}
                  updateBoard={updateBoard}>
                    {square}
                </Square>
              )
            })  
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>


        <WinnerModal resetGame={resetGame} winner={winner} /> 
      </main>
      
    )   
  }
export default App
