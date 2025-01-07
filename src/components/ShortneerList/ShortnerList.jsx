import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Spinner } from 'react-bootstrap';

const ShortenerList = () => {
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShortenedUrls = async () => {
      try {
        const response = await axios.get('https://shortner-server.onrender.com/url/all');
        setShortenedUrls(response.data);
      } catch (err) {
        console.error("Error fetching shortened URLs:", err);
        setError("Failed to fetch URLs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShortenedUrls();
  }, []);

  return (
    <Container>
      <h2 className="mt-4">Shortened URLs</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Shortened URL</th>
            </tr>
          </thead>
          <tbody>
            {shortenedUrls.length > 0 ? (
              shortenedUrls.map((url) => (
                <tr key={url._id}>
                  <td>
                    <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                      {url.originalUrl}
                    </a>
                  </td>
                  <td>
                    <a href={`https://shortner-server.onrender.com/url/${url.shortId}`} target="_blank" rel="noopener noreferrer">
                      https://www.short/{url.shortId}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No shortened URLs found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ShortenerList;
