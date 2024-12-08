import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, NavLink } from "react-router-dom";
import { DbContext } from "../providers/DbProviders";
import { Typewriter } from 'react-simple-typewriter';

const AllReviewsPage = () => {
  const { review, setReview } = useContext(DbContext);
  const reviews = useLoaderData();
  const [sortedReviews, setSortedReviews] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    if (reviews) {
      setReview(reviews);
      setSortedReviews(reviews);
    }
  }, [reviews, setReview]);

  const sortReviews = (option) => {
    let sortedArray = [...sortedReviews];
    if (option === "rating-asc") {
      sortedArray.sort((a, b) => a.rating - b.rating);
    } else if (option === "rating-desc") {
      sortedArray.sort((a, b) => b.rating - a.rating);
    } else if (option === "year-asc") {
      sortedArray.sort((a, b) => a.year - b.year);
    } else if (option === "year-desc") {
      sortedArray.sort((a, b) => b.year - a.year);
    }
    setSortedReviews(sortedArray);
  };

  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === "") {
      setSortedReviews(reviews); 
    } else {
      setSortedReviews(reviews.filter((review) => review.genre === genre));
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    sortReviews(e.target.value);
  };

  const handleGenreChange = (e) => {
    filterByGenre(e.target.value);
  };

  const genres = [...new Set(reviews.map((review) => review.genre))]; // Get unique genres

  return (
    <div className="w-11/12 mx-auto my-12 md:my-12 pb-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold ">
          <Typewriter
            words={["All Reviews", "Discover the Best Games!", "Share Your Thoughts!"]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
      </div>
      
      <div className="flex justify-center  mb-6 relative">
        <div className="dropdown">
          <label htmlFor="sort" className="btn bg-primary text-white">
            Sort By
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="select select-primary border-primary mt-2 w-full max-w-xs"
          >
            <option value="none">Select Sort Option</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="year-asc">Year: Ascending</option>
            <option value="year-desc">Year: Descending</option>
          </select>
        </div>

        <div className="dropdown ml-4">
          <label htmlFor="genre" className="btn bg-primary text-white">
            Filter By Genre
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="select select-primary border-primary active:border-primary mt-2 w-full max-w-xs"
          >
            <option value="">All Genres</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {sortedReviews.map((review) => (
          <div
            key={review._id}
            className="w-11/12 mx-auto md:w-full bg-base-100 h-[680px] md:h-[730px] shadow-xl p-4 rounded-xl flex flex-col items-start"
          >
            <figure className="w-full h-2/3">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={review.coverImage}
                alt={review.title}
              />
            </figure>
            <div className="flex flex-col items-start justify-evenly pt-3">
              <h2 className="card-title mt-2 mr-3 text-gray-800">
                {review.title}:
              </h2>
              <p className="text-gray-800 text-start bg-orange-400 px-2 rounded-lg my-2">
                {review.genre}
              </p>
              <p className="text-gray-700 mt-2">{review.description.slice(0, 100)}.....</p>
              <div className="card-actions">
                <div className="bg-primary text-white px-3 rounded-xl mt-4 py-2">
                  <NavLink
                    to={`/review-details/${review._id}`}
                    className={({ isActive }) => 
                      isActive ? "bg-orange-500 text-white rounded-lg p-2" : "bg-primary text-white px-3 rounded-xl mt-4 py-2"
                    }
                  >
                    Explore Details
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviewsPage;
