import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner, Alert, Button } from "react-bootstrap";
import { FaArrowLeft} from "react-icons/fa"
function BookDetailsPage() {
  const span_style = "fw-semibold fs-5";
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Allbooks/${id}`
        );
        setBook(response.data);
      } catch (err) {
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <section className="px-4 my-4">
      <Button onClick={() => navigate(-1)} className="shadow">
    <FaArrowLeft className="mb-1"/> Back
      </Button>
      <h1 className=" text-primary  fw-bolder text-center font-monospace text-center">
        Books Details
      </h1>
      <article
        style={{ backgroundColor: "#e2e8f0" }}
        className="p-4 shadow rounded-3 border"
      >
        <h2 className="text-center mb-4 text-decoration-underline">
          {book?.title}
        </h2>
        <p className="fs-5">
          <span className={`${span_style}`}>Author:</span> {book?.author}
        </p>
        <p className="fs-5">
          <span className={`${span_style}`}>Overview:</span> {book?.overview}
        </p>
        <p className="fs-5">
          <span className={`${span_style}`}>Price:</span> ${book?.price}
        </p>
        <p className="fs-5">
          <span className={`${span_style}`}>Description:</span>{" "}
          {book?.description}
        </p>
        <p className="fs-5">
          <span className={`${span_style}`}>Published Date: </span>{" "}
          {book?.publishedDate}
        </p>
      </article>
    </section>
  );
}

export default BookDetailsPage;
