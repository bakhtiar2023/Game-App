import React, { useState } from 'react'
import '../App.css'
import { useFormik } from 'formik'
import { createRoomSchema } from '../../schemas/index'
// import * as Yup from "yup";
import Title from '../../components/Title'
import { Link, useNavigate } from 'react-router-dom'
import rock from '../../assets/images/batu.png'
import paper from '../../assets/images/kertas.png'
import scissors from '../../assets/images/gunting.png'
import axios from 'axios'

const CreateRoom = () => {
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState('')
  const accessToken = localStorage.getItem('accessToken')

  const formik = useFormik({
    initialValues: {
      roomName: '',
      player1Choice: ''
    },
    validationSchema: createRoomSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'https://backend-team-1-five.vercel.app/create_rooms',
          values,
          {
            headers: { Authorization: accessToken }
          }
        )

        if (response.status === 200) {
          navigate('/lobbygame')
        } else {
          return response.data.message
        }
      } catch (error) {
        //
        if (!error?.response) {
          setErrMsg('No Server Response')
        } else if (error.response?.status === 400) {
          setErrMsg('room Name already used')
        }
      }
    }
  })

  return (
    <div className="bigContainer">
      <div className="createRoom playerVsComContainer left-container">
        <form
          className="inputCreateRoom playerChoiceContainer justify-content-center align-items-center d-flex flex-sm-column flex-lg-column mt-sm-5"
          onSubmit={formik.handleSubmit}
        >

          <label
            htmlFor="roomName"
            className="text-center mb-3 fw-bold text-dark fs-3 fs-sm-4"
          >
            CREATE ROOM PVP
          </label>
          <input
            className="inputRoom input"
            id="roomName"
            placeholder="input room name here!"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.roomName}
            name="roomName"
            type="text"
          />
          {/* {formik.touched.roomName && formik.errors.roomName ? (
            <div className="error">{formik.errors.roomName}</div>
          ) : <div className="error-msg">{errMsg}</div>} */}
          {formik.touched.roomName && (formik.errors.roomName || formik.errors.player1Choice)
            ? (
            <div className="error">{formik.errors.roomName || formik.errors.player1Choice}</div>
              )
            : <div className="error-msg">{errMsg}</div>}

          <button className="button text-center mt-1 mt-sm-4" type="submit">
            create room
          </button>

        </form>
        <hr className="underlineRoom" />
        <div className="choiceCreateRoom playerChoiceContainer">
          <Title classProps="playerChoice title text-center">
            Choose Your Choice:
          </Title>
          <div className="choiceContainer p-0">
            <Link
              className={
                formik.values.player1Choice === 'rock'
                  ? 'roomChoice choiced'
                  : 'player player1 choices'
              }
              style={
                formik.values.player1Choice === ''
                  ? { pointerEvents: 'auto' }
                  : { pointerEvents: 'none' }
              }
              onClick={() => {
                formik.setFieldValue('player1Choice', 'rock')
              }}
            >
              <img
                src={rock}
                alt="rock"
                className="rockRoom"
                onClick={() => {
                  formik.setFieldValue('player1Choice', 'rock')
                }}
              />
            </Link>
            <Link
              className={
                formik.values.player1Choice === 'paper'
                  ? 'roomChoice choiced'
                  : 'player player1 choices'
              }
              style={
                formik.values.player1Choice === ''
                  ? { pointerEvents: 'auto' }
                  : { pointerEvents: 'none' }
              }
              onClick={() => {
                formik.setFieldValue('player1Choice', 'paper')
              }}
            >
              <img
                src={paper}
                alt="paper"
                className="paperRoom"
              />
            </Link>
            <Link
              className={
                formik.values.player1Choice === 'scissors'
                  ? 'roomChoice choiced'
                  : 'player player1 choices'
              }
              style={
                formik.values.player1Choice === ''
                  ? { pointerEvents: 'auto' }
                  : { pointerEvents: 'none' }
              }
              onClick={() => {
                formik.setFieldValue('player1Choice', 'scissors')
              }}
            >
              <img
                src={scissors}
                alt="scissors"
                className="scissorsRoom"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom
