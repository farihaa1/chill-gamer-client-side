import React from "react";
import { useLoaderData } from "react-router-dom";

const ReviewDetails = () => {
  const review = useLoaderData();
  const {_id, title, description, coverImage, genre, rating, year} = review
  console.log(review);
  return (
    <div>
      
        <div className="max-w-5xl mx-auto min-h-screen">
          <figure className="px-10 pt-10 w-full">
            <img
              src={coverImage}
              className="rounded-xl w-full h-96 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="card-actions">
              <button className="btn btn-primary">Add to WatchList</button>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default ReviewDetails;
