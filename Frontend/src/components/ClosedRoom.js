/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react'
import rock from '../assets/images/batu.png'
import paper from '../assets/images/kertas.png'
import scissors from '../assets/images/gunting.png'
function ClosedRoom (props) {
// eslint-disable-next-line , no-unused-vars
  const [player2Opt, setplayer2Opt] = useState(props.name.value.player2Choice)
  // eslint-disable-next-line no-unused-vars
  const [player1Choice, setPlayer1Choice] = useState(
    props.name.value.player1Choice
  )
  // eslint-disable-next-line , no-unused-vars
  const [playerStatus, setPlayerStatus] = useState({
    player1Status: props.name.value.player1Status,
    player2Status: props.name.value.player2Status
  })

  // decide who win the game
  const whoWin = () => {
    if (playerStatus.player1Status === playerStatus.player2Status) {
      return 'DRAW'
    } else if (playerStatus.player1Status === 'win' && playerStatus.player2Status === 'lose') {
      return `${props.name.value.player1Name} WIN`
    } else if (playerStatus.player1Status === 'lose' && playerStatus.player2Status === 'win') {
      return `${props.name.value.player2Name} WIN`
    } else {
      return 'Choose you choice'
    }
  }
  return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div className="container-fluid bigContainer">
        <div className="playerVsComContainer left-container">
          <div className="playerChoiceContainer1">
            <p className="playerTitle title fs-3" data-testid="player1">{props.name.value.player1Name}</p>
            <div className="playerOption">
              <div
                className={
                  // eslint-disable-next-line no-undef
                  player1Choice === 'rock' && player2Opt !== null
                    ? 'choiced2'
                    : 'player1choices2'
                }
              >
                <img src={rock} alt="rock" className="rock1" />
              </div>
              <div
                className={
                  player1Choice === 'paper' && player2Opt !== null
                    ? 'choiced2'
                    : 'player1choices2'
                }
              >
                <img src={paper} alt="paper" className="paper1" />
              </div>
              <div
                className={
                  player1Choice === 'scissors' && player2Opt !== null
                    ? 'choiced2'
                    : 'player1choices2'
                }
              >
                <img src={scissors} alt="scissors" className="scissors1" />
              </div>
            </div>
          </div>
          <div className="resultContainer">
            <h3 className="result title text-center" data-testid="result">{whoWin()}</h3>
          </div>
          <div className="playerChoiceContainer1">
            <p className="playerTitle title fs-3 text-transform-uppercase text-center mb-0" data-testid="player2">
              {player2Opt === null
                ? 'Waiting for player 2 ...'
                : `${props.name.value.player2Name}`}
            </p>
            <div className="playerOption">
              <div
                className={
                  player2Opt === 'rock' ? 'choiced2' : 'player2choices2'
                }
              >
                <img src={rock} alt="rock" className="rock1" />
              </div>
              <div
                className={
                  player2Opt === 'paper' ? 'choiced2' : 'player2choices2'
                }
              >
                <img src={paper} alt="paper" className="paper1" />
              </div>
              <div
                className={
                  player2Opt === 'scissors' ? 'choiced2' : 'player2choices2'
                }
              >
                <img src={scissors} alt="scissors" className="scissors1" />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ClosedRoom
