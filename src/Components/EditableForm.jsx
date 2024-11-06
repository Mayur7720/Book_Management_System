import React, { useEffect, useState } from "react";
import {
  Modal,
  Alert,
  Button,
  Form,
  ToastContainer,
  Toast,
  ToastHeader,
  ToastBody,
} from "react-bootstrap";
import axios from "axios";

const EditableForm = ({ show, setShow, bookId, onUpdate, onCancel }) => {
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    overview: "",
    price: "",
    description: "",
    publishedDate: "",
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (bookId) {
        const response = await axios.get(
          `http://localhost:3000/Allbooks/${bookId}`
        );
        setBookData(response.data);
      } else {
        setBookData({
          title: "",
          author: "",
          overview: "",
          price: "",
          description: "",
          publishedDate: "",
        });
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!bookData.title || bookData.title.trim() === "") {
      formErrors.title = "Title is //required.";
    }
    if (!bookData.description || bookData.description.trim() === "") {
      formErrors.description = "description is //required.";
    }
    if (!bookData.overview || bookData.overview.trim() === "") {
      formErrors.overview = "overview is //required.";
    }
    if (!bookData.price || isNaN(bookData.price) || bookData.price <= 0) {
      formErrors.price = "Price must be a valid positive number.";
    }
    if (!bookData.author || bookData.author.trim() === "") {
      formErrors.author = "Author is //required.";
    }
    if (!bookData.publishedDate || isNaN(Date.parse(bookData.publishedDate))) {
      formErrors.publishedDate = "Published date must be a valid date.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowAlert(true);
      return;
    }

    try {
      if (bookId) {
        await axios.put(`http://localhost:3000/Allbooks/${bookId}`, bookData);
        setToastMessage("Book updated successfully!");
      } else {
        await axios.post(`http://localhost:3000/Allbooks`, bookData);
        setToastMessage("Book added successfully!");
      }
      onUpdate();
      setShow(false);
      setShowToast(true);

    } catch (err) {
      console.error("Failed to save book details:", err);
    }
  };

  return (
    <>
      {" "}
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header
          className={`${
            bookId
              ? " bg-primary text-white "
              : " bg-success border-0 text-white"
          }`}
          closeButton
        >
          <Modal.Title>{bookId ? "Edit Book" : "Add New Book "}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="rounded border-0"
          style={{ backgroundColor: "#f8fafc" }}
        >
          <Form onSubmit={handleSubmit}>
            {!bookId && showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                Please fill all the input fields correctly.
              </Alert>
            )}
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-sm-4">
              <Form.Group className="mb-2 w-100" controlId="formTitle">
                <Form.Label className="fw-semibold text-secondary">
                  Title
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={bookData.title}
                  isInvalid={!bookId ? !!errors.title : ""}
                  onChange={handleChange}
                  //required
                />
              </Form.Group>
              <Form.Group className="mb-2 w-100" controlId="formAuthor">
                <Form.Label className="fw-semibold text-secondary">
                  Author
                </Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={bookData.author}
                  isInvalid={!bookId ? !!errors.author : ""}
                  onChange={handleChange}
                  //required
                />
              </Form.Group>
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-sm-4">
              <Form.Group className="mb-2 w-100" controlId="formPrice">
                <Form.Label className="fw-semibold text-secondary">
                  Price
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={bookData.price}
                  isInvalid={!bookId ? !!errors.price : ""}
                  onChange={handleChange}
                  //required
                />
              </Form.Group>
              <Form.Group className="mb-2 w-100" controlId="formPublishedDate">
                <Form.Label className="fw-semibold text-secondary">
                  Published Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="publishedDate"
                  value={bookData.publishedDate}
                  isInvalid={!bookId ? !!errors.publishDate : ""}
                  onChange={handleChange}
                  //required
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-2" controlId="formOverview">
              <Form.Label className="fw-semibold text-secondary">
                Overview
              </Form.Label>
              <Form.Control
                as="textarea"
                name="overview"
                value={bookData.overview}
                isInvalid={!bookId ? !!errors.overview : ""}
                onChange={handleChange}
                //required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formDescription">
              <Form.Label className="fw-semibold text-secondary">
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={bookData.description}
                isInvalid={!bookId ? !!errors.description : ""}
                onChange={handleChange}
                //required
              />
            </Form.Group>

            <div className="mt-4 text-center ">
              <Button variant="primary shadow" className="mx-5 fw-semibold" type="submit">
                {bookId ? "Update" : "Create"}
              </Button>
              <Button
                variant="danger shadow"
                className="mx-5 fw-semibold"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <ToastHeader>
            <strong className="me-auto">Notification</strong>
          </ToastHeader>
          <ToastBody className="text-white fw-semibold">
            {toastMessage}
          </ToastBody>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default EditableForm;
