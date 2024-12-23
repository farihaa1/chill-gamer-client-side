import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const TopRatedReviews = () => {
  const [topRatedReviews, setTopRatedReviews] = useState([]);

 
  useEffect(() => {
    const fetchTopRatedReviews = async () => {
      try {
        const response = await fetch("https://chill-gamer-server-side-jet.vercel.app/top-rated-reviews"); 
        const data = await response.json();
        setTopRatedReviews(data);
      } catch (error) {
        console.error("Error fetching top-rated reviews:", error);
      }
    };

    fetchTopRatedReviews();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-6 md:my-12 pb-10">
      <h2 className="text-center text-4xl md:text-5xl font-semibold my-16">
        <Typewriter
          words={["Highest Rated Games"]}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {topRatedReviews.map((review) => (
          <div
            key={review._id}
            className="w-11/12 mx-auto md:w-full bg-base-100 h-[700px] md:h-[740px] shadow-xl p-6 lg:p-8 rounded-xl flex flex-col items-start"
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
              <p className=" text-start bg-orange-500 text-white px-3 rounded-lg my-2">
                {review.genre}
              </p>
              <p className="text-gray-700 mt-2">
                {review.description.slice(0, 100)}.....
              </p>
              <p className="text-gray-800 font-bold">
                Rating: {review.rating}/10
              </p>
              <div className="card-actions">
                <div className="bg-primary text-white px-3 rounded-xl mt-4 py-2">
                  <Link to={`/review-details/${review._id}`}>
                    Explore Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedReviews;
