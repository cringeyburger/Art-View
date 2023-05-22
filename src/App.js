import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from "./images/art-view-high-res.png";
import { FaArrowCircleRight, FaArrowCircleLeft, FaArrowLeft } from "react-icons/fa";

const App = () => {
  const [imageURLs, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.reddit.com/r/pics.json');
        const jsonData = response.data;
        const children = jsonData.data.children;
        const imageData = children.map((child) => ({
          url: child.data.url,
          title: child.data.title,
          author: child.data.author,
        }));
        setImages(imageData);
        setError(null); // Reset error state if successful
      } catch (error) {
        console.log('Error fetching data:', error);
        setError('Failed to fetch data'); // Set error state if request fails
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const handleImageClose = () => {
    setIsFullScreen(false);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    setCurrentIndex(0);
    setIsFullScreen(false);
  };

  const getFilteredItems = (query, items) => {
    if (!query) {
      return items;
    }
    const lowerCaseQuery = query.toLowerCase();
    return items.filter((image) =>
      image.title.toLowerCase().includes(lowerCaseQuery) ||
      image.author.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const filteredItems = getFilteredItems(query, imageURLs);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navigation">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Art View" width="200" height="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex search-form" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Anything"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
      <div className="gallery">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          filteredItems.map((image, index) => (
            <div key={index} className="image-item" onClick={() => handleImageClick(index)}>
              <img src={image.url} alt={image.author} />
              <div className="caption">
                <div className="title">{image.title}</div>
                <div className="author">{image.author}</div>
              </div>
            </div>
          ))
        )}
      </div>
      {isFullScreen && (
        <div className="fullscreen-overlay">
          <div className="fullscreen-image">
            <img src={filteredItems[currentIndex].url} alt={filteredItems[currentIndex].author} onClick={handleImageClose} />
            <button className="nav-button left-button" onClick={handlePrevious}>
              <FaArrowCircleLeft />
            </button>
            <button className="nav-button right-button" onClick={handleNext}>
              <FaArrowCircleRight />
            </button>
            <button className="nav-button back-button" onClick={handleBack}>
              <FaArrowLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
