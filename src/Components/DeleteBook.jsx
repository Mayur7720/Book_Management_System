import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalHeader,
  ModalDialog,
} from "react-bootstrap";
function DeleteBook({ show, setShow, bookId, onDelete }) {
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/Allbooks/${id}`
      );
      onDelete();
      setShow(false);
    } catch (err) {
      setError("Failed to load book details.");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle className="text-danger fw-semibold">
            Do you want to delete this Book?
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="fw-semibold ">
            <span className="text-secondary">Book Name :</span> {bookId?.title}
          </p>
          <p className="fw-semibold ">
            <span className="text-secondary">Book Author :</span>{" "}
            {bookId?.author}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button className="shadow" variant="primary" onClick={handleClose}>
            Cancle
          </Button>
          <Button
            className="shadow"
            variant="danger"
            onClick={() => handleDelete(bookId.id)}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteBook;
