/* eslint-disable react/prop-types */
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function MyVerticallyCenteredModal (props) {
  return (
    <Modal
      // eslint-disable-next-line react/prop-types
      show={props.show}
      // eslint-disable-next-line react/prop-types
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fw-600 text-dark"
        >
          Edit Profile Foto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="formFile" className="form-label">
          Choose your profile foto
        </label>
        <input
          type="file"
          className="form-control"
          id="formFile"
          data-testid="formFile"
          // eslint-disable-next-line react/prop-types
          onChange={props.handlechange}
        />
        <button
          className="btn btn-primary mt-4"
          // eslint-disable-next-line react/prop-types
          onClick={props.handleclick}
          data-testid="uploadButton"
        >
          Upload
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide2} role="content-closeButton">Close</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default MyVerticallyCenteredModal
