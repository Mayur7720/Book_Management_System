import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, Stack } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./AllBooks.css";
function Allbooks() {
  const [allBooks, setAllBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f8f9fa" }}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table responsive style={{ background: "white" }} bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th className="text-truncate w-25 text-wrap">Book Name</th>
              <th style={{ width: "10rem", textOverflow: "ellipsis" }}>
                Author
              </th>
              <th className="text-truncate w-25">Summary</th>
              <th className="text-center">Price</th>
              <th colSpan={2} className="px-0" style={{ textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allBooks?.map((book, idx) => (
              <tr key={book.bookId}>
                <td>{idx + 1}</td>
                <td className={`table-cell-title ellipsis text-wrap`}>
                  {book?.title}
                </td>
                <td>{book?.author}</td>
                <td className={`table-cell-overview ellipsis `}>
                  {book?.overview}
                </td>
                <td className="text-center">${book?.price}</td>
                <td className="px-0">
                  <Stack
                    gap={2}
                    className=" d-flex flex-md-row px-sm-1 bg-transparent w-75 mx-auto bg-white border-0 justify-content-evenly align-items-center"
                  >
                    <Button
                      className="shadow p-1 px-md-2 py-md-1"
                      style={{ padding: "0.3rem 0.7rem" }}
                      variant="primary"
                    >
                      <FaPen size={"1.1rem"} style={{ cursor: "pointer" }} />
                    </Button>
                    <Button
                      className="shadow p-1 px-md-2 py-md-1"
                      variant="danger"
                    >
                      <FaTrash size={"1.1rem"} style={{ cursor: "pointer" }} />
                    </Button>
                  </Stack>
                </td>
                <td className="text-center">
                  <Button
                    className="shadow text-white fw-bolder px-0 p-1 px-md-2 py-md-1"
                    variant="secondary"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Allbooks;
