import Cards from "../components/Cards";
import { Row, Col } from "react-bootstrap/";
import Carousel from "react-bootstrap/Carousel";
import YouTube from "react-youtube";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import "../components/App.css";
import Footer from "../components/Footer";
import "react-bootstrap-typeahead/css/Typeahead.css";
import NavbarComponent from "../components/NavbarComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_KEY = "";

const Home = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const [displayMovies, setdisplayMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectMovies, setSelectMovies] = useState({});
  const [playTrailer, setplayTrailer] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setdisplayMovies(results);
    await selectTrailerMovie(results[0]);
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectTrailerMovie = async (movie) => {
    setplayTrailer(false);
    const data = await fetchMovie(movie.id);
    setSelectMovies(data);
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    } else {
      fetchMovies();
    }
  }, [user, loading, navigate]);

  const onSearch = async (event) => {
    event.preventDefault();
    setSelectMovies({});
    await fetchMovies(search);
  };

  const renderTrailer = () => {
    const trailer = selectMovies.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer ? trailer.key : selectMovies.videos.results[0];

    return (
      <Col
        xm={6}
        md={12}
        lg={12}
        className="d-flex justify-content-center my-5"
      >
        <YouTube
          className=" youtbeplayer my-4 "
          videoId={key}
          opts={{
            width: "100%",
            height: "600px",
          }}
        />
      </Col>
    );
  };
  const handleSearch = async (query) => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });

    const movieData = results.map((movie) => ({
      title: movie.title,
      posterPath: movie.poster_path,
    }));
    setSuggestions(movieData);
    return movieData;
  };

  return (
    <div>
      <NavbarComponent
        onSearch={onSearch}
        handleSearch={handleSearch}
        IMAGE_PATH={IMAGE_PATH}
        suggestions={suggestions}
        setSearch={setSearch}
      />

      <div style={{ position: "relative" }}>
        <img
          className="d-block w-100 "
          style={{ height: "900px", borderRadius: "26px" }}
          src={`${IMAGE_PATH}${selectMovies.backdrop_path}`}
          alt="First slide"
        />
        <Carousel.Caption>
          {playTrailer ? (
            <button className="closebtn" onClick={() => setplayTrailer(false)}>
              Close
            </button>
          ) : null}
          {selectMovies.videos && playTrailer ? renderTrailer() : null}
          <Col sm={12} md={12} lg={12}>
            <button
              className="playtbtn text text-sm"
              onClick={() => setplayTrailer(true)}
            >
              Play Trailer
              <AiFillPlayCircle className="mb-1 mx-1" size={26} />
            </button>
            <h1 className="title display-4 display-md-3">
              {selectMovies.title}
            </h1>
            <p className="overview lead lead-md ">
              {selectMovies.overview ? selectMovies.overview : null}
            </p>
          </Col>
        </Carousel.Caption>
      </div>

      <div className=" container container-fluid">
        <Row className="outer pt-4">
          {displayMovies.map((movie, index) => (
            <Col key={index} className="p-3" xs={6} sm={6} md={4} lg={2}>
              <Cards movies={movie} selectMovie={selectTrailerMovie} />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
