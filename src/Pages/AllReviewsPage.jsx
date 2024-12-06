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
    <div className="grid grid-cols-3 justify-center items-center gap-3">
      {reviews.map((review) => (
        <div key={review._id} className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img src={review.coverImage} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {review.title}
              <div className="badge badge-secondary">{review.genre}</div>
            </h2>
            <p>{review.description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">
                <Link to={`/review-details/${review._id}`}>Explore Details</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllReviewsPage;
