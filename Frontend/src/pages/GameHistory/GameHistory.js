/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment'
import '../App.css'

function GameHistory () {
  const accessToken = localStorage.getItem('accessToken')
  const authorization = accessToken.split(' ')[1]
  const token = jwt_decode(authorization)
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [isNull, setIsNull] = useState(false)
  const [value, setValue] = useState(false)
  const [histories, setHistories] = useState([])

  const getAllHistory = async () => {
    try {
      const response = await axios.get(
        `https://backend-team-1-five.vercel.app/history/${token.id.toString()}`,
        {
          headers: { Authorization: `${accessToken}` }
        }
      )

      const getAllHistoryGame = response.data.message

      const restructuredData = getAllHistoryGame.map((history) => {
        return {
          status: history.status,
          roomId: history.roomId,
          createdAt: history.createdAt,
          gameRoom:
            history.roomId === null
              ? 'player vs com'
              : history.gameRoom?.roomName,
          date: moment(history.createdAt)
            .format('DD-MM-YYYY,h:mm A')
            .split(',')[0],
          time: moment(history.createdAt)
            .format('DD-MM-YYYY,h:mm A')
            .split(',')[1]
        }
      })

      setLoading(false)
      setIsNull(restructuredData.length < 1)
      setHistories(restructuredData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllHistory()
  }, [])

  const sortedHistories = histories.sort((a, b) => {
    return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  })

  return (
    <div className="tableContainer container ">
      <h3 className="title fs-3 text-start ms-2 text-center">Game History</h3>
      <table className="table table-fixed">
        <thead>
          <tr>
            <th className="col-xl-3 col-xs-3 text-center">Username</th>
            <th className="col-xl-2 col-xs-3 text-center">Status</th>
            <th className="col-xl-3 col-xs-3 text-center">Room Name</th>
            <th className="col-xl-2 col-xs-3 text-center">Date</th>
            <th className="col-xl-2 col-xs-3 text-center">Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistories.map((history, i) => {
            return (
              <tr key={i}>
                <td className="col-xl-3 col-xs-3 text-center">
                  {token.username}
                </td>
                <td className="col-xl-2 col-xs-3 text-center">
                  {history.status === null ? '.....' : history.status}
                </td>
                <td className="col-xl-3 col-xs-3 text-center">
                  {history.gameRoom === null ? '.....' : history.gameRoom}
                </td>
                <td className="col-xl-2 col-xs-2 text-center">
                  {history.date === null ? '.....' : history.date}
                </td>
                <td className="col-xl-2 col-xs-2 text-center">
                  {history.time === null ? '.....' : history.time}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GameHistory
