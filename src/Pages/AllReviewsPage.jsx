import React, { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { DbContext } from "../providers/DbProviders";

const AllReviewsPage = () => {
  const { review, setReview }=useContext(DbContext);
  const reviews = useLoaderData();
  useEffect(() => {
    if (reviews) {
      setReview(reviews);
    }
  }, []);
  console.log(review)
  return (
    <div className="w-11/12 mx-auto my-6 md:my-12 pb-10">
         <h1 className="text-center text-4xl font-bold mb-12 md:mb-16">All Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
     
      {reviews.map((review) => (
        <div key={review._id} className="w-11/12 mx-auto md:w-full bg-base-100 h-[680px] md:h-[730px] shadow-xl p-4 rounded-xl flex flex-col items-start">
          <figure className="w-full h-2/3">
            <img className="w-full h-full object-cover rounded-xl" src={review.coverImage} />
          </figure>
          <div className="flex flex-col items-start justify-evenly pt-3">
            <h2 className="card-title mt-2 mr-3 text-gray-800">
              {review.title}: 
              
            </h2>
            <p className="text-gray-800 text-start bg-orange-400 px-2 rounded-lg my-2">{review.genre}</p>
            <p className="text-gray-700 mt-2">{review.description.slice(0,100)}.....</p>
            <div className="card-actions">
              <div className="bg-primary text-white px-3 rounded-xl mt-4 py-2">
                <Link to={`/review-details/${review._id}`}>Explore Details</Link>
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