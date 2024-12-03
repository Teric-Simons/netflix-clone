import React, { useEffect, useState } from "react";
import "../css/Homepage.css";
import RowListing from "./RowListing";
import MoreReasons from "./MoreReasons";
import FAQ from "./FAQ";
import MovieSlider from "./MovieSlider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { shuffleArray } from "../util.js";
import { db, collection, getDocs } from "../firebase";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getMovies");
        setMovies(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    console.log(movies);
  }, []);
*/
  useEffect(() => {
    console.log("here");
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, "Movies");
        const moviesSnapshot = await getDocs(moviesCollection);
        const moviesList = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(moviesList);
        setMovies(moviesList);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log(movies);
    }
  }, [loading]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  if (loading) {
    return;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const shuffledMovies1 = shuffleArray(movies);
  const shuffledMovies2 = shuffleArray(movies);

  return (
    <div className="homepage">
      <header>
        <div className="header-wrapper">
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240313101431/Netflix-Logo.png" />

        <div className="right-header">
          <div className="right-buttons">
            <svg
              className="select-pos"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              data-icon="LanguagesSmall"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z"
                fill="currentColor"
              ></path>
            </svg>
            <select name="languages">
              <option value="english">English</option>
              <option value="espanol">Espanol</option>
            </select>
            <svg
              className="select-pos2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              data-icon="CaretDownSmall"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.5976 6.5C11.7461 6.5 11.8204 6.67956 11.7154 6.78457L8.23574 10.2643C8.10555 10.3945 7.89445 10.3945 7.76425 10.2643L4.28457 6.78457C4.17956 6.67956 4.25393 6.5 4.40244 6.5H11.5976Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <button onClick={handleClick}>Sign In</button>
        </div>
        </div>
      </header>

      <div className="movie-scrollView-container">
        <MovieSlider />

        <div className="subscribe">
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="email">

         
          <input type="text" placeholder="Email address" />

          <button className="button">
            Get Started{" "}
            <span>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                data-icon="ChevronRightStandard"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </button>
          </div>
        </div>
        <div className="second-section">
          <RowListing
            title="Trending Now"
            movies={shuffledMovies1.slice(0, 10)}
          />
          <RowListing
            title="Only on Netflix"
            movies={shuffledMovies2.slice(0, 10)}
          />
          <MoreReasons />
          <FAQ />

          <div className="get-mem">
            <button className="button">Get Started</button>
            <p>Create or restart your membership</p>
          </div>

          <footer>
            <p>
              Questions? Call <span> 1 (408) 329-9526 (USA)</span>
            </p>

            <div className="footer-links">
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Media Center</a>
                </li>
                <li>
                  <a href="#">Ways to Watch</a>
                </li>
                <li>
                  <a href="#">Cookie Preferences</a>
                </li>
                <li>
                  <a href="#">Speed Test</a>
                </li>
              </ul>

              <ul>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Investor Relations</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="#">Corporate Information</a>
                </li>
                <li>
                  <a href="#">Only on Netflix</a>
                </li>
              </ul>

              <ul>
                <li>
                  <a href="#">Account</a>
                </li>
                <li>
                  <a href="#">Jobs</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Legal Notices</a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
