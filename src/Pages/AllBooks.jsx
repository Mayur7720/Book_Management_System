import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, Stack } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./AllBooks.css";
import EditableForm from "../Components/EditableForm";

function Allbooks() {
  const btn_style = "shadow p-1 px-sm-2 px-md-2 py-md-1";

  const [allBooks, setAllBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingBookId, setEditingBookId] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState(null);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/Allbooks`);
        const data = response.data;
        setAllBooks(data);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getAllBooks();
  }, []);

  const handleUpdate = () => {
    setEditingBookId(null);
  };

  const handleDelete = () => {
    setDeletingBookId(null);
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "#e5e7eb" }}>
      <h1 className="text-primary fw-bolder text-center font-monospace ">All Books</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
            className="custom-font-size borded  shadow-lg "
          >
            <thead className="border-black">
              <tr>
                <th
                  style={{ width: "3rem", padding: "1rem" }}
                  className=" text-center table_head"
                >
                  #
                </th>
                <th
                  style={{ padding: "1rem" }}
                  className="text-truncate w-25 text-wrap  table_head"
                >
                  Book Name
                </th>
                <th style={{ padding: "1rem" }} className=" table_head">
                  Author
                </th>
                <th
                  style={{ padding: "1rem" }}
                  className="text-truncate w-25 table_head"
                >
                  Summary
                </th>
                <th
                  style={{ padding: "1rem" }}
                  className="text-center  table_head"
                >
                  Price
                </th>
                <th
                  style={{ padding: "1rem" }}
                  className="px-0 text-center px-0 table_head"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allBooks?.map((book, idx) => (
                <tr key={book.bookId}>
                  <td className="text-center">{idx + 1}</td>
                  <td className={`table-cell-title ellipsis text-wrap`}>
                    {book?.title}
                  </td>
                  <td>{book?.author}</td>
                  <td className={` `}>{book?.overview}</td>
                  <td className="text-center">${book?.price}</td>
                  <td className=" px-0  ">
                    <Stack className=" gap-2 d-flex justify-content-center align-items-center bg-transparent flex-md-row px-sm-1 bg-white border-0 ">
                      <Button
                        className={`${btn_style}`}
                        variant="primary"
                        onClick={() => setEditingBookId(book.bookId)}
                      >
                        <FaPen style={{ cursor: "pointer" }} />
                      </Button>
                      <Button
                        className={`${btn_style}`}
                        variant="danger"
                        onClick={() => setDeletingBookId(book.bookId)}
                      >
                        <FaTrash
                          size={"1.1rem"}
                          style={{ cursor: "pointer" }}
                        />
                      </Button>
                      <Button
                        className={`${btn_style} text-center px-2 `}
                        variant="secondary"
                      >
                        info
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {editingBookId && (
            <EditableForm
              bookId={editingBookId}
              onUpdate={handleUpdate}
              onCancel={() => setEditingBookId(null)}
            />
          )}

          {/* {deletingBookId && (
            <DeleteBook
              bookId={deletingBookId}
              onDelete={handleDelete}
              onCancel={() => setDeletingBookId(null)}
            />
          )} */}
        </>
      )}
    </div>
  );
}

export default Allbooks;
