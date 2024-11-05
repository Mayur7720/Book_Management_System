import React, { useState, useEffect, memo } from "react";
import {
  Button,
  Form,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalHeader,
  InputGroup,
} from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";

function EditableForm({ bookId, onUpdate, onCancel, show, setShow }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    overview: "",
    price: "",
    description: "",
    publishedDate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(bookId);
        const response = await axios.get(
          `http://localhost:3000/Allbooks/${bookId}`
        );
        setBook(response.data);
      } catch (err) {
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/Allbooks/${bookId}`, book);
      onUpdate();
      setShow(false);
    } catch (err) {
      setError("Failed to update book.");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <ModalHeader closeButton>
            <ModalTitle>Edit Book Details</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-sm-4">
                <Form.Group className="w-100 mb-2">
                  <Form.Label
                    className="fw-semibold text-secondary"
                    htmlFor="title"
                  >
                    Book Title
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="title"
                      value={book.title}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="w-100 mb-2">
                  <Form.Label
                    className="fw-semibold text-secondary"
                    htmlFor="author"
                  >
                    Author
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="author"
                      value={book.author}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-sm-4">
                <Form.Group className="mb-2 w-100">
                  <Form.Label
                    className="fw-semibold text-secondary"
                    htmlFor="price"
                  >
                    Price
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price"
                      value={book.price}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Label
                    className="fw-semibold text-secondary"
                    htmlFor="publishedDate"
                  >
                    Published Date
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaRegCalendarAlt />
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      name="publishedDate"
                      value={book.publishedDate}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </div>

              <Form.Group className="mb-2">
                <Form.Label
                  className="fw-semibold text-secondary"
                  htmlFor="overview"
                >
                  Overview
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    name="overview"
                    value={book.overview}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label
                  className="fw-semibold text-secondary"
                  htmlFor="description"
                >
                  Description
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <div className="mt-4 text-center">
                <Button variant="primary shadow" className="mx-5" type="submit">
                  Update
                </Button>
                <Button
                  variant="danger shadow"
                  className="mx-5"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

export default EditableForm;
