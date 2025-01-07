import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import ShortenerList from "../ShortneerList/ShortnerList";

const Shortner = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const response = await axios.post(
        "https://shortner-server.onrender.com/url/shorten",
        { originalUrl: url }
      );
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">URL Shortener</h1>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="urlInput">
          <Form.Label>Enter URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Shorten URL
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {shortUrl && (
        <Alert variant="success" className="mt-3">
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </Alert>
      )}
      <ShortenerList />
    </Container>
  );
};

export default Shortner;
