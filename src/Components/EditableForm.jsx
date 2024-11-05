import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

function EditableForm({ bookId, onUpdate, onCancel }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    overview: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Allbooks/?bookId=${bookId}`
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
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/books/${bookId}`, book);
      onUpdate();
    } catch (err) {
      setError("Failed to update book.");
    }
  };
  console.log(book);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBookTitle">
            <Form.Label>Book Title</Form.Label>

            <Form.Control
              type="text"
              name="title"
              value={book[0]?.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBookAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={book[0]?.author}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBookOverview">
            <Form.Label>Overview</Form.Label>
            <Form.Control
              as="textarea"
              name="overview"
              value={book[0]?.overview}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBookPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={book[0]?.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Book
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      )}
    </div>
  );
}

export default EditableForm;
