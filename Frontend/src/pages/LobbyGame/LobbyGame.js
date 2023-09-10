/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import profile from '../../assets/icons/profile-icon.svg'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import MyVerticallyCenteredModal from '../../components/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import { useFormik } from 'formik'
import { editBiodataSchema } from '../../schemas'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../config/firebase/firebase.config'

function LobbyGame ({ test, testModal, testProfile }) {
  // eslint-disable-next-line no-unused-vars
  const [roomsData, setRoomsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(testProfile !== true)
  const [isNull, setIsNull] = useState(false)
  const [value, setValue] = useState(false)
  const [fileFoto, setFileFoto] = useState(null)
  const [biodata, setBiodata] = useState({})
  const [page, setPage] = useState(1)
  const [urlFoto, setUrlFoto] = useState({ url: null })
  const [filtered, setFiltered] = useState(0)

  let token = ''
  const accessToken = localStorage.getItem('accessToken')
  try {
    const authorization = accessToken.split(' ')[1]
    token = jwtDecode(authorization)
  } catch (error) {
    Navigate('/login')
  }

  const pushRoomList = (data) => {
    const restructuredData = []
    data.map((roomData) => {
      if (roomData.resultGames === undefined) {
        return restructuredData.push({
          roomId: roomData.roomId,
          roomName: roomData.roomName,
          player1Id: roomData.player1Games.player1Id,
          player1Choice: roomData.player1Choice,
          player1Name: roomData.player1Games.player1Name,
          player1Status: roomData.resultGames?.[0].status,
          player2Id: roomData.player2Games?.player2Id,
          player2Choice: roomData.player2Choice,
          player2Name: roomData.player2Games?.player2Name,
          player2Status: roomData.resultGames?.[1].status
        })
      } else {
        if (
          roomData.player1Games.player1Id ===
              roomData.resultGames[0]?.playerId
        ) {
          return restructuredData.push({
            roomId: roomData.roomId,
            roomName: roomData.roomName,
            player1Id: roomData.player1Games.player1Id,
            player1Choice: roomData.player1Choice,
            player1Name: roomData.player1Games.player1Name,
            player1Status: roomData.resultGames?.[0]?.status,
            player2Id: roomData.player2Games?.player2Id,
            player2Choice: roomData.player2Choice,
            player2Name: roomData.player2Games?.player2Name,
            player2Status: roomData.resultGames?.[1]?.status
          })
        } else {
          return restructuredData.push({
            roomId: roomData.roomId,
            roomName: roomData.roomName,
            player1Id: roomData.player1Games.player1Id,
            player1Choice: roomData.player1Choice,
            player1Name: roomData.player1Games.player1Name,
            player1Status: roomData.resultGames?.[1]?.status,
            player2Id: roomData.player2Games?.player2Id,
            player2Choice: roomData.player2Choice,
            player2Name: roomData.player2Games?.player2Name,
            player2Status: roomData.resultGames?.[0]?.status
          })
        }
      }
    })
    setLoading(false)
    if (restructuredData.length < 1) {
      setIsNull(true)
      setRoomsData(restructuredData)
    } else {
      setIsNull(false)
      setRoomsData(restructuredData)
    }
  }

  const getAllRooms = async () => {
    try {
      if (test === true) {
        if (parseInt(filtered) === 0) {
          const r = await fetch('https://backend-team-1-five.vercel.app/all_rooms/1', { method: 'post' })
          const data = await r.json()
          pushRoomList(data)
        } else if (parseInt(filtered) === 1) {
          const r = await fetch('https://backend-team-1-five.vercel.app/all_rooms/1', { method: 'post' })
          const data = await r.json()
          pushRoomList(data)
        } else {
          const r = await fetch('https://backend-team-1-five.vercel.app/all_rooms/1', { method: 'post' })
          const data = await r.json()
          pushRoomList(data)
        }
      } else {
        if (parseInt(filtered) === 0) {
          const data = await axios({
            method: 'post',
            url: `https://backend-team-1-five.vercel.app/all_rooms/${page}`,
            headers: { Authorization: `${accessToken}` }
          }).then((response) => {
            return response.data.message
          })
          pushRoomList(data)
        } else if (parseInt(filtered) === 1) {
          const data = await axios({
            method: 'post',
            url: `https://backend-team-1-five.vercel.app/all_rooms/${page}`,
            headers: { Authorization: `${accessToken}` },
            data: {
              filtered: true
            }
          }).then((response) => {
            return response.data.message
          })
          pushRoomList(data)
        } else {
          const data = await axios({
            method: 'post',
            url: `https://backend-team-1-five.vercel.app/all_rooms/${page}`,
            headers: { Authorization: `${accessToken}` },
            data: {
              filtered: false
            }
          }).then((response) => {
            return response.data.message
          })
          pushRoomList(data)
        }
      }
    } catch (error) {
      alert(error)
    }
  }
  const getBiodata = async () => {
    try {
      if (test === true) {
        const r = await fetch('https://backend-team-1-five.vercel.app/profile', { method: 'get' })
        const biodatas = await r.json()
        setBiodata({
          ...biodata,
          fullname: biodatas.fullname,
          address: biodatas.address,
          phoneNumber: biodatas.phoneNumber,
          dateOfBirth: biodatas.dateOfBirth
        })
        setUrlFoto({ ...urlFoto, url: biodatas.url })
        setLoading2(false)
      } else {
        const biodatas = await axios
          .get(
          `https://backend-team-1-five.vercel.app/profile/${token.id.toString()}`,
          {
            headers: { Authorization: `${accessToken}` }
          }
          )
          .then((response) => {
            return response.data.message
          })
        setBiodata({
          ...biodata,
          fullname: biodatas.fullname,
          address: biodatas.address,
          phoneNumber: biodatas.phoneNumber,
          dateOfBirth: biodatas.dateOfBirth
        })
        setUrlFoto({ ...urlFoto, url: biodatas.url })
        setLoading2(false)
      }
    } catch (error) {
      setBiodata({
        ...biodata,
        fullname: null,
        address: null,
        phoneNumber: null,
        dateOfBirth: null
      })
      setLoading2(false)
    }
  }

  useEffect(() => {
    getBiodata()
  }, [])

  const editClick = () => {
    setValue(true)
  }

  const handlePreviousClick = () => {
    if (page >= 1) {
      setLoading(true)
      setPage(page - 1)
    } else {
      setPage(page)
    }
  }

  const [modalShow, setModalShow] = useState(testModal === true ? testModal : false)

  const handleEditFoto = () => {
    setModalShow(true)
  }

  const handleNextClick = () => {
    if (page >= 1) {
      setLoading(true)
      setPage(page + 1)
    } else {
      setPage(page)
    }
  }

  const { errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: biodata,
    enableReinitialize: true,
    validationSchema: editBiodataSchema,
    onSubmit: async (values) => {
      try {
        if (test === true) {
          const r = await fetch('https://backend-team-1-five.vercel.app/profile', { method: 'put', body: values })
          const response = await r.json()
          getBiodata()
          alert(response)
          setValue(false)
        } else {
          await axios({
            method: 'put',
            url: `https://backend-team-1-five.vercel.app/profile/${token.id.toString()}`,
            headers: { Authorization: `${accessToken}` },
            data: values
          })
          getBiodata()
          alert('Update biodata success')
          setValue(false)
        }
      } catch (error) {
        alert(JSON.stringify(error.response.data.message))
      }
    }
  })

  const handleUpload = (event) => {
    setFileFoto(event.target.files[0])
  }

  useEffect(() => {
    getAllRooms()
  }, [page, filtered])

  const pushUrlToDatabase = async () => {
    const assetPath = `assets/${fileFoto?.name}`
    const imageRef = ref(storage, assetPath)
    const path = await uploadBytes(imageRef, fileFoto).then(() => {
      return getDownloadURL(imageRef)
    })
    try {
      if (test === true) {
        const r = await fetch('https://backend-team-1-five.vercel.app/photo', { method: 'put', body: path })
        const response = await r.json()
        alert(response)
      } else {
        await axios({
          method: 'put',
          url: `https://backend-team-1-five.vercel.app/photo/${token.id.toString()}`,
          headers: { Authorization: `${accessToken}` },
          data: { url: path }
        })
        alert('photo succesfully uploaded')
        setModalShow(false)
        window.location.reload()
      }
    } catch (error) {
      alert(JSON.stringify(error.response.data.message))
    }
  }

  const uploadClick = async () => {
    if (fileFoto?.name === undefined) {
      alert('file should not empty')
      return false
    } else if (fileFoto?.type === 'image/png') {
      pushUrlToDatabase()
    } else if (fileFoto?.type === 'image/jpg') {
      pushUrlToDatabase()
    } else if (fileFoto?.type === 'image/jpeg') {
      pushUrlToDatabase()
    } else {
      alert('file not valid!! should be jpg, jpeg or png')
    }
  }

  const handleHide = () => setModalShow(false)
  const handleHideButton = () => setModalShow(false)

  const handleShowAll = () => {
    setFiltered(0)
    setPage(1)
    setLoading(true)
  }

  const handleShowOpen = () => {
    setFiltered(1)
    setPage(1)
    setLoading(true)
  }

  const handleShowClose = () => {
    setFiltered(2)
    setPage(1)
    setLoading(true)
  }

  return (
    <div className="bigContainer">
      <MyVerticallyCenteredModal
        show={modalShow}
        handleclick={uploadClick}
        handlechange={handleUpload}
        onHide={handleHide}
        onHide2={handleHideButton}
      />
      <div className="left-container">
        <div className="pvcGame">
          <div className="playVCom">
            <Link className="btnVCom" to="/playervscom">
              Player Vs Com
            </Link>
          </div>
          <div className="playVCom">
            <Link className="btnVCom" to="/createRoom">
              Create Room PVP
            </Link>
          </div>
        </div>
        <div className="containerRoom">
          <div className="roomTitle title col-auto">Rooms :</div>
          <div className="input-group col-auto">
            <p className="text-dark fs-6 text-center me-2 mt-0">Filter:</p>
            <button className={filtered === 0 ? 'setFilter btn btn-warning me-2' : 'btn btn-warning me-2'} onClick={handleShowAll}>Show All</button>
            <button className={filtered === 1 ? 'setFilter btn btn-warning me-2' : 'btn btn-warning me-2'} onClick={handleShowOpen}>Open</button>
            <button className={filtered === 2 ? 'setFilter btn btn-warning' : 'btn btn-warning'} onClick={handleShowClose}>Closed</button>
          </div>
        </div>
        <div className="roomContainer">
          {roomsData !== null
            ? (
            <div className="row ms-lg-3 ms-sm-2 mt-sm-0 mt-lg-0">
              {loading !== true
                ? (
                    roomsData.map((roomData) => {
                      return (
                    <div className="dataCourier" key={roomData.roomId}>
                      <Link
                        className={
                          roomData.player2Name !== undefined
                            ? 'courierText closed'
                            : 'courierText open'
                        }
                        to={
                          roomData.player2Name !== undefined
                            ? '/p1vsp2closed'
                            : '/p1vsp2'
                        }
                        state={{ value: roomData }}
                      >
                        <>Room: {roomData.roomName}</>
                        <br></br>
                        <div className="">
                          Status:{' '}
                          {roomData.player2Name !== undefined
                            ? 'closed'
                            : 'open'}
                        </div>
                      </Link>
                      <div className="activePanel">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill={
                            roomData.player2Name !== undefined
                              ? '#ff0000'
                              : '#33ff40'
                          }
                          viewBox="0 0 16 16"
                        >
                          <circle cx="6" cy="6" r="6" />
                        </svg>
                      </div>
                    </div>
                      )
                    })
                  )
                : (
                <h3 role={'loadingRoomList'}>Loading...</h3>
                  )}
            </div>
              )
            : (
            <>Room Not Found</>
              )}
        </div>
        <div className="col-md-12 col-sm-12 d-flex wrap mt-xl-5 mt-lg-5 mt-sm-3 justify-content-evenly align-items-center">
          <Link
            onClick={handlePreviousClick}
            className={
              page !== 1 || isNull === true
                ? 'paginate fs-5 me-2 fs-sm-6 text-center'
                : 'paginate previousClick fs-5 fs-sm-6 me-2 text-center'
            }
          >{'<< Previous'}</Link>
          <Link
            onClick={handleNextClick}
            className={
              page >= 1 && isNull === false
                ? 'paginate fs-5 ms-2 fs-sm-6 text-center'
                : 'paginate nextClick fs-5 ms-lg-2 ms-md-2 fs-sm-6 text-center'
            }
          >{'Next >>'}</Link>
        </div>
      </div>
      <div className="right-container px-xl-4 px-lg-4 px-sm-3">
        <div className="upper-right-container mt-1 mx-4">
          <div className="top-upper-right-container mt-2 pe-2">
            <Link
              className={
                value !== true
                  ? 'gameHistoryText text-dark text-center text-decoration-underline me-4'
                  : 'gameHistoryText text-dark text-center text-decoration-underline me-5 ms-0'
              }
              to={'/gamehistory'}
            >
              Game History
            </Link>
            <i
              className={value !== true ? 'editIcons fa fa-pencil' : null}
              aria-hidden="true"
              data-testid="content-editBiodataButton"
              onClick={editClick}
            />
          </div>
          <>
            {loading2 !== true
              ? (
              <img
                src={urlFoto.url === null ? profile : urlFoto.url}
                alt="profile"
                className="rounded-circle mt-1 mt-sm-0"
                role="content-userProfileFoto"
                style={{ cursor: 'pointer' }}
                onClick={handleEditFoto}
              />
                )
              : (
              <>Loading...</>
                )}
          </>
          <div className="profileTitle title">{token?.username ? token.username : 'Player Name'}</div>
        </div>
        <div
          className={
            value !== true
              ? 'updatedContainer lower-right-container'
              : 'lower-right-container row mt-2 pb-5 pt-2 ps-4'
          }
        >
          {loading2 !== true
            ? (
            <>
              <div className="biodata">
                Fullname:{' '}
                {biodata.fullname === null ? '.....' : biodata.fullname}
              </div>
              <div className="biodata">
                Address: {biodata.address === null ? '.....' : biodata.address}
              </div>
              <div className="biodata">
                Phone:{' '}
                {biodata.phoneNumber === null ? '.....' : biodata.phoneNumber}
              </div>
              <div className="biodata">
                Date of Birth:{' '}
                {biodata.dateOfBirth === null ? '.....' : biodata.dateOfBirth}
              </div>
            </>
              )
            : (
            <h4 role={'loadingBiodata'}>Loading...</h4>
              )}
        </div>
        <div
          className={
            value !== true
              ? 'notUpdated lower-right-container-input'
              : 'lower-right-container-input formBiodata mt-xl-2 mt-lg-2 ps-lg-4 ps-sm-0 mt-sm-0'
          }
        >
          <div className="commandInput text-center text-capitalize fw-regular fs-6 text-dark mb-1 me-5 mb-sm-2 me-sm-2">
            Please input your biodata
          </div>
          <form
            id="formBiodata"
            onSubmit={handleSubmit}
            style={
              touched.fullname || errors.fullname ? { marginTop: '20px' } : {}
            }
          >
            <>
              {errors.fullname
                ? (
                <div
                  className={
                    touched.fullname && errors.fullname
                      ? 'errorsMessage'
                      : 'errorsMessage'
                  }
                >
                  {errors.fullname}
                </div>
                  )
                : (
                <label htmlFor="fullnameInput" className="labelInput fs-6 mt-0">
                  Fullname:
                </label>
                  )}
            </>
            <input
              type="text"
              defaultValue={biodata.fullname}
              placeholder="Vito Corleone"
              className="inputBiodata inputData mt-0"
              name="fullname"
              data-testid= "content-input-fullname"
              id="fullnameInput"
              disabled={false}
              onChange={handleChange}
            />
            <>
              {errors.address
                ? (
                <div
                  className={
                    touched.address && errors.address
                      ? 'errorsMessage'
                      : 'errorsMessage'
                  }
                >
                  {errors.address}
                </div>
                  )
                : (
                <label htmlFor="addressInput" className="labelInput fs-6 mt-0">
                  Address:
                </label>
                  )}
            </>
            <input
              type="text"
              defaultValue={biodata.address}
              placeholder="Corleone Sicily"
              className="inputBiodata inputData mt-0"
              name="address"
              id="addressInput"
              data-testid= "content-input-address"
              disabled={false}
              onChange={handleChange}
            />
            <>
              {errors.phoneNumber
                ? (
                <div
                  className={
                    touched.phoneNumber && errors.phoneNumber
                      ? 'errorsMessage'
                      : 'errorsMessage'
                  }
                >
                  {errors.phoneNumber}
                </div>
                  )
                : (
                <label htmlFor="phoneNumber" className="labelInput fs-6 mt-0">
                  Phone Number:
                </label>
                  )}
            </>
            <input
              type="text"
              defaultValue={biodata.phoneNumber}
              placeholder="082233178123"
              className="inputBiodata inputData mt-0"
              name="phoneNumber"
              data-testid= "content-input-phone"
              id="phoneNumber"
              disabled={false}
              onChange={handleChange}
            />
            <>
              {errors.dateOfBirth
                ? (
                <div
                  className={
                    touched.dateOfBirth && errors.dateOfBirth
                      ? 'errorsMessage'
                      : 'errorsMessage'
                  }
                >
                  {errors.dateOfBirth}
                </div>
                  )
                : (
                <label htmlFor="dateOfBrith" className="labelInput fs-6 mt-0">
                  Date of Birth:
                </label>
                  )}
            </>
            <input
              type="text"
              defaultValue={biodata.dateOfBirth}
              placeholder="07-12-1891"
              className="inputBiodata inputData mt-0"
              name="dateOfBirth"
              id="dateOfBirth"
              data-testid= "content-input-dob"
              disabled={false}
              onChange={handleChange}
            />
            <button
              className="updateBiodata button ms-5 py-3 ms-sm-5 py-sm-1"
              type="submit"
              role="submitBiodata"
            >
              update Biodata
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LobbyGame
