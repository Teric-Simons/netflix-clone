import React, { useState, useEffect } from "react";
import "../css/MovieSlider.css";
import "../css/Loadingbar.css";
import Loadingbar from "./Loadingbar";
import axios from "axios";
import { useCallback } from "react";
import { db, collection, getDocs } from "../firebase";

const MovieSlider = () => {
  const images = [
    "https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/JM-en-20241118-TRIFECTA-perspective_57d00cd9-b7cb-4e0b-837f-1487780f2264_large.jpg",
    "https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/JM-en-20241118-TRIFECTA-perspective_57d00cd9-b7cb-4e0b-837f-1487780f2264_large.jpg",
    "https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/JM-en-20241118-TRIFECTA-perspective_57d00cd9-b7cb-4e0b-837f-1487780f2264_large.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState({
    bar1: 0,
    bar2: 0,
    bar3: 0,
  });

  useEffect(() => {
    console.log("here");
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, "slider");
        const moviesSnapshot = await getDocs(moviesCollection);
        const moviesList = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(moviesList);
        setMovies(moviesList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  /*useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getSliders");
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
 
  }, []);*/

  const onButtonPress = () => {
    setActive(!active);
  };
  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(0);
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentIndex, images.length]);

  useEffect(() => {
    let interval;
    if (active) {
      if (currentIndex == 1) {
        progress.bar1 = 101;
      }
      if (currentIndex == 2) {
        progress.bar1 = 101;
        progress.bar2 = 101;
      }

      console.log(progress);
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = { ...prevProgress };
          let barFilled = false;

          if (newProgress.bar1 < 100) {
            newProgress.bar1 += 0.5;
            if (newProgress.bar1 >= 100) {
              console.log("heyy");
              barFilled = true;
            }
          } else if (newProgress.bar2 < 100) {
            newProgress.bar2 += 0.5;
            if (newProgress.bar2 >= 100) {
              barFilled = true;
              console.log("heyy2");
            }
          } else if (currentIndex === 2 && newProgress.bar3 < 100) {
            newProgress.bar3 += 0.5;
            if (newProgress.bar3 >= 100) {
              barFilled = true;
            }
          }

          if (barFilled) {
            goToNext();
            console.log(currentIndex);
          }

          if (
            newProgress.bar1 >= 100 &&
            newProgress.bar2 >= 100 &&
            newProgress.bar3 >= 100
          ) {
            // Reset the progress state
            return { bar1: 0, bar2: 0, bar3: 0 };
          }

          return newProgress;
        });
      }, 40);
    } else {
      setProgress({ bar1: 0, bar2: 0, bar3: 0 });
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [active, goToNext, currentIndex]);

  const goToPrevious = () => {
    if (currentIndex !== 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsTransitioning(false);
      }, 500);
    } else {
    }
  };

  const classVar = currentIndex === 0 ? "test" : "lighter";

  return (
    <>
      <div className="movie-scrollView">
        {currentIndex === 0 ? (
          <>
            <div
              class={classVar}
              style={{
                opacity: isTransitioning ? "0" : "1",
                "--background-image": `url(${images[0]})`,
              }}
            >
              s
            </div>
            <div className="slider-info">
              <h1>Unlimited movies, TV shows, and more</h1>
              <p>Starts at US#3.99. Cancel anytime.</p>
            </div>
          </>
        ) : (
          <>
            <div
              class={classVar}
              style={{
                opacity: isTransitioning ? "0" : "1",
                "--background-image": `url(${movies[currentIndex - 1].source})`,
              }}
            >
              s
            </div>
            <div className="slider-info2">
              <div className="slider-top">
                <div className="slider-logo">
                  <svg
                    class="n-logo-svg"
                    focusable="false"
                    viewBox="225 0 552 1000"
                    aria-hidden="true"
                    data-uia="n-logo"
                  >
                    <defs>
                      <radialGradient
                        id=":R2d6l9kl4l:-a"
                        r="75%"
                        gradientTransform="matrix(.38 0 .5785 1 .02 0)"
                      >
                        <stop offset="60%" stop-opacity=".3"></stop>
                        <stop offset="90%" stop-opacity=".05"></stop>
                        <stop offset="100%" stop-opacity="0"></stop>
                      </radialGradient>
                    </defs>
                    <path
                      d="M225 0v1000c60-8 138-14 198-17V0H225"
                      fill="#b1060e"
                    ></path>
                    <path
                      d="M579 0v983c71 3 131 9 198 17V0H579"
                      fill="#b1060e"
                    ></path>
                    <path
                      d="M225 0v200l198 600V557l151 426c76 3 136 9 203 17V800L579 200v240L423 0H225"
                      fill="url(#:R2d6l9kl4l:-a)"
                    ></path>
                    <path
                      d="M225 0l349 983c76 3 136 9 203 17L423 0H225"
                      fill="#e50914"
                    ></path>
                  </svg>
                  <p>FILM</p>
                </div>
                <div className="name">
                  <h1>{movies[currentIndex - 1].name}</h1>
                </div>
              </div>

              <ul>
                <li>{movies[currentIndex - 1].year}</li>
                <li>{movies[currentIndex - 1].age}</li>
                <li>{movies[currentIndex - 1].type}</li>
                <li>{movies[currentIndex - 1].genre}</li>
              </ul>

              <p className="description">
                {movies[currentIndex - 1].description}
              </p>
            </div>
          </>
        )}

        <button
          onClick={(e) => {
            goToPrevious();
            setActive(false);
          }}
          className="left-arrow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            data-icon="ChevronLeftStandard"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.41409 12L15.707 19.2928L14.2928 20.7071L6.29277 12.7071C6.10523 12.5195 5.99988 12.2652 5.99988 12C5.99988 11.7347 6.10523 11.4804 6.29277 11.2928L14.2928 3.29285L15.707 4.70706L8.41409 12Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <button
          onClick={(e) => {
            goToNext();
            setActive(false);
          }}
          className="right-arrow"
        >
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
        </button>
      </div>
      <div className="loading-bars">
        <button
          onClick={onButtonPress}
          data-uia="carousel-nav-play"
          aria-label="Play"
          class="default-ltr-cache-1bxcol5"
        >
          {active ? (
            <button
              data-uia="carousel-nav-pause"
              aria-label="Pause"
              class="default-ltr-cache-1bxcol5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                data-icon="PauseStandard"
                aria-hidden="true"
                class="default-ltr-cache-u5jcjm e1eegyml2"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              data-icon="PlayStandard"
              aria-hidden="true"
              class="default-ltr-cache-u5jcjm e1eegyml1"
            >
              <path
                d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>
        <Loadingbar progress={progress.bar1} />
        <Loadingbar progress={progress.bar2} />
        <Loadingbar progress={progress.bar3} />
      </div>
    </>
  );
};

export default MovieSlider;
