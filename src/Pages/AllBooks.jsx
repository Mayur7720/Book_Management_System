import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, Stack, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import "./AllBooks.css";
import EditableForm from "../Components/EditableForm";
import DeleteBook from "../Components/DeleteBook";

function Allbooks() {
  const btn_style = "shadow p-1 px-sm-2 px-md-2 py-md-1";
  const table_head = "p-3 text-secondary`}";

  const [allBooks, setAllBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingBookId, setEditingBookId] = useState(null);
  const [deletingBookId, setDeletingBook] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [show, setShow] = useState(false);

  const getAllBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/Allbooks`);
      setAllBooks(response.data);
    } catch (err) {
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleUpdate = (bookId) => {
    setEditingBookId(bookId);
    setShow(true);
  };

  const handleDelete = (book) => {
    setDeletingBook(book);
    setDeleteModal(true);
  };

  const handleAddNewBook = () => {
    setEditingBookId(null);
    setShow(true);
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "#e5e7eb" }}>
      <h1 className="text-primary fw-bolder text-center font-monospace ">
        All Books
      </h1>
      <div className="text-end mt-3 mb-1">
        <Button
          variant="success"
          onClick={handleAddNewBook}
          className="shadow fw-semibold mb-3 p-2"
        >
          <FaPlus className="mb-1" /> New Book
        </Button>
      </div>
      {loading ? (
 <div className="text-center">
         <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
 </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Table
            responsive
            striped
            style={{
              border: "1px solid #ddd",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
            className="custom-font-size borded shadow-lg "
          >
            <thead>
              <tr>
                <th className={`${table_head}`}>#</th>
                <th className={`${table_head}`}>Book Name</th>
                <th className={`${table_head}`}>Author</th>
                <th className={`${table_head}`}>Summary</th>
                <th className={`${table_head} `}>Price</th>
                <th className={`${table_head} text-center`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBooks?.map((book, idx) => (
                <tr key={book.id}>
                  <td>{idx + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.overview}</td>
                  <td>${book.price}</td>
                  <td>
                    <Stack className="gap-2 d-flex justify-content-center align-items-center bg-bg-transparent flex-md-row ">
                      <Button
                        className={btn_style}
                        variant="primary"
                        onClick={() => handleUpdate(book.id)}
                      >
                        <FaPen />
                      </Button>
                      <Button
                        className={btn_style}
                        variant="danger"
                        onClick={() => handleDelete(book)}
                      >
                        <FaTrash />
                      </Button>
                      <Link to={`/allbooks/${book.id}`}>
                        <Button
                          className={`${btn_style} fw-semibold`}
                          variant="secondary"
                        >
                          Info
                        </Button>
                      </Link>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <EditableForm
        show={show}
        setShow={setShow}
        bookId={editingBookId}
        onUpdate={getAllBooks}
        onCancel={() => setShow(false)}
      />

      <DeleteBook
        show={deleteModal}
        setShow={setDeleteModal}
        bookId={deletingBookId}
        onDelete={getAllBooks}
        onCancel={() => setDeleteModal(false)}
      />
    </div>
  );
}

export default Allbooks;
