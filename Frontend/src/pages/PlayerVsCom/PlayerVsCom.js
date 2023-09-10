/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import rock from '../../assets/images/batu.png'
import paper from '../../assets/images/kertas.png'
import scissors from '../../assets/images/gunting.png'
import refresh from '../../assets/images/refresh.png'
import { Link } from 'react-router-dom'
import Title from '../../components/Title'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function PlayerVsCom () {
  const [result, setResult] = useState('')
  const [comChoice, setComChoice] = useState('')
  const [player1Choice, setPlayer1Choice] = useState('')
  const accessToken = localStorage.getItem('accessToken')
  const authorization = accessToken.split(' ')[1]
  const token = jwt_decode(authorization)

  const pickRandomCom = () => {
    const choices = ['rock', 'paper', 'scissors']
    setComChoice(choices[Math.floor(Math.random() * choices.length)])
  }

  const handleResult = (choice) => {
    setPlayer1Choice(choice)
    pickRandomCom()
  }

  useEffect(() => {
    if (player1Choice !== '' && comChoice !== '') {
      let gameResult
      if (player1Choice === comChoice) {
        gameResult = 'draw'
      } else if (
        (player1Choice === 'rock' && comChoice === 'scissors') ||
        (player1Choice === 'paper' && comChoice === 'rock') ||
        (player1Choice === 'scissors' && comChoice === 'paper')
      ) {
        gameResult = 'win'
      } else {
        gameResult = 'lose'
      }
      sendResultToBackend(gameResult)
      setResult(gameResult)
    }
  }, [player1Choice, comChoice])

  const sendResultToBackend = async (gameResult) => {
    const data = {
      status: gameResult
    }
    try {
      const response = await axios.post(
       `https://backend-team-1-five.vercel.app/history/${token.id.toString()}`,
       data,
       {
         headers: {
           Authorization: accessToken,
           'Content-Type': 'application/json'
         }
       }
      )
      console.log(response.data.message)
    } catch (error) {
      if (error.response) {
        console.log(error.response.status) // Tampilkan status respons
      }
      console.log(error.message)
    }
  }

  const handleRefresh = () => {
    setPlayer1Choice('')
    setComChoice('')
    setResult('')
  }

  return (
    <div className="containerplayervscom">
      <div className="playerVsComContainer left-container">
        <div className="playerChoiceContainer">
          <Title classProps="playerTitle title">Player</Title>
          <Link
            className={player1Choice === 'rock' ? 'choiced' : 'player1 choices'}
            style={
              player1Choice !== ''
                ? { pointerEvents: 'none' }
                : { pointerEvents: 'auto' }
            }
            onClick={() => handleResult('rock')}
          >
            <img src={rock} alt="rock-choice" className="rock" />
          </Link>
          <Link
            className={
              player1Choice === 'paper' ? 'choiced' : 'player1 choices'
            }
            style={
              player1Choice !== ''
                ? { pointerEvents: 'none' }
                : { pointerEvents: 'auto' }
            }
            onClick={() => handleResult('paper')}
          >
            <img src={paper} alt="paper-choice" className="paper" />
          </Link>
          <Link
            className={
              player1Choice === 'scissors' ? 'choiced' : 'player1 choices'
            }
            style={
              player1Choice !== ''
                ? { pointerEvents: 'none' }
                : { pointerEvents: 'auto' }
            }
            onClick={() => handleResult('scissors')}
          >
            <img src={scissors} alt="scissors-choice" className="scissors" />
          </Link>
        </div>
        <div className="resultContainer">
          <div className="resultGame">
            <Title classProps="result title">
              {result === '' ? 'Choose your choice' : result}
            </Title>
          </div>
          <div className="refreshGame" onClick={handleRefresh}>
            <img src={refresh} alt="refresh" className="refreshButton" />
          </div>
        </div>
        <div className="playerChoiceContainer">
          <Title classProps="playerTitle title">COM</Title>
          <div className={comChoice === 'rock' ? 'choiced' : 'comChoices'}>
            <img src={rock} alt="rock" className="rock" />
          </div>
          <div className={comChoice === 'paper' ? 'choiced' : 'comChoices'}>
            <img src={paper} alt="paper" className="paper" />
          </div>
          <div className={comChoice === 'scissors' ? 'choiced' : 'comChoices'}>
            <img src={scissors} alt="scissors" className="scissors" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerVsCom
