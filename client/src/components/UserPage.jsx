import { useEffect, useState } from "react";
import "../css/Userpage.css";
import Banner from "./Banner";
import Nav from "./Nav";
import RowListing from "./RowListing";
import axios from "axios";
import { shuffleArray } from "../util.js";
import { db, collection, getDocs } from "../firebase";

const UserPage = () => {
  const [movies, setMovies] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  /**
     *   useEffect(() => {
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
     
      }, []);
     
     */
  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  /**
    useEffect(() => {
        const fetchBanner = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/getbanner");
        
            setBanner(response.data);
            return response.data;
          } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
          } finally {
            setLoading2(false);
          }
        };
        fetchBanner();
     
      }, []);
 */

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, "banner");
        const moviesSnapshot = await getDocs(moviesCollection);
        const moviesList = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBanner(moviesList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading2(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading || loading2) {
    return;
  }

  return (
    <div className="userPage">
      <Nav />

      <Banner movie={banner[0]} />
      <div className="movie-section">
        <RowListing
          title="NETFLIX ORIGINALS"
          movies={shuffleArray(movies).slice(0, 10)}
        />
        <RowListing
          title="Trending Now"
          movies={shuffleArray(movies).slice(0, 10)}
        />
        <RowListing
          title="Top Rated"
          movies={shuffleArray(movies).slice(0, 10)}
        />
        <RowListing
          title="Action Movies"
          movies={shuffleArray(movies).slice(0, 10)}
        />
        <RowListing
          title="Comedy Movies"
          movies={shuffleArray(movies).slice(0, 10)}
        />
        <RowListing
          title="Horror Movies"
          movies={shuffleArray(movies).slice(0, 10)}
        />
        <RowListing
          title="Romance Movies"
          movies={shuffleArray(movies).slice(0, 10)}
        />
        <RowListing
          title="Documentaries Movies"
          movies={shuffleArray(movies).slice(0, 10)}
        />
      </div>
    </div>
  );
};

export default UserPage;
