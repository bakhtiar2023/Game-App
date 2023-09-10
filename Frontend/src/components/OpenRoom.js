/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import rock from '../assets/images/batu.png'
import paper from '../assets/images/kertas.png'
import scissors from '../assets/images/gunting.png'
import axios from 'axios'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

function OpenRoom (props) {
  const [player2Opt, setPlayer2Opt] = useState('')
  const [player1Choice, setPlayer1Choice] = useState(
    props.name.value.player1Choice
  )

  // const [player2Result, setPlayer2Result] = useState("");

  const [player2Name, setPlayer2Name] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [result, setResult] = useState('')
  const [playerStatus, setPlayerStatus] = useState({
    player1Status: props.name.value.player1Status,
    player2Status: ''
  })
  const [choice, setChoice] = useState(true)
  // access loval storage
  // const accessToken = localStorage.getItem('accessToken')
  // const authorization = accessToken.split(' ')[1]
  let token = ''
  const accessToken = localStorage.getItem('accessToken')
  try {
    const authorization = accessToken.split(' ')[1]
    token = jwt_decode(authorization)
  } catch (error) {
    alert('error')
  }
  // eslint-disable-next-line no-undef
  // const token = jwt_decode(authorization)
  // decide who win the game
  useEffect(() => {
    if (playerStatus.player2Status === 'win') {
      return setResult(`${player2Name} WIN`)
    } else if (playerStatus.player2Status === 'lose') {
      return setResult(`${props.name.value.player1Name} WIN`)
    } else if (playerStatus.player2Status === 'draw') {
      return setResult('DRAW')
    } else {
      return setResult('CHOOSE YOUR CHOICE')
    }
  }, [playerStatus])

  const handleRock = async () => {
    setPlayer2Opt('rock')
    try {
      const response = await axios({
        method: 'put',
        url: `https://backend-team-1-five.vercel.app/edit_rooms/${props.name.value.roomId.toString()}`,
        headers: { Authorization: `${accessToken}` },
        data: {
          player2Id: token.id,
          player2Choice: 'rock',
          roomId: props.name.value.roomId
        }
      })
      if (response.status === 200) {
        alert('You have chosen')
        setPlayerStatus({
          ...playerStatus,
          player2Status: response.data.message.status
        })
        setPlayer2Name(response.data.message.player.playerName)
        setChoice(false)
      } else {
        setErrMsg(response.data.message)
      }
    } catch (err) {
      if (err.response?.status === 500) {
        setErrMsg('No Server Response')
        alert(JSON.stringify(err.response.data.message))
        window.location.reload()
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid Input')
        alert(JSON.stringify(err.response.data.message))
        window.location.reload()
      }
    }
  }
  const handlePaper = async () => {
    setPlayer2Opt('paper')
    try {
      const response = await axios({
        method: 'put',
        url: `https://backend-team-1-five.vercel.app/edit_rooms/${props.name.value.roomId.toString()}`,
        headers: { Authorization: `${accessToken}` },
        data: {
          player2Id: token.id,
          player2Choice: 'paper',
          roomId: props.name.value.roomId
        }
      })
      if (response.status === 200) {
        alert('You have chosen')
        setPlayerStatus({
          ...playerStatus,
          player2Status: response.data.message.status
        })
        setPlayer2Name(response.data.message.player.playerName)
        setChoice(false)
      } else {
        setErrMsg(response.data.message)
      }
    } catch (err) {
      if (err.response?.status === 500) {
        setErrMsg('No Server Response')
        alert(JSON.stringify(err.response.data.message))
        window.location.reload()
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid Input')
        alert(JSON.stringify(err.response.data.message))
        window.location.reload()
      }
    }
  }
  const handleScissors = async () => {
    setPlayer2Opt('scissors')
    try {
      const response = await axios({
        method: 'put',
        url: `https://backend-team-1-five.vercel.app/edit_rooms/${props.name.value.roomId.toString()}`,
        headers: { Authorization: `${accessToken}` },
        data: {
          player2Id: token.id,
          player2Choice: 'scissors',
          roomId: props.name.value.roomId
        }
      })
      if (response.status === 200) {
        alert('You have chosen')
        setPlayerStatus({
          ...playerStatus,
          player2Status: response.data.message.status
        })
        setPlayer2Name(response.data.message.player.playerName)
        setChoice(false)
      } else {
        setErrMsg(response.data.message)
      }
    } catch (err) {
      if (err.response?.status === 500) {
        setErrMsg('No Server Response')
        alert(JSON.stringify(err.response.data.message))
        window.location.reload()
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid Input')
        alert(JSON.stringify(err.response.data.message))
        window.location.reload()
      }
    }
  }
  return (
      <div className="container-fluid bigContainer">
        <div className="playerVsComContainer left-container">
          <div className="playerChoiceContainer1">
            <p className="playerTitle title fs-3">{props.name.value.player1Name}</p>
            <div className="playerOption mt-md-5">
              <div
                className={
                  player1Choice === 'rock' && player2Opt !== ''
                    ? 'choiced1'
                    : 'player1choices'
                }
              >
                <img src={rock} alt="rock" className="rock1" />
              </div>
              <div
                className={
                  player1Choice === 'paper' && player2Opt !== ''
                    ? 'choiced1'
                    : 'player1choices'
                }
              >
                <img src={paper} alt="paper" className="paper1" />
              </div>
              <div
                className={
                  player1Choice === 'scissors' && player2Opt !== ''
                    ? 'choiced1'
                    : 'player1choices'
                }
              >
                <img src={scissors} alt="scissors" className="scissors1" />
              </div>
            </div>
          </div>
          <div className="resultContainer">
            <h3 className="result title text-center">
              {choice !== true ? result : 'Chose your choice'}
            </h3>
          </div>
          <div className="playerChoiceContainer1">
            <p className="playerTitle title fs-3 text-transform-uppercase text-center mb-0">
              {player2Opt === ''
                ? 'Waiting for player 2 ...'
                : `${player2Name}`}
            </p>
            <div className="playerOption">
              <div
                className={
                  player2Opt === 'rock' ? 'choiced1' : 'player2choices'
                }
                onClick={handleRock}
                style={
                  player2Opt !== ''
                    ? { pointerEvents: 'none' }
                    : { pointerEvents: 'auto' }
                }
                data-testid='rockplayer2'
              >
                <img src={rock} alt="rock" className="rock1" />
              </div>
              <div
                className={
                  player2Opt === 'paper' ? 'choiced1' : 'player2choices'
                }
                onClick={handlePaper}
                style={
                  player2Opt !== ''
                    ? { pointerEvents: 'none' }
                    : { pointerEvents: 'auto' }
                }
                data-testid='paperplayer2'
              >
                <img src={paper} alt="paper" className="paper1" />
              </div>
              <div
                className={
                  player2Opt === 'scissors' ? 'choiced1' : 'player2choices'
                }
                style={
                  player2Opt !== ''
                    ? { pointerEvents: 'none' }
                    : { pointerEvents: 'auto' }
                }
                data-testid='scissorsplayer2'
              >
                <img
                  src={scissors}
                  alt="scissors"
                  className="scissors1"
                  onClick={handleScissors}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default OpenRoom
